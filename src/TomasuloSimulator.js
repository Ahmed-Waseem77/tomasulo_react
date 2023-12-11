import { Memory } from "./processor components/Memory.js";
import { AddressUnit } from "./processor components/addressUnit.js";
import { InstructionQueue } from "./processor components/InstructionQueue.js";
import { AddressRegisters } from "./processor components/AddressRegisters.js";
import { ReservationStation } from "./processor components/ReservationStation.js";
import { FunctionalUnit } from "./processor components/FunctionalUnit.js";
import { Registers } from "./processor components/registers.js"; // Import the correct class
import { Instruction } from "./processor components/Instruction.js";

class TomasuloSimulator {
    constructor(memorySize, numAddressRegisters, numCycles) {
        this.memory = new Memory(memorySize);
        this.addressUnit = new AddressUnit();
        this.instructionQueue = new InstructionQueue();
        this.addressRegisters = new AddressRegisters(numAddressRegisters);
        this.registers = new Registers(); // Instantiate the correct class
        this.PC = 0;
        
        // Initialize reservation stations and functional units
        this.initializeReservationStations();
        console.log(this.reservationStations);
        // Simulation parameters
        this.currentCycle = 0;
        this.numCycles = numCycles;
    }

    initializeReservationStations() {
        this.reservationStations = [];

        this.reservationStations.push(new ReservationStation("LOAD1"));
        this.reservationStations.push(new ReservationStation("LOAD2"));
        this.reservationStations.push(new ReservationStation("STORE1"));
        this.reservationStations.push(new ReservationStation("STORE2"));
        this.reservationStations.push(new ReservationStation("BNE1"));
        this.reservationStations.push(new ReservationStation("CALL/RET1"));
        this.reservationStations.push(new ReservationStation("ADD/ADDI1"));
        this.reservationStations.push(new ReservationStation("ADD/ADDI2"));
        this.reservationStations.push(new ReservationStation("ADD/ADDI3"));
        this.reservationStations.push(new ReservationStation("NAND1"));
        this.reservationStations.push(new ReservationStation("DIV1"));
        //intialize register values only first 10
        for(let i = 0; i < 10; i++){
            this.registers.write(i, i);
        }
    }

    loadProgram(instructions) {
        // Load instructions into the instruction queue
        for (const instruction of instructions) {
            this.instructionQueue.enqueue(instruction);
            
        }
    }

    step() {
        this.currentCycle++;
        console.log("current cycle", this.currentCycle);
        for(let i = 0; i < this.reservationStations.length; i++){
            
            if(this.instructionQueue.peek() === undefined){
                this.reservationStations[i].updateReservationStation(this.currentCycle, this.registers, this.instructionQueue.retCurrentIndex(), this.memory);
                break;
            }else
            if(!this.reservationStations[i].isBusy()&& this.reservationStations[i].checkUnit(this.instructionQueue.peek())){
                this.reservationStations[i].setBusy(true);
                this.reservationStations[i].startCycle = this.currentCycle;
                console.log("Before issueInstruction: ", this.instructionQueue.peek().operationType, "_", this.instructionQueue.peek().operand1, " ", this.instructionQueue.peek().operand2, " ", this.instructionQueue.peek().operand3, " ", this.instructionQueue.peek().PC);
                this.reservationStations[i].issueInstruction(this.instructionQueue.dequeue(), this.currentCycle, this.registers, this.instructionQueue.retCurrentIndex());
            }
            this.reservationStations[i].updateReservationStation(this.currentCycle, this.registers, this.instructionQueue.retCurrentIndex(), this.memory);

        }
        this.displayResults();
        const updatedReservationStations = this.reservationStations.map(station => {
            // Your logic to update reservation stations...
            return {
              unitName: station.unitName,
              Busy: station.Busy,
              Op: station.Op,
              Vj: station.Vj,
              Vk: station.Vk,
              Qj: station.Qj,
              Qk: station.Qk,
              A: station.A,
            };
          });
          console.log("updated reservation stations", updatedReservationStations);
          return updatedReservationStations;
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
        console.log(this.currentCycle);
        console.log(this.addressRegisters);
        console.log(this.registers);
        console.log(this.reservationStations);
        console.log("--------------------------");
    }
    getRegisters(){
        return this.registers;
    }
}

export { TomasuloSimulator };
