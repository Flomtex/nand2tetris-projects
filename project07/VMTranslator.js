const fs = require('fs');

// Function to read the VM file and clean its content
function readVMFile(filename) {
  const fileContent = fs.readFileSync(filename, 'utf-8');
  console.log("Raw File Content:", fileContent); // Debug: Log the raw file content

  return fileContent
    .replace(/^﻿/, '') // Remove BOM if present
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

// Main function
function main() {
  const filename = process.argv[2];
  if (!filename) {
    console.error('Usage: node VMTranslator.js <filename.vm>');
    process.exit(1);
  }

  const commands = readVMFile(filename);
  let asmCode = [];

  commands.forEach(command => {
    asmCode = asmCode.concat(translateCommand(command));
  });

  // Add an infinite loop at the end to halt the program
  asmCode.push('(END)');
  asmCode.push('@END');
  asmCode.push('0;JMP');

  const outputFilename = filename.replace('.vm', '.asm');
  fs.writeFileSync(outputFilename, asmCode.join('\n'));
  console.log(`Assembly file generated: ${outputFilename}`);
}

main();
