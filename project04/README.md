# Project 4: Machine Language Programs

This project is part of the nand2tetris course and focuses on writing low-level machine language programs using the Hack assembly language. The programs were tested and executed using the provided CPU Emulator.

## Overview
Project 4 includes two main assembly programs: **Fill.asm** and **Mult.asm**. These programs were developed to get hands-on experience with Hack's instruction set, learn low-level programming concepts, and understand the process of assembling symbolic code into binary code.

### Tools Used
- **Assembler**: Converts Hack assembly (`.asm`) files into binary (`.hack`) code.
- **CPU Emulator**: Executes the `.hack` files and allows inspection of memory, registers, and program flow.
- **Text Editor**: Used to write `.asm` files (e.g., VSCode, Vim).

## Programs

### 1. Fill.asm
- **Description**: This program listens for keyboard input and manipulates the screen based on user input.
  - When **a key is pressed**, it fills the entire screen with black pixels.
  - When **no key is pressed**, it clears the screen to white.
- **Execution**: Load `Fill.asm` in the assembler, generate the `.hack` file, and run it in the CPU Emulator. Make sure to enable the keyboard input for interaction.

### 2. Mult.asm
- **Description**: This program multiplies the values stored in `R0` and `R1` and stores the result in `R2`.
  - The original values in `R0` and `R1` are not modified.
  - The multiplication is implemented using repeated addition (loop).
- **Pseudo Code**:
  ```
  x = R0
  y = R1
  R2 = 0
  while (x > 0) {
      R2 += y
      x--
  }
  ```
- **Execution**: Load `Mult.asm` in the assembler, generate the `.hack` file, and run it in the CPU Emulator to verify the multiplication.

## Lessons Learned
- **Hack Assembly Language**: Gained familiarity with low-level programming using Hack assembly.
- **Control Flow**: Learned how to implement loops and conditional jumps.
- **Assembler Workflow**: Understood the process of translating assembly code into binary and executing it on an emulator.

## How to Run the Programs
1. **Write/Edit** the assembly code in a text editor and save it as `.asm`.
2. **Assemble**: Use the nand2tetris Assembler to convert the `.asm` file to a `.hack` binary file.
3. **Run**: Load the `.hack` file into the CPU Emulator, adjust any input values as required, and execute the program.

## Folder Structure
- **Fill.asm**: Code to fill or clear the screen based on keyboard input.
- **Mult.asm**: Code to multiply two values and store the result in memory.
- **.tst and .cmp files**: Test scripts and comparison files to verify program correctness.

## Conclusion
Project 4 provided practical experience in machine language programming, helping to build a solid foundation for understanding how low-level code interacts directly with hardware components. This knowledge is crucial for the next steps in building the Hack computer and writing an assembler in future projects.

