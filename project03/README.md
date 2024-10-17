Project 03: Sequential Logic

Overview
In Project 03, we focus on building sequential logic circuits, which form the basis for memory units. These components store and manipulate data over time, enabling more complex operations in our computer architecture. The project is divided into two subfolders: a and b, each containing specific memory-related components.

Subfolders

1. a/ - Basic Memory Units
This folder contains the basic building blocks for memory storage and manipulation. These components are fundamental to creating larger memory units in the later parts of the project.

Bit.hdl: Implements a single-bit register that can store and output a single bit of data.
Register.hdl: A 16-bit register that can store a 16-bit value and is a key building block for larger memory units.
RAM8.hdl: Implements an 8-register memory, each capable of storing a 16-bit value.
RAM64.hdl: Extends the RAM8 architecture to 64 registers by stacking multiple RAM8 components.
PC.hdl: Implements the Program Counter, a special 16-bit register that increments or loads a new value based on control signals, keeping track of instruction execution.
Each component includes a .tst file for testing and a .cmp file for validating the correctness of your implementation.

2. b/ - Larger Memory Units
This folder contains implementations of larger memory units, building on the basic components developed in subfolder a.

RAM512.hdl: Implements a 512-register memory by stacking multiple RAM64 components.
RAM4K.hdl: A 4K-register memory constructed by using multiple RAM512 units.
RAM16K.hdl: Implements a 16K-register memory, created by combining RAM4K units.
These memory units are critical to building the overall architecture of the computer, as they enable large-scale data storage and retrieval.

Testing
Each component in both subfolders includes a corresponding .tst (test script) and .cmp (comparison) file. These scripts allow you to test the functionality of each component. To run the tests:

Load the .hdl file in the nand2tetris Hardware Simulator.
Load the corresponding .tst file.
Run the test script to ensure the component functions as expected.
Conclusion

Project 03 focuses on the development of memory components that will play a central role in the nand2tetris computer's architecture. Once these components are fully functional, they will be used to store data and instructions for later stages of the project.