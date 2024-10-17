# Nand2Tetris Projects

This repository contains my solutions and implementation files for the Nand2Tetris course. The projects focus on building a computer from first principles, starting with logic gates and ending with an entire operating system.

## Project List

### Part 1: Hardware (Completed)

**Project 1: Elementary Logic Gates**  
Built elementary logic gates such as AND, OR, and NOT from NAND gates.

**Project 2: Boolean Arithmetic**  
Created adders and other arithmetic components to handle basic computations.

**Project 3: Sequential Logic**  
Constructed memory units, including D-Flip Flops, RAM8, RAM64, and RAM16K.

**Project 4: Machine Language**  
Wrote simple programs in Hack assembly language, including Mult.asm and Fill.asm.

**Project 5: Computer**  
Integrated the previously built ALU, registers, and RAM to create a CPU and a computer capable of executing machine-level programs.

**Project 6: Assembler**  
Developed an assembler to translate Hack assembly language into binary code.

### Part 2: Software (Ongoing)

**Project 7: Virtual Machine I - Stack Arithmetic**  
This project marks the beginning of the software section of Nand2Tetris. Built a basic Virtual Machine (VM) translator in JavaScript that translates high-level VM commands into Hack assembly code. This project includes arithmetic operations and basic memory access commands.

More projects to come as I progress through Part 2 of the course!

## How to Use
Each project folder contains the following types of files:

- **.hdl files**: These are the Hardware Description Language files that define the logic gates and chips. Each .hdl file is the core of your implementation, describing how each part of the Hack computer works.
- **Test scripts (.tst)**: These files are used to verify the functionality of each chip. They provide test cases that simulate various inputs and check if the output matches expectations.
- **Comparison files (.cmp)**: These files contain the expected output for each test. The hardware simulator uses these files to compare your chip's output against the correct output, helping you identify any issues.
- **Output files (.out)**: These files are generated after running the tests. They record the actual output of your chips, which can then be compared to the .cmp files to determine if your implementation is correct.

For Project 7 and later, we also include:
- **.vm files**: High-level virtual machine code, which is translated by the VMTranslator into Hack assembly code.
- **VMTranslator.js**: A JavaScript implementation of the Virtual Machine translator that processes `.vm` files and outputs `.asm` files.

To test a chip or software module, use the provided `.tst` scripts along with the Hardware or CPU Simulator included in the Nand2Tetris software suite. The simulator will generate `.out` files that indicate whether your implementation passes the tests.

## About Nand2Tetris
The Nand2Tetris course takes you through building a computer from the ground up. It covers both the hardware and software aspects of computing, helping you understand how modern computers work internally. By the end of the course, you will have built a fully functioning computer, including an ALU, CPU, and memory, and will have implemented a simple operating system and a high-level programming language.

This repository serves as a log of my journey through the course, documenting each step of building the Hack computer. It provides insight into foundational concepts of computer science and digital design, helping to demystify how computers operate at the most fundamental level.

## Why This Matters

Understanding how computers work at a fundamental level bridges the gap between hardware and software. By building a computer from scratch, including designing hardware, writing low-level programs, and implementing an OS, this course helps to truly understand the **magic behind modern computing**. It showcases how simple binary operations can evolve into the sophisticated devices we use every day.

Feel free to explore my implementations, and if you're interested in this journey, I highly recommend diving into the **Nand2Tetris** course yourself!