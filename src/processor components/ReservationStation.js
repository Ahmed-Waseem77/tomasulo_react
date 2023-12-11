import { Register } from "./registers.js";
import { Memory } from "./Memory.js";
import { Instruction } from "./Instruction.js";
class ReservationStation {
constructor(unitName){
    this.Busy = false;
    this.Op = null;
    this.Vj = null;
    this.Vk = null;
    this.Qj = null;
    this.Qk = null;
    this.A = null;
    this.currentCycle = 0;
    this.startCycle = null;
    this.remainingCycles = null;
    this.instruction = new Instruction("", 0, 0, 0, 0);
    this.unitName = unitName;
    this.startedExcution = false;
}
setBusy(isBusy){
    this.Busy = isBusy;
}
isBusy(){
    return this.Busy;
}
checkUnit(instruction){
    console.log("check unit", instruction);
    //check if operationType is supported by this unit by checking the unitName
    if(instruction.operationType ==="LOAD"){
        if(this.unitName === "LOAD1" || this.unitName === "LOAD2"){
            return true;
        }
    }
    if(instruction.operationType ==="STORE"){
        if(this.unitName === "STORE1" || this.unitName === "STORE2"){
            return true;
        }
    }
    if(instruction.operationType ==="BNE"){
        if(this.unitName === "BNE1"){
            return true;
        }
    }
    if(instruction.operationType ==="CALL" || instruction.operationType ==="RET"){
        if(this.unitName === "CALL/RET1"){
            return true;
        }
    }
    if(instruction.operationType ==="ADD" || instruction.operationType ==="ADDI"){
        if(this.unitName === "ADD/ADDI1" || this.unitName === "ADD/ADDI2" || this.unitName === "ADD/ADDI3"){
            return true;
        }
    }
    if(instruction.operationType ==="NAND"){
        if(this.unitName === "NAND1"){
            return true;
        }
    }
    if(instruction.operationType ==="DIV"){
        if(this.unitName === "DIV1"){
            return true;
        }
    }
    return false;
}
issueInstruction(instruction, currentCycle, registers, PC){
    
    this.instruction = instruction;
    this.Busy = true;
    //remove spaces from operationType
    this.Op = instruction.operationType;
    this.startCycle = currentCycle;
    console.log("issue instruction ", this.Op);
    this.instruction.setIssueCycle(currentCycle);
    if(instruction.operationType === "LOAD" || instruction.operationType === "STORE"){
        this.Vj = registers.read(instruction.operand1);
        this.Qj = registers.getQi(instruction.operand1);
        this.A = instruction.imm;
        if(instruction.operationType === "LOAD"){
            registers.setBusy_Qi(instruction.rsreg, true, this.unitName);
        }
        if(instruction.operationType === "STORE"){
            this.Vk = registers.read(instruction.operand2);
            this.Qk = registers.getQi(instruction.operand2);
        }
    }
    if(instruction.operationType === "BNE"){
        this.Vj = registers.read(instruction.operand1);
        this.Qj = registers.getQi(instruction.operand1);
        this.Vk = registers.read(instruction.operand2);
        this.Qk = registers.getQi(instruction.operand2);
        this.A = PC + 1 + instruction.imm;
    }
    if(instruction.operationType === "CALL"){
        this.Vj = PC + 1;
        this.A = instruction.imm;
        registers.setBusy_Qi(1, true, this.unitName);
    }
    if(instruction.operationType === "RET"){
        this.A = registers.read(1);
    }
    if(instruction.operationType === "ADD" || instruction.operationType === "NAND" || instruction.operationType === "DIV"){
        this.Vj = registers.read(instruction.operand1);
        this.Qj = registers.getQi(instruction.operand1);
        this.Vk = registers.read(instruction.operand2);
        this.Qk = registers.getQi(instruction.operand2);
        console.log("loooook",instruction);
        registers.setBusy_Qi(instruction.rsreg, true, this.unitName);
        return this.instruction;
    }
    if(instruction.operationType === "ADDI"){
    console.log("addi", instruction.operand1, instruction.imm, instruction.rsreg);
    this.Vj = registers.read(instruction.operand1);
    this.Qj = registers.getQi(instruction.operand1);
    this.Vk = instruction.imm;
    registers.setBusy_Qi(instruction.rsreg, true, this.unitName);
    return this.instruction;
    }
    return this.instruction;
}

    updateReservationStation(currentCycle, registers, PC, memory){
        //check if operands are ready
            if(this.Qj !== null && !registers.isBusy(this.instruction.operand1)){
                this.Vj = registers.read(this.instruction.operand1);
                this.Qj = registers.getQi(this.instruction.operand1);
            }
            if(this.Qk !== null && !registers.isBusy(this.instruction.operand2)){
                this.Vk = registers.read(this.instruction.operand2);
                this.Qk = registers.getQi(this.instruction.operand2);
            }
            console.log("beforeeeee operand1", this.instruction.operand1, "operand2", this.instruction.operand2);
            if (this.Qj !== null || this.Qk !== null) {
                if (!this.startedExcution) {
                    console.log("not ready we failed", this.Qj, this.Qk, registers.getQi(this.instruction.operand1), registers.getQi(this.instruction.operand2), this.unitName);
                    this.startCycle = currentCycle;
                    return PC;
                }
            } else if (!isNaN(this.instruction.operand1) ) {
                console.log("operand1", this.instruction.operand1, "operand2", this.instruction.operand2);
                if (registers.isBusy(this.instruction.operand1) && this.unitName !== registers.getQi(this.instruction.operand1)) {
                    if (!this.startedExcution) {
                        this.startCycle = currentCycle;
                        return PC;
                    }
                }
            } else if (!isNaN(this.instruction.operand2)) {
                if (registers.isBusy(this.instruction.operand2) && this.unitName !== registers.getQi(this.instruction.operand2)) {
                    if (!this.startedExcution) {
                        this.startCycle = currentCycle;
                        return PC;
                    }
                }
            }
            
        
            if(currentCycle === this.startCycle + 1){
            this.startedExcution = true;
            this.instruction.setExecutionStartCycle(currentCycle);
            }
        this.remainingCycles = currentCycle - this.startCycle;
        console.log("remaining cycles", this.remainingCycles, "op", this.Op, "unit ", this.unitName);

        if(this.remainingCycles === 1 && (this.instruction.operationType === "LOAD" || this.instruction.operationType === "STORE")){
            this.A = this.Vj + this.A;
            this.Vj = null;

        }
        if(this.remainingCycles === 3 && (this.instruction.operationType === "LOAD" || this.instruction.operationType === "STORE")){
        this.instruction.setExecutionFinishCycle(currentCycle);
        
    }else if(this.remainingCycles === 4 && (this.instruction.operationType === "LOAD" || this.instruction.operationType === "STORE")){
        this.instruction.setWriteResultCycle(currentCycle);
        if(this.instruction.operationType === "LOAD" ){ 
            registers.write(this.instruction.rsreg, this.A, false, null);
            this.clearReservationStation(PC);
            
        }
        if(this.instruction.operationType === "STORE" ){
            memory.write( this.A, this.Vk);
            this.clearReservationStation(PC);
            
        }
    }
    if(this.remainingCycles === 1 && this.instruction.operationType === "BNE"){
        if(this.Vj !== this.Vk){
            PC = this.A - 1;
            console.log("PC after bne", PC);
            this.instruction.setExecutionFinishCycle(currentCycle);
            this.clearReservationStation(PC);
        }
    }
    if(this.remainingCycles === 1 && this.instruction.operationType === "CALL"){
        registers.write(1, PC + 1 , false, null);
        PC = PC + this.A;
        console.log("PC after call", PC);
        this.clearReservationStation(PC);
    }
    if(this.remainingCycles === 1 && this.instruction.operationType === "RET"){
        PC = this.A;
        this.clearReservationStation(PC);
    }
    if(this.remainingCycles === 2 && (this.instruction.operationType === "ADD" || this.instruction.operationType === "ADDI")){
        this.instruction.setExecutionFinishCycle(currentCycle);

    }else if(this.remainingCycles === 3 && (this.instruction.operationType === "ADD" || this.instruction.operationType === "ADDI")){
        this.instruction.setWriteResultCycle(currentCycle);
        registers.write(this.instruction.rsreg, this.Vj + this.Vk, false, null);
        this.clearReservationStation(PC);
    }
    if(this.remainingCycles === 1 && this.instruction.operationType === "NAND"){
        this.instruction.setExecutionFinishCycle(currentCycle);
    }else if(this.remainingCycles === 2 && this.instruction.operationType === "NAND"){
        this.instruction.setWriteResultCycle(currentCycle);

        registers.write(this.instruction.rsreg, ((~(this.Vj & this.Vk)) >>> 0) & 0xFFFF, false, null);
        this.clearReservationStation(PC);
    }
    if(this.remainingCycles === 10 && this.instruction.operationType === "DIV"){
        this.instruction.setExecutionFinishCycle(currentCycle);
    }
    if(this.remainingCycles === 11 && this.instruction.operationType === "DIV"){
        this.instruction.setWriteResultCycle(currentCycle);
        registers.write(this.instruction.rsreg, this.Vj / this.Vk, false, null);
        this.clearReservationStation(PC);
    }
    return PC;
}

clearReservationStation(PC){
    this.Busy = false;
    this.Op = null;
    this.Vj = null;
    this.Vk = null;
    this.Qj = null;
    this.Qk = null;
    this.A = null;
    this.currentCycle = 0;
    this.startCycle = null;
    this.remainingCycles = null;
    this.startedExcution = false;
    return PC;
}

}export { ReservationStation };