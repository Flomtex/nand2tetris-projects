const fs = require('fs');
const path = require('path');

// Function to read the VM file and clean its content
function readVMFile(filename) {
  const fileContent = fs.readFileSync(filename, 'utf-8');
  console.log("Raw File Content:", fileContent); // Debug: Log the raw file content

  return fileContent
    .replace(/^\uFEFF/, '') // Remove BOM if present
    .split(/\r?\n/) // Split lines by newline
    .map(line => line.trim()) // Trim whitespace
    .filter(line => line.length > 0 && !line.startsWith("//")) // Remove empty lines and full-line comments
    .map(line => {
      console.log("Processing line:", line); // Debug: Log each line being processed
      return line.split("//")[0].trim(); // Remove inline comments
    });
}

// Function to translate a VM command into Hack assembly code
function translateCommand(command) {
  const parts = command.split(' ');
  const cmdType = parts[0];
  const segment = parts[1];
  const index = parseInt(parts[2]);

  switch (cmdType) {
    case 'function':
      return handleFunction(parts[1], parseInt(parts[2]));
    case 'call':
      return handleCall(parts[1], parseInt(parts[2]));
    case 'return':
      return handleReturn();
    case 'push':
      return handlePush(segment, index);
    case 'pop':
      return handlePop(segment, index);
    case 'add':
      return [
        '@SP',
        'AM=M-1',
        'D=M',
        'A=A-1',
        'M=D+M'
      ];
    case 'label':
      return [`(${parts[1]})`];
    case 'goto':
      return [
        `@${parts[1]}`,
        '0;JMP'
      ];
    case 'if-goto':
      return [
        '@SP',
        'AM=M-1',
        'D=M',
        `@${parts[1]}`,
        'D;JNE'
      ];
    case 'sub':
      return [
        '@SP',
        'AM=M-1',
        'D=M',
        'A=A-1',
        'M=M-D'
      ];
    case 'neg':
      return [
        '@SP',
        'A=M-1',
        'M=-M'
      ];
    case 'eq':
      return handleComparison('JEQ');
    case 'gt':
      return handleComparison('JGT');
    case 'lt':
      return handleComparison('JLT');
    case 'and':
      return [
        '@SP',
        'AM=M-1',
        'D=M',
        'A=A-1',
        'M=D&M'
      ];
    case 'or':
      return [
        '@SP',
        'AM=M-1',
        'D=M',
        'A=A-1',
        'M=D|M'
      ];
    case 'not':
      return [
        '@SP',
        'A=M-1',
        'M=!M'
      ];
    default:
      throw new Error(`Unknown command: ${command}`);
  }
}

// Function to handle 'push' commands
function handlePush(segment, index) {
  let asm = [];
  switch (segment) {
    case 'constant':
      asm.push(`@${index}`);
      asm.push('D=A');
      break;
    case 'local':
      asm.push(`@${index}`);
      asm.push('D=A');
      asm.push('@LCL');
      asm.push('A=M+D');
      asm.push('D=M');
      break;
    case 'argument':
      asm.push(`@${index}`);
      asm.push('D=A');
      asm.push('@ARG');
      asm.push('A=M+D');
      asm.push('D=M');
      break;
    case 'this':
      asm.push(`@${index}`);
      asm.push('D=A');
      asm.push('@THIS');
      asm.push('A=M+D');
      asm.push('D=M');
      break;
    case 'that':
      asm.push(`@${index}`);
      asm.push('D=A');
      asm.push('@THAT');
      asm.push('A=M+D');
      asm.push('D=M');
      break;
    case 'temp':
      asm.push(`@${5 + index}`);
      asm.push('D=M');
      break;
    case 'pointer':
      asm.push(index === 0 ? '@THIS' : '@THAT');
      asm.push('D=M');
      break;
    case 'static':
      asm.push(`@Static.${index}`);
      asm.push('D=M');
      break;
    default:
      throw new Error(`Unknown segment: ${segment}`);
  }
  // Push the value onto the stack
  asm.push('@SP');
  asm.push('A=M');
  asm.push('M=D');
  asm.push('@SP');
  asm.push('M=M+1');
  return asm;
}

// Function to handle 'pop' commands
function handlePop(segment, index) {
  let asm = [];
  switch (segment) {
    case 'local':
      asm.push(`@${index}`);
      asm.push('D=A');
      asm.push('@LCL');
      asm.push('D=M+D');
      asm.push('@R13'); // Temporary register to store address
      asm.push('M=D');
      break;
    case 'argument':
      asm.push(`@${index}`);
      asm.push('D=A');
      asm.push('@ARG');
      asm.push('D=M+D');
      asm.push('@R13');
      asm.push('M=D');
      break;
    case 'this':
      asm.push(`@${index}`);
      asm.push('D=A');
      asm.push('@THIS');
      asm.push('D=M+D');
      asm.push('@R13');
      asm.push('M=D');
      break;
    case 'that':
      asm.push(`@${index}`);
      asm.push('D=A');
      asm.push('@THAT');
      asm.push('D=M+D');
      asm.push('@R13');
      asm.push('M=D');
      break;
    case 'temp':
      asm.push(`@${5 + index}`);
      asm.push('D=A');
      asm.push('@R13');
      asm.push('M=D');
      break;
    case 'pointer':
      asm.push(`@${3 + index}`);
      asm.push('D=A');
      asm.push('@R13');
      asm.push('M=D');
      break;
    case 'static':
      asm.push(`@Static.${index}`);
      asm.push('D=A');
      asm.push('@R13');
      asm.push('M=D');
      break;
    default:
      throw new Error(`Unknown segment: ${segment}`);
  }
  // Pop the value from the stack
  asm.push('@SP');
  asm.push('AM=M-1');
  asm.push('D=M');
  asm.push('@R13');
  asm.push('A=M');
  asm.push('M=D');
  return asm;
}

// Function to handle comparison commands (eq, gt, lt)
let comparisonCounter = 0;
function handleComparison(jumpCommand) {
  const labelTrue = `TRUE_${comparisonCounter}`;
  const labelEnd = `END_${comparisonCounter}`;
  comparisonCounter++;
  return [
    '@SP',
    'AM=M-1',
    'D=M',
    'A=A-1',
    'D=M-D',
    `@${labelTrue}`,
    `D;${jumpCommand}`,
    '@SP',
    'A=M-1',
    'M=0',
    `@${labelEnd}`,
    '0;JMP',
    `(${labelTrue})`,
    '@SP',
    'A=M-1',
    'M=-1',
    `(${labelEnd})`
  ];
}

// Function to handle 'function' commands
function handleFunction(functionName, numLocals) {
  const asm = [
    `(${functionName})` // Declare function label
  ];
  for (let i = 0; i < numLocals; i++) {
    asm.push(...handlePush('constant', 0)); // Initialize local variables to 0
  }
  return asm;
}

// Function to handle 'call' commands (continued)
let callCounter = 0; // Used to generate unique labels
function handleCall(functionName, numArgs) {
  const returnLabel = `RETURN_${callCounter++}`;
  return [
    `@${returnLabel}`, // Push return address
    'D=A',
    '@SP',
    'A=M',
    'M=D',
    '@SP',
    'M=M+1',
    '@LCL', // Push LCL
    'D=M',
    '@SP',
    'A=M',
    'M=D',
    '@SP',
    'M=M+1',
    '@ARG', // Push ARG
    'D=M',
    '@SP',
    'A=M',
    'M=D',
    '@SP',
    'M=M+1',
    '@THIS', // Push THIS
    'D=M',
    '@SP',
    'A=M',
    'M=D',
    '@SP',
    'M=M+1',
    '@THAT', // Push THAT
    'D=M',
    '@SP',
    'A=M',
    'M=D',
    '@SP',
    'M=M+1',
    `@${numArgs}`,
    'D=A',
    '@5',
    'D=D+A',
    '@SP',
    'D=M-D',
    '@ARG', // Reposition ARG
    'M=D',
    '@SP', // Reposition LCL
    'D=M',
    '@LCL',
    'M=D',
    `@${functionName}`, // Goto function
    '0;JMP',
    `(${returnLabel})` // Declare return label
  ];
}

// Function to handle 'return' commands
function handleReturn() {
  return [
    '@LCL',      // FRAME = LCL
    'D=M',
    '@R13',
    'M=D',
    '@5',        // RET = *(FRAME - 5)
    'A=D-A',
    'D=M',
    '@R14',
    'M=D',
    '@SP',       // *ARG = pop()
    'AM=M-1',
    'D=M',
    '@ARG',
    'A=M',
    'M=D',
    '@ARG',      // SP = ARG + 1
    'D=M+1',
    '@SP',
    'M=D',
    '@R13',      // THAT = *(FRAME - 1)
    'AM=M-1',
    'D=M',
    '@THAT',
    'M=D',
    '@R13',      // THIS = *(FRAME - 2)
    'AM=M-1',
    'D=M',
    '@THIS',
    'M=D',
    '@R13',      // ARG = *(FRAME - 3)
    'AM=M-1',
    'D=M',
    '@ARG',
    'M=D',
    '@R13',      // LCL = *(FRAME - 4)
    'AM=M-1',
    'D=M',
    '@LCL',
    'M=D',
    '@R14',      // goto RET
    'A=M',
    '0;JMP'
  ];
}

// Main function
function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error('Usage: node VMTranslator.js <filename.vm or directory>');
    process.exit(1);
  }

  let vmFiles = [];
  let outputFilename;

  if (fs.lstatSync(inputPath).isDirectory()) {
    // If input is a directory, get all .vm files in it
    vmFiles = fs.readdirSync(inputPath)
      .filter(file => file.endsWith('.vm'))
      .map(file => path.join(inputPath, file));
    outputFilename = path.join(inputPath, `${path.basename(path.resolve(inputPath))}.asm`);
  } else {
    // If input is a single file
    if (!inputPath.endsWith('.vm')) {
      console.error('Input must be a .vm file or a directory containing .vm files');
      process.exit(1);
    }
    vmFiles = [inputPath];
    outputFilename = inputPath.replace('.vm', '.asm');
  }

  let asmCode = [
    // Bootstrap code
    '@256',         // Set SP to 256
    'D=A',
    '@SP',
    'M=D',
    
    // Call Sys.init
    '@Sys.init$ret.0',  // Push return address
    'D=A',
    '@SP',
    'A=M',
    'M=D',
    '@SP',
    'M=M+1',
    
    '@LCL',           // Push LCL
    'D=M',
    '@SP',
    'A=M',
    'M=D',
    '@SP',
    'M=M+1',
    
    '@ARG',           // Push ARG
    'D=M',
    '@SP',
    'A=M',
    'M=D',
    '@SP',
    'M=M+1',
    
    '@THIS',          // Push THIS
    'D=M',
    '@SP',
    'A=M',
    'M=D',
    '@SP',
    'M=M+1',
    
    '@THAT',          // Push THAT
    'D=M',
    '@SP',
    'A=M',
    'M=D',
    '@SP',
    'M=M+1',
    
    '@5',
    'D=A',
    '@SP',
    'D=M-D',
    '@ARG',           // Reposition ARG (SP - 5 - numArgs)
    'M=D',
    
    '@SP',
    'D=M',
    '@LCL',           // Reposition LCL
    'M=D',
    
    '@Sys.init',      // Goto Sys.init
    '0;JMP',
  
    '(Sys.init$ret.0)' // Return address label
  ];

  vmFiles.forEach(vmFile => {
    const commands = readVMFile(vmFile);
    commands.forEach(command => {
      asmCode = asmCode.concat(translateCommand(command));
    });
  });

  // Add an infinite loop at the end to halt the program
  asmCode.push('(END)');
  asmCode.push('@END');
  asmCode.push('0;JMP');

  fs.writeFileSync(outputFilename, asmCode.join('\n'));
  console.log(`Assembly file generated: ${outputFilename}`);
}

main();
