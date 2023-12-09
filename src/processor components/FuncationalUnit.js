class FunctionalUnit {
    constructor(cyclesNeeded) {
        this.busy = false;
        this.cyclesNeeded = cyclesNeeded;
        this.currentCycle = 0;
        this.result = null;
        this.op1 = null;
        this.op2 = null;
    }

    execute(operationType) {
        if (this.busy) {
            this.currentCycle++;

            // Logic for specific operations
            switch (operationType) {
                case "LOAD":
                case "STORE":
                    if (this.currentCycle === 3) {
                        // Compute address and read/write from memory
                        this.result = this.op1 + this.op2;
                    }
                    break;
                case "BNE":
                case "CALL/RET":
                    if (this.currentCycle === 2) {
                        // Compute target or return address
                        this.result = this.op1 + this.op2;
                    }
                    break;
                case "ADD":
                case "ADDI":
                    if (this.currentCycle === 2) {
                        // Perform addition
                        this.result = this.op1 + this.op2;
                    }
                    break;
                case "NAND":
                    if (this.currentCycle === 1) {
                        // Perform NAND
                        this.result = ~(this.op1 & this.op2);
                    }
                    break;
                case "DIV":
                    if (this.currentCycle === 10) {
                        // Perform division
                        if (this.op2 !== 0) {
                            this.result = this.op1 / this.op2;
                        }
                    }
                    break;
                // Add more cases for other operations

                default:
                    // Handle unsupported operation
                    break;
            }

            if (this.currentCycle === this.cyclesNeeded) {
                this.busy = false;
                this.currentCycle = 0;
                return true; // Execution completed
            }
        }
        return false; // Execution ongoing or not started
    }

    issue(op1, op2) {
        this.op1 = op1;
        this.op2 = op2;
        this.busy = true;
    }
}

