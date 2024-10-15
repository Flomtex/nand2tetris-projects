# Nand2Tetris Projects

Welcome to my **Nand2Tetris** project repository! This repository contains my solutions and implementation files for the Nand2Tetris course. The projects focus on building a computer from first principles, starting with elementary logic gates and ending with a fully functioning computer system, including an operating system.

## Project List

1. **Project 1: Elementary Logic Gates**
   - Designed the fundamental building blocks of a computer, such as AND, OR, NOT, and NAND gates.
2. **Project 2: Boolean Arithmetic**
   - Built arithmetic components like adders and binary arithmetic chips, forming the basis for complex computations.
3. **Project 3: Sequential Logic**
   - Constructed sequential logic elements, including flip-flops, registers, and RAM, enabling data storage and memory operations.
4. **Project 4: Machine Language Programming**
   - Wrote programs in the Hack machine language to manipulate data and control flow.
5. **Project 5: Computer**
   - Integrated the ALU, CPU, Memory, and ROM to create a complete Hack computer capable of executing machine-level programs.

More projects to come as I progress through the course!

## How to Use

Each project folder contains the following types of files:

- **.hdl files**: These are the **Hardware Description Language** files that define the logic gates and chips. Each `.hdl` file describes how each part of the Hack computer functions.
- **Test scripts (.tst)**: These files are used to verify the functionality of each chip. They provide test cases that simulate various inputs and check if the output matches expectations.
- **Comparison files (.cmp)**: These files contain the expected output for each test. The hardware simulator uses these files to compare your chip's output against the correct output, helping you identify any issues.
- **Output files (.out)**: These files are generated after running the tests. They record the actual output of your chips, which can then be compared to the `.cmp` files to determine if your implementation is correct.

To test a chip, use the provided `.tst` scripts along with the **Hardware Simulator** included in the Nand2Tetris software suite. The simulator will generate `.out` files that indicate whether your implementation passes the tests.

## Current Progress

- Completed Projects 1 through 5, including foundational logic gates, arithmetic components, sequential logic, and creating a working computer capable of executing machine code.
- Upcoming projects will involve higher-level programming, developing an assembler, and building an operating system for the Hack computer.

## About Nand2Tetris

The **Nand2Tetris** course is a journey into building a computer from the ground up. It covers both the hardware and software aspects of computing, providing hands-on experience in creating a computer system starting from basic logic gates. By the end of the course, you will have built a fully functioning computer, including:

- **ALU**: The Arithmetic Logic Unit, capable of performing arithmetic and logic operations.
- **CPU**: The Central Processing Unit, which interprets and executes instructions.
- **Memory**: RAM and memory-mapped I/O for data storage and interaction with peripherals.
- **Operating System and High-Level Language**: A simple OS and a high-level language compiler, making the Hack computer a fully programmable system.

This repository serves as a log of my journey through the course, documenting each step of building the **Hack computer**. It provides insight into foundational concepts of computer science and digital design, demystifying how computers operate at the most fundamental level.

## Why This Matters

Understanding how computers work at a fundamental level bridges the gap between hardware and software. By building a computer from scratch, including designing hardware, writing low-level programs, and implementing an OS, this course helps to truly understand the **magic behind modern computing**. It showcases how simple binary operations can evolve into the sophisticated devices we use every day.

Feel free to explore my implementations, and if you're interested in this journey, I highly recommend diving into the **Nand2Tetris** course yourself!