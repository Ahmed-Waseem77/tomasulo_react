import { Memory } from "./processor components/Memory.js";
import { AddressUnit } from "./processor components/addressUnit.js";
import { InstructionQueue } from "./processor components/InstructionQueue.js";
import { AddressRegisters } from "./processor components/AddressRegisters.js";
import { ReservationStation } from "./processor components/ReservationStation.js";
import { FunctionalUnit } from "./processor components/FunctionalUnit.js";
import { Instruction } from "./processor components/Instruction.js";

class TomasuloSimulator {
    constructor(memorySize, numAddressRegisters, numCycles) {
        this.memory = new Memory(memorySize);
        this.addressUnit = new AddressUnit();
        this.instructionQueue = new InstructionQueue();
        this.addressRegisters = new AddressRegisters(numAddressRegisters);

        // Initialize reservation stations and functional units
        this.initializeReservationStations();
       

        // Simulation parameters
        this.currentCycle = 0;
        this.numCycles = numCycles;
    }

    initializeReservationStations() {
        this.reservationStations = [];
        const loadUnit = new FunctionalUnit(3);
        const storeUnit = new FunctionalUnit(3);
        const bneUnit = new FunctionalUnit(2);
        const callRetUnit = new FunctionalUnit(2);
        const addAddiUnit = new FunctionalUnit(2);
        const nandUnit = new FunctionalUnit(1);
        const divUnit = new FunctionalUnit(10);
        // Create instances of FunctionalUnit
        this.functionalUnits = {
            loadUnit: new FunctionalUnit(3),
            storeUnit: new FunctionalUnit(3),
            bneUnit: new FunctionalUnit(2),
            callRetUnit: new FunctionalUnit(2),
            addAddiUnit: new FunctionalUnit(2),
            nandUnit: new FunctionalUnit(1),
            divUnit: new FunctionalUnit(10)
        };
    
        // Limit the number of reservation stations for each functional unit type
        const maxLoadUnits = 2;
        const maxStoreUnits = 2;
        const maxBneUnits = 1;
        const maxCallRetUnits = 1;
        const maxAddAddiUnits = 3;
        const maxNandUnits = 1;
        const maxDivUnits = 1;
    
        const addOperands = [null, null, null];
        const multOperands = [null, null, null];
        // ... define operands for other types
    
        for (let i = 0; i < maxLoadUnits; i++) {
            this.reservationStations.push(new ReservationStation("LOAD", addOperands, loadUnit, null));
        }
    
        for (let i = 0; i < maxStoreUnits; i++) {
            this.reservationStations.push(new ReservationStation("STORE", addOperands, storeUnit, null));
        }
    
        for (let i = 0; i < maxBneUnits; i++) {
            this.reservationStations.push(new ReservationStation("BNE", addOperands, bneUnit, null));
        }
    
        for (let i = 0; i < maxCallRetUnits; i++) {
            this.reservationStations.push(new ReservationStation("CALL/RET", addOperands, callRetUnit, null));
        }
    
        for (let i = 0; i < maxAddAddiUnits; i++) {
            this.reservationStations.push(new ReservationStation("ADD/ADDI", addOperands, addAddiUnit, null));
        }
    
        for (let i = 0; i < maxNandUnits; i++) {
            this.reservationStations.push(new ReservationStation("NAND", addOperands, nandUnit, null));
        }
    
        for (let i = 0; i < maxDivUnits; i++) {
            this.reservationStations.push(new ReservationStation("DIV", multOperands, divUnit, null));
        }
    
    }
    
    

    loadProgram(instructions) {
        // Load instructions into the instruction queue
        for (const instruction of instructions) {
            this.instructionQueue.enqueue(instruction);
        }
    }

    step() {
        // Perform one simulation step
        if (this.currentCycle < this.numCycles) {
            // Execute reservation stations
            console.log(this.reservationStations);
            for (const reservationStation of this.reservationStations) {
                reservationStation.executeInstruction(this.addressRegisters);
                reservationStation.writeResult(this.addressRegisters);
            }

            // Execute functional units
            for (const functionalUnit of Object.values(this.functionalUnits)) {
                functionalUnit.execute();
            }

            // Issue instructions from the instruction queue to reservation stations
            this.issueInstructions();

            // Increment the cycle count
            this.currentCycle++;
        }
    }

    issueInstructions() {
        // Issue instructions to reservation stations
        for (const reservationStation of this.reservationStations) {
            if (!reservationStation.isBusy() && !this.instructionQueue.isEmpty()) {
                const instruction = this.instructionQueue.dequeue();
                reservationStation.issueInstruction(instruction);
            }
        }
    }

    simulate() {
        // Simulate the execution of the program
        while (this.currentCycle < this.numCycles) {
            this.step();
        }

        // Display simulation results
        this.displayResults();
    }

    displayResults() {
        // Display simulation results (e.g., clock cycle time, IPC, etc.)
        // ...
        console.log(this.currentCycle);
        console.log(this.addressRegisters);
        console.log(this.reservationStations);
        console.log(this.functionalUnits);

    }
    
}export { TomasuloSimulator };


