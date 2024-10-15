# Project 5: Computer

This project is part of the **nand2tetris** course, where we integrate previously built components like the **ALU**, **registers**, and **RAM** to create a functional **CPU** and **Computer** capable of executing machine-level programs.

## Overview

In Project 5, the main goal is to build a complete **Computer-on-a-chip** by integrating components designed in previous projects. This computer is capable of executing programs written in the **Hack machine language**. The final design consists of three key chips:

- **Memory**: Combines various memory components (RAM, Screen, Keyboard) into a unified memory system.
- **CPU**: The core processing unit that fetches, decodes, and executes instructions.
- **Computer**: A system that integrates the **CPU**, **Memory**, and **ROM32K** to run complete programs.

## Components Built

### 1. Memory.hdl
- **Description**: The Memory chip integrates `RAM16K`, `Screen`, and `Keyboard` to form a single 32K addressable memory space.
  - **RAM16K**: Used for general data storage.
  - **Screen**: Stores the pixels for the computer screen, allowing graphical output.
  - **Keyboard**: Represents the memory-mapped input from the keyboard.
- **Implementation**: The implementation connects these built-in components to produce the desired memory layout that can be accessed by the CPU.

### 2. CPU.hdl
- **Description**: The CPU is the core of the computer system, responsible for executing machine instructions.
  - It uses components such as **ALU**, **ARegister**, **DRegister**, and **PC**.
  - It processes **A-instructions** and **C-instructions**, performs arithmetic and logical operations via the **ALU**, and manages program flow using the **Program Counter (PC)**.
- **Implementation**: The CPU chip is built by combining the **ALU**, registers, and other basic gates to execute the Hack machine language instructions. The **ARegister** holds addresses or immediate values, the **DRegister** stores computation results, and the **ALU** performs arithmetic and logical computations.

### 3. Computer.hdl
- **Description**: The **Computer** integrates the **CPU**, **Memory**, and **ROM32K** into a fully functioning computer capable of running programs.
  - The **ROM32K** chip is used as the instruction memory, holding the programs that the CPU will execute.
  - This chip is the top-level chip that brings together all the components to create a working computer system.

## Testing the Computer

The functionality of the **Computer** was verified by running several machine language programs:

### Test Programs
1. **Add**: Adds the constants `2` and `3` and writes the result to `RAM[0]`.
2. **Max**: Compares the values in `RAM[0]` and `RAM[1]` and writes the maximum value to `RAM[2]`.
3. **Rect**: Draws a rectangle on the screen, with `RAM[0]` specifying the number of rows (each row is 16 pixels wide). The rectangle starts from the top-left corner of the screen.

Each program was loaded into the **Computer** chip via the **ROM32K** and executed using the hardware simulator, ensuring the desired output matched the expected results in the compare files.

## Tools Used
- **Hardware Simulator**: Used to design, test, and verify the correctness of the **Memory**, **CPU**, and **Computer** chips.
- **ROM32K**: This built-in component was used for loading programs written in the Hack machine language.
- **ALU, ARegister, DRegister, PC**: These built-in components helped in building the CPU.

## Lessons Learned
- **Integration of Components**: Gained hands-on experience in integrating various components, from the ALU to memory, to create a working CPU and computer.
- **Control Flow**: Understood how the **CPU** fetches, decodes, and executes instructions by managing data flow through registers and memory.
- **Debugging Complex Systems**: Learned how to systematically test and debug large chips by using the provided `.tst` scripts and `.cmp` files to identify and fix issues.

## How to Run the Tests
1. **Load** the relevant `.hdl` file into the hardware simulator.
2. **Run the Test Script**: Each chip has a corresponding `.tst` script. Load and execute the script to verify correctness.
3. **Check Outputs**: Compare the actual output with the expected `.cmp` file output to ensure that the implementation is correct.
4. **Run Programs on Computer Chip**: Load one of the programs (`Add.hack`, `Max.hack`, `Rect.hack`) into the **ROM32K** and execute it using the **Computer** chip.

## Folder Structure
- **Memory.hdl**: Combines RAM16K, Screen, and Keyboard into a single memory system.
- **CPU.hdl**: Implements the CPU capable of executing Hack machine language instructions.
- **Computer.hdl**: Integrates CPU, Memory, and ROM32K to form a complete computer.
- **.tst and .cmp files**: Test scripts and comparison files for validating each chip's functionality.

## Conclusion
Project 5 marks a significant milestone in understanding how individual hardware components integrate to create a complete computer system. By building the **Memory**, **CPU**, and **Computer**, the foundational knowledge of computer architecture has been greatly enhanced, culminating in a computer capable of executing machine-level programs effectively.

This project bridges the gap between basic gate logic and a functioning computer system, laying the groundwork for even more advanced projects in computer science and engineering.