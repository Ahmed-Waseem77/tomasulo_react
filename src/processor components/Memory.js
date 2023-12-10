class Memory {
    constructor(size) {
        this.size = size;
        this.data = new Array(size).fill(0);
    }

    read(address) {
        // Perform read operation from memory
        return this.data[address];
    }

    write(address, value) {
        // Perform write operation to memory
        this.data[address] = value;
    }
}export { Memory }