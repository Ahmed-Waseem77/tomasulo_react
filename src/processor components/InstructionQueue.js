class InstructionQueue {
    constructor() {
        this.instructions = [];
    }

    enqueue(instruction) {
        // Add an instruction to the end of the queue
        this.instructions.push(instruction);
    }

    dequeue() {
        // Remove and return the next instruction from the front of the queue
        return this.instructions.shift();
    }

    isEmpty() {
        // Check if the queue is empty
        return this.instructions.length === 0;
    }

    peek() {
        // Peek at the next instruction without removing it from the queue
        return this.instructions[0];
    }

    size() {
        // Get the current size of the queue
        return this.instructions.length;
    }

    clear() {
        // Clear all instructions from the queue
        this.instructions = [];
    }
}export { InstructionQueue }