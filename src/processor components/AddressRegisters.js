class AddressRegisters {
    constructor() {
        this.values = new Array(8).fill(0); // Assuming 8 address registers
    }

    read(registerIndex) {
        // Read the value from the specified address register
        return this.values[registerIndex];
    }

    write(registerIndex, value) {
        // Write a value to the specified address register
        this.values[registerIndex] = value;
    }
}

export { AddressRegisters };
