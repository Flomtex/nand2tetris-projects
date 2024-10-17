# Project 7: Virtual Machine Translator

This repository contains my solutions and implementation files for Project 7 of the Nand2Tetris course. The main objective of this project was to build a Virtual Machine (VM) Translator that converts VM commands into Hack assembly language. The VM Translator is implemented in JavaScript as a program called `VMTranslator.js`.

## Project Overview

In Project 7, I created a VM Translator that translates high-level VM code into Hack assembly code. This forms a crucial part of the overall Nand2Tetris journey, bridging the gap between a virtual machine and the underlying hardware. Specifically, the translator is capable of converting VM commands involving arithmetic, memory access (push and pop), and basic logic into equivalent Hack assembly instructions.

The project is divided into the following tasks:
- Implementing a VM-to-Hack translator that reads a `.vm` file and generates a `.asm` file.
- Translating VM commands for stack arithmetic and memory access.
- Testing the translated code using the provided test scripts and the CPU emulator.

The key focus of this project is to develop a programmatic understanding of stack operations, memory segmentation, and how VM commands can be executed on the Hack platform.

## VMTranslator.js

The main feature of this project is `VMTranslator.js`, a JavaScript program that handles the conversion of `.vm` files to `.asm` files. The translator reads the VM commands line by line, processes them, and generates equivalent Hack assembly code. The program supports commands such as `push`, `pop`, arithmetic operations (`add`, `sub`, `neg`, etc.), logic (`and`, `or`, `not`), and comparison (`eq`, `gt`, `lt`).

### How to Use the VM Translator

To use the VM translator:
1. Make sure you have Node.js installed on your system.
2. Navigate to the directory where `VMTranslator.js` is located.
3. Run the following command:

   ```
   node VMTranslator.js <filename.vm>
   ```

   Replace `<filename.vm>` with the path to your VM file. The output will be a corresponding `.asm` file.

### Key Features of the VM Translator

- **Arithmetic and Logic Commands**: Handles operations such as `add`, `sub`, `neg`, `eq`, `gt`, `lt`, `and`, `or`, and `not`.
- **Memory Access Commands**: Supports memory segments like `local`, `argument`, `this`, `that`, `constant`, `static`, `pointer`, and `temp` for both `push` and `pop` commands.
- **Comparison Handling**: Generates labels for comparisons like `eq`, `gt`, and `lt` to handle jumps and conditions correctly.
- **Debug Logs**: Logs raw file content and each line being processed to help in debugging and understanding how each command is being handled.

## Testing

I used the provided test VM files from the Nand2Tetris project directory to test my implementation. The translation of all the test `.vm` files was successful, and the resulting `.asm` files were run through the CPU emulator. The output matched the expected results, confirming the correctness of the VM Translator.

For further testing, I used the test scripts (`.tst` files) and compare files (`.cmp` files) provided in the course resources to ensure that the translated assembly code behaved as expected.

## Directory Structure

- **MemoryAccess/**: Contains the VM files related to memory access (e.g., `BasicTest.vm`) along with their translated `.asm` files.
- **StackArithmetic/**: Contains VM files for stack operations and their corresponding `.asm` files.
- **VMTranslator.js**: The JavaScript file responsible for translating VM code to Hack assembly.
- **README.md**: This readme file.

## Notes on Usage

- Make sure to use the `.vm` files provided by the Nand2Tetris course, or create your own VM files following the same format.
- The `.out` files generated during testing should match the expected `.cmp` files to ensure the accuracy of the VM translation.

## Conclusion

This project was instrumental in understanding the process of converting high-level VM commands into machine-readable assembly code. The `VMTranslator.js` is a fundamental tool in the Nand2Tetris journey, showcasing how a virtual machine can interact with hardware through a defined set of commands.

If you have any questions or suggestions for improvements, feel free to reach out!

Happy coding!
