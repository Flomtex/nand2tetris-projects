This ZIP file, named project6.zip, is part of the submission for Project 6 of the Nand2Tetris course. In this project, I developed my own assembler for the Hack machine language entirely from scratch, instead of using the provided assembler tool included with the course. The goal of the project was to gain hands-on experience in translating symbolic machine code (.asm files) into binary machine code (.hack files) that the Hack computer can execute.

The assembler was implemented in JavaScript and follows a two-pass strategy. During the first pass, it handles labels by recording memory addresses, and in the second pass, it translates A- and C-instructions into 16-bit binary code. The assembler reads assembly programs, processes labels, variables, and translates the instructions to produce executable machine language code.

Included in this ZIP are the following .hack files:

Add.hack
Max.hack
Rect.hack
Pong.hack
These files are the translated outputs of the respective .asm programs, demonstrating that the assembler correctly processes different types of instructions and addresses. The prog.txt file is included to indicate that this submission follows the "programming option," where I wrote an assembler programmatically rather than manually converting the assembly code.

This project showcases my understanding of low-level computing concepts and my ability to create fundamental tools from scratch—an essential step towards building a fully functioning computer from the ground up.