class Registers {
    constructor() {
        this.registers = Array.from({ length: 32 }, () => ({ value: 0, busy: false }));
    }

    read(registerIndex) {
        return this.registers[registerIndex].value;
    }

    write(registerIndex, data, busy = false) {
        this.registers[registerIndex].value = data;
        this.registers[registerIndex].busy = busy;
    }

    isBusy(registerIndex) {
        return this.registers[registerIndex].busy;
    }

    setBusy(registerIndex, isBusy) {
        this.registers[registerIndex].busy = isBusy;
    }
}