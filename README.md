# Tomasulo's Algorithm
Tomasulos' architecture and algorithm visualization for Computer Architecture Course, AUC Fall 2023-2024, Written in ReactJS

``Brought to you by, Ahmed Waseem Raslan 900211250 and Ahmed Elbarbary 900213964``




## Installing 
```
git clone https://github.com/Ahmed-Waseem77/tomasulo_react.git
```
or ssh if you have it set up

## Setting up

As any basic ReactJS App:

```
cd tomasulo_react
npm install
npm start
``` 
## Usage

User must type out their instructions (copy pasting may present unhandled
white space so beware). User then clicks on INSERT INSTRUCTION then on
STEP button.
Any Memory initialization must be carried out before stepping Using adores
value text boxes

User must enter instructions as follows

```
addi 1 1 1
add 1 2 3
bne 1 2 -1
```
instead as

```
addi r1 r1 1
.L: add r1 r2 r3
bne r1 r2 .L
```