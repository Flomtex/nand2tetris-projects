# Nand2Tetris Projects

This repository contains my solutions and implementation files for the Nand2Tetris course. The projects focus on building a computer from first principles, starting with logic gates and ending with an entire operating system.

## Project List

- **Project 1**: Elementary Logic Gates
- **Project 2**: Boolean Arithmetic
- More projects to come as I progress through the course!

## How to Use

Each project folder contains the following types of files:

- **`.hdl` files**: These are the Hardware Description Language files that define the logic gates and chips. Each `.hdl` file is the core of your implementation, describing how each part of the Hack computer works.
- **Test scripts (`.tst`)**: These files are used to verify the functionality of each chip. They provide test cases that simulate various inputs and check if the output matches expectations.
- **Comparison files (`.cmp`)**: These files contain the expected output for each test. The hardware simulator uses these files to compare your chip's output against the correct output, helping you identify any issues.
- **Output files (`.out`)**: These files are generated after running the tests. They record the actual output of your chips, which can then be compared to the `.cmp` files to determine if your implementation is correct.

To test a chip, use the provided `.tst` scripts along with the Hardware Simulator included in the Nand2Tetris software suite. The simulator will generate `.out` files that indicate whether your implementation passes the tests.

## About Nand2Tetris

The Nand2Tetris course takes you through building a computer from the ground up. It covers both the hardware and software aspects of computing, helping you understand how modern computers work internally. By the end of the course, you will have built a fully functioning computer, including an ALU, CPU, and memory, and will have implemented a simple operating system and a high-level programming language.

This repository serves as a log of my journey through the course, documenting each step of building the Hack computer. It provides insight into foundational concepts of computer science and digital design, helping to demystify how computers operate at the most fundamental level.