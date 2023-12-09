class ReservationStation {
    constructor(operationType, op1, op2, functionalUnit, resultRegister) {
        this.operationType = operationType;
        this.op1 = op1;
        this.op2 = op2;
        this.functionalUnit = functionalUnit;
        this.result = null;
        this.resultRegister = resultRegister;
        this.executed = false;
        this.executionStartCycle = null;
        this.executionFinishCycle = null;
    }

    issueInstruction() {
        if (!this.functionalUnit.busy) {
            this.functionalUnit.issue(this.op1, this.op2);
            this.executed = false;
            this.executionStartCycle = this.functionalUnit.executionStartCycle;
        }
    }

    executeInstruction(registers) {
        if (!this.executed) {
            // Check if operands are available
            if (this.op1 && !registers.isBusy(this.op1)) {
                this.op1 = registers.read(this.op1);
            }
            if (this.op2 && !registers.isBusy(this.op2)) {
                this.op2 = registers.read(this.op2);
            }

            if (!this.op1 && !this.op2) {
                // Operands are ready, execute
                this.functionalUnit.execute(this.operationType);
                this.result = this.functionalUnit.result;
                this.executed = true;
                this.executionFinishCycle = this.functionalUnit.executionFinishCycle;
            }
        }
    }

    writeResult(registers) {
        if (this.executed && !this.functionalUnit.busy) {
            registers.write(this.resultRegister, this.result);
        }
    }
}
