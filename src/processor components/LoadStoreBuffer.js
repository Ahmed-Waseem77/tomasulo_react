class LoadStoreBuffer {
    constructor(size) {
        this.buffer = new Array(size);
        this.head = 0;
        this.tail = 0;
    }

    isFull() {
        // Check if the load/store buffer is full
        return (this.tail + 1) % this.buffer.length === this.head;
    }

    isEmpty() {
        // Check if the load/store buffer is empty
        return this.head === this.tail;
    }

    enqueue(operationType, operand1, operand2, operand3) {
        // Enqueue a new load or store operation
        if (this.isFull()) {
            throw new Error("Load/store buffer is full. Cannot enqueue.");
        }

        this.buffer[this.tail] = { operationType, operand1, operand2, operand3 };
        this.tail = (this.tail + 1) % this.buffer.length;
    }

    dequeue() {
        // Dequeue the next load or store operation
        if (this.isEmpty()) {
            throw new Error("Load/store buffer is empty. Cannot dequeue.");
        }

        const operation = this.buffer[this.head];
        this.head = (this.head + 1) % this.buffer.length;

        return operation;
    }

    peek() {
        // Peek at the next load or store operation without removing it from the buffer
        if (this.isEmpty()) {
            throw new Error("Load/store buffer is empty. Cannot peek.");
        }

        return this.buffer[this.head];
    }

    clear() {
        // Clear all operations from the load/store buffer
        this.head = 0;
        this.tail = 0;
        this.buffer.fill(null);
    }
}

export { LoadStoreBuffer };
