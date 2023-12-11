class Instruction {
    constructor(operationType, operand1, operand2, imm, rsreg) {
        // Trim operationType to remove leading/trailing whitespaces
        this.operationType = operationType.trim(1);
        this.operand1 = operand1;
        this.operand2 = operand2;
        this.imm = imm;
        this.rsreg = rsreg;
        this.issueCycle = null;
        this.executionStartCycle = null;
        this.executionFinishCycle = null;
        this.writeResultCycle = null;
    }
    setIssueCycle(cycle){
        this.issueCycle = cycle;
    }
    setExecutionStartCycle(cycle){
        this.executionStartCycle = cycle;
    }   
    setExecutionFinishCycle(cycle){
        this.executionFinishCycle = cycle;
    }
    setWriteResultCycle(cycle){
        this.writeResultCycle = cycle;
    }
}

export { Instruction };
