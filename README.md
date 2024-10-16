# Nand2Tetris Project Repository

This repository contains my solutions and implementation files for the Nand2Tetris course. The course takes you through building a computer from the ground up, covering various projects that guide you in constructing both hardware and software components of a simple but functional computer system. Each project builds on the previous one, providing a comprehensive learning experience about how computers work.

## Project 1: Boolean Logic Gates

In Project 1, I built basic Boolean logic gates using HDL (Hardware Description Language). These gates are fundamental to constructing more complex circuits.

- **Gates Implemented**: AND, OR, NOT, NAND, XOR, Multiplexers, and Demultiplexers.
- **Tools Used**: Hardware simulator provided by the Nand2Tetris course.
- **Objective**: Understand the foundation of digital logic by constructing gates that serve as building blocks for all digital components.

## Project 2: ALU and More Gates

In Project 2, I built more complex gates and an Arithmetic Logic Unit (ALU), which is the heart of the computer's processing capability.

- **Components Implemented**: ALU, multiplexers, adders, etc.
- **Objective**: Learn how to combine basic gates to create complex processing units.

## Project 3: Sequential Logic

Project 3 involved constructing memory elements using flip-flops to understand how data storage works at the hardware level.

- **Components Implemented**: Registers, RAM8, RAM64, RAM512, RAM4K, and RAM16K.
- **Objective**: Understand the basics of data storage and sequential logic, which are key to building a computer's memory.

## Project 4: Machine Language

In Project 4, I learned how to write programs in the Hack machine language.

- **Focus**: Understand low-level programming and how to directly control the hardware using machine instructions.
- **Programs Written**: Simple programs like addition, comparisons, and loops.

## Project 5: Computer Architecture

Project 5 involved putting together the previously built components to form a complete Hack computer.

- **Components Used**: ALU, memory units, and control logic.
- **Objective**: Integrate all components to build a functioning computer capable of executing programs.

## Project 6: Assembler

In Project 6, I built an assembler that translates Hack assembly code into machine code.

- **Language Used**: Implemented in Python.
- **Objective**: Learn about the translation process between high-level programming languages and machine code, providing a better understanding of how compilers and interpreters work.

## Project 7: Virtual Machine Translator

The objective of Project 7 was to create a basic VM Translator that converts VM commands involving arithmetic, memory access (push and pop), and basic logic into Hack assembly code. The translator for Project 7 is implemented as `VMTranslator7.js`.

- **VMTranslator7.js**: Handles arithmetic commands (`add`, `sub`, etc.), logic commands (`and`, `or`, etc.), and memory access commands (`push`, `pop` for various segments).
- **Usage**: Run using the command `node VMTranslator7.js <filename.vm>`.
- **Testing**: Verified against stack arithmetic and memory access tests provided in the Nand2Tetris course.

## Project 8: Extended VM Translator

In Project 8, I extended the VM Translator to handle more advanced VM commands, including function calls, program flow, and recursion. The enhanced translator is implemented as `VMTranslator8.js`.

- **VMTranslator8.js**: Adds support for program flow commands (`label`, `goto`, `if-goto`) and function handling (`function`, `call`, `return`). This translator is designed specifically for Project 8 and will not work correctly for Project 7 files without modifications.
- **Usage**: Run using the command `node VMTranslator8.js <directory>`. Copy the translator into each test directory before running.
- **Testing**: Verified using the provided tests for function calls, program flow, and recursion.

## How to Use

Each project folder contains the following types of files:

- **.hdl files**: These are the Hardware Description Language files that define the logic gates and chips. Each `.hdl` file is the core of your implementation, describing how each part of the Hack computer works.
- **Test scripts (.tst)**: These files are used to verify the functionality of each chip. They provide test cases that simulate various inputs and check if the output matches expectations.
- **Comparison files (.cmp)**: These files contain the expected output for each test. The hardware simulator uses these files to compare your chip's output against the correct output, helping you identify any issues.
- **Output files (.out)**: These files are generated after running the tests. They record the actual output of your chips, which can then be compared to the `.cmp` files to determine if your implementation is correct.

For Project 7 and later, we also include:

- **.vm files**: High-level virtual machine code, which is translated by the VMTranslator into Hack assembly code.
- **VMTranslator7.js / VMTranslator8.js**: JavaScript implementations of the Virtual Machine translator that process `.vm` files and output `.asm` files.

To test a chip or software module, use the provided `.tst` scripts along with the Hardware or CPU Simulator included in the Nand2Tetris software suite. The simulator will generate `.out` files that indicate whether your implementation passes the tests.

## About Nand2Tetris

The Nand2Tetris course takes you through building a computer from the ground up. It covers both the hardware and software aspects of computing, helping you understand how modern computers work internally. By the end of the course, you will have built a fully functioning computer, including an ALU, CPU, and memory, and will have implemented a simple operating system and a high-level programming language.

This repository serves as a log of my journey through the course, documenting each step of building the Hack computer. It provides insight into foundational concepts of computer science and digital design, helping to demystify how computers operate at the most fundamental level.

## Why This Matters

Understanding how computers work at a fundamental level bridges the gap between hardware and software. By building a computer from scratch, including designing hardware, writing low-level programs, and implementing an OS, this course helps to truly understand the **magic behind modern computing**. It showcases how simple binary operations can evolve into the sophisticated devices we use every day.

## Conclusion

This repository showcases my journey through the Nand2Tetris course, from building foundational logic gates to creating a fully functional computer and the associated software. Each project provided valuable insights into how different layers of abstraction work together to create the computing systems we use today.

Feel free to explore my implementations, and if you're interested in this journey, I highly recommend diving into the **Nand2Tetris** course yourself!