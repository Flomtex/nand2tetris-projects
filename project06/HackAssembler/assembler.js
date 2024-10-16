const fs = require('fs');

// Get input and output filenames from command-line arguments
const inputFilename = process.argv[2];
const outputFilename = process.argv[3] || inputFilename.replace('.asm', '.hack');

if (!inputFilename) {
  console.error("Error: No input file specified.");
  console.log("Usage: node assembler.js <inputFile.asm> [outputFile.hack]");
  process.exit(1);
}

// Function to read the .asm file
function readAssemblyFile(filename) {
  try {
    const fileContent = fs.readFileSync(filename, 'utf-8');
    console.log("Assembly File Content:");
    console.log(fileContent);
    return fileContent.split(/\r?\n/);
  } catch (err) {
    console.error(`Error reading the file: ${err}`);
    process.exit(1);
  }
}

// Function to clean the assembly file
function cleanAssemblyFile(lines) {
  const cleanedLines = [];

  lines.forEach(line => {
    const cleanLine = line.split('//')[0].trim();
    if (cleanLine !== '') {
      cleanedLines.push(cleanLine);
    }
  });

  return cleanedLines;
}

// Function to handle the first pass
function firstPass(lines) {
  const symbolTable = {
    "SP": 0, "LCL": 1, "ARG": 2, "THIS": 3, "THAT": 4,
    "R0": 0, "R1": 1, "R2": 2, "R3": 3, "R4": 4, "R5": 5,
    "R6": 6, "R7": 7, "R8": 8, "R9": 9, "R10": 10,
    "R11": 11, "R12": 12, "R13": 13, "R14": 14, "R15": 15,
    "SCREEN": 16384, "KBD": 24576
  };

  let romAddress = 0;

  lines.forEach(line => {
    if (line.startsWith("(") && line.endsWith(")")) {
      const label = line.slice(1, -1);
      symbolTable[label] = romAddress;
    } else {
      romAddress++;
    }
  });

  return symbolTable;
}

// Function to handle the second pass
function secondPass(lines, symbolTable) {
  let nextVariableAddress = 16;
  const hackLines = [];

  lines.forEach(line => {
    if (line.startsWith("@")) {
      const symbol = line.slice(1);
      let address;

      if (!isNaN(symbol)) {
        address = parseInt(symbol, 10);
      } else {
        if (!symbolTable[symbol]) {
          symbolTable[symbol] = nextVariableAddress++;
        }
        address = symbolTable[symbol];
      }

      hackLines.push(address.toString(2).padStart(16, '0'));
    } else {
      hackLines.push(translateCInstruction(line));
    }
  });

  return hackLines;
}

// Function to translate C-instructions
function translateCInstruction(instruction) {
  const compCodes = {
    "0": "0101010", "1": "0111111", "-1": "0111010", "D": "0001100",
    "A": "0110000", "!D": "0001101", "!A": "0110001", "-D": "0001111",
    "-A": "0110011", "D+1": "0011111", "A+1": "0110111", "D-1": "0001110",
    "A-1": "0110010", "D+A": "0000010", "D-A": "0010011", "A-D": "0000111",
    "D&A": "0000000", "D|A": "0010101", "M": "1110000", "!M": "1110001",
    "-M": "1110011", "M+1": "1110111", "M-1": "1110010", "D+M": "1000010",
    "D-M": "1010011", "M-D": "1000111", "D&M": "1000000", "D|M": "1010101"
  };

  const destCodes = {
    null: "000", "M": "001", "D": "010", "MD": "011",
    "A": "100", "AM": "101", "AD": "110", "AMD": "111"
  };

  const jumpCodes = {
    null: "000", "JGT": "001", "JEQ": "010", "JGE": "011",
    "JLT": "100", "JNE": "101", "JLE": "110", "JMP": "111"
  };

  let dest = null, comp = null, jump = null;

  if (instruction.includes("=")) {
    [dest, instruction] = instruction.split("=");
  }

  if (instruction.includes(";")) {
    [comp, jump] = instruction.split(";");
  } else {
    comp = instruction;
  }

  const compBits = compCodes[comp] || "0000000";
  const destBits = destCodes[dest] || "000";
  const jumpBits = jumpCodes[jump] || "000";

  return `111${compBits}${destBits}${jumpBits}`;
}

// Function to write the output to a .hack file
function writeHackFile(hackLines, outputFilename) {
  fs.writeFileSync(outputFilename, hackLines.join('\n'), 'utf-8');
}

// Main flow of the assembler
const lines = readAssemblyFile(inputFilename);
const cleanedLines = cleanAssemblyFile(lines);
const symbolTable = firstPass(cleanedLines);
const hackLines = secondPass(cleanedLines, symbolTable);

writeHackFile(hackLines, outputFilename);
console.log(`Hack file generated: ${outputFilename}`);

  