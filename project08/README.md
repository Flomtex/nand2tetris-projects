# Project 8: Virtual Machine Translator (Extended Version)

This repository contains my solutions and implementation files for Project 8 of the Nand2Tetris course. The primary objective of this project was to extend the functionality of the Virtual Machine (VM) Translator to include advanced features such as function calls, program flow, and recursion. The VM Translator is implemented in JavaScript as a program called `VMTranslator8.js`.

## Project Overview

In Project 8, I extended the VM Translator from Project 7 to support more complex VM commands. This is a key step in the Nand2Tetris journey, where we enhance our translator to handle full programs, including functions and recursion. The translator can now convert all VM commands, including arithmetic, memory access, branching, and function handling, into equivalent Hack assembly instructions.

The project is divided into the following tasks:
- Extending the VM-to-Hack translator to support function definitions (`function`), function calls (`call`), and returns (`return`).
- Adding support for program flow commands like `label`, `goto`, and `if-goto`.
- Testing the extended functionality using the provided test scripts and the CPU emulator.

The focus of this project is to build a deep understanding of function call management, stack frames, and the handling of control flow commands.

## VMTranslator8.js

The main feature of this project is `VMTranslator8.js`, a JavaScript program that handles the conversion of `.vm` files to `.asm` files, incorporating the extended VM commands. This version builds upon the foundational translator from Project 7 and adds support for the following features:

- **Program Flow Commands**: Adds handling for `label`, `goto`, and `if-goto` commands, allowing for branching and looping in the translated assembly code.
- **Function Commands**: Supports `function`, `call`, and `return` commands, enabling the VM Translator to handle functions, recursion, and maintaining stack frames correctly.

### Important Note on Usage

The `VMTranslator8.js` is specifically designed for Project 8 and is not interchangeable with the translator from Project 7. It includes significant enhancements to support the advanced commands introduced in this project.

When using the VM Translator for Project 8, please copy the `VMTranslator8.js` file into the directory containing the `.vm` files you wish to translate.

### How to Use the VM Translator

To use the VM Translator:
1. Make sure you have Node.js installed on your system.
2. Navigate to the directory where `VMTranslator8.js` is located.
3. Run the following command:

   ```
   node VMTranslator8.js <directory>
   ```

   Replace `<directory>` with the path to the directory containing your VM files. The output will be a corresponding `.asm` file.

## Example Workflow

For each test case in Project 8:
1. **Copy the Translator**: Copy `VMTranslator8.js` into the specific test directory you want to run.
2. **Navigate to the Test Directory**: Open your terminal and navigate to the folder containing the VM files for that test:
   
   ```
   cd path/to/Project8/<TestFolder>
   ```

3. **Run the Translator**: Run the translator using the following command:
   
   ```
   node VMTranslator8.js .
   ```

   This command will process all `.vm` files in the current directory.

4. **Compare Output**: Verify that the generated `.asm` file matches the expected `.cmp` file for correctness.

## Testing

I used the provided test scripts (`.tst` files) and compare files (`.cmp` files) to test my implementation. All translated `.vm` files produced `.asm` output that matched the expected results in the CPU emulator, confirming that the VM Translator worked correctly.

The translator was tested with various test programs, including `SimpleFunction`, `NestedCall`, and `FibonacciElement`. Each test validated the proper functioning of program flow and function commands.

## Directory Structure

- **FunctionCalls/**: Contains VM files related to function call tests (e.g., `SimpleFunction.vm`, `NestedCall.vm`) along with their translated `.asm` files.
- **ProgramFlow/**: Contains VM files for branching commands and related tests.
- **VMTranslator8.js**: The JavaScript file responsible for translating VM code to Hack assembly for Project 8.
- **README.md**: This readme file.

## Notes on Usage

- The `VMTranslator8.js` file is specific to Project 8 and should be used for the extended functionality tests. It will not work correctly for Project 7 files without modifications.
- Each test should be performed in its own directory, and `VMTranslator8.js` should be copied into the directory to run the translation process.
- Make sure the `.out` files generated during testing match the expected `.cmp` files to ensure translation accuracy.

## Conclusion

Project 8 was instrumental in expanding the capabilities of the VM Translator to handle advanced programming constructs, such as function calls and program flow. The `VMTranslator8.js` showcases how higher-level programming concepts like functions and recursion can be translated into low-level assembly instructions.

If you have any questions or suggestions for improvements, feel free to reach out!