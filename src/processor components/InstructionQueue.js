class InstructionQueue {
    constructor() {
        this.instructions = [];
        this.currentIndex = 0; // Keep track of the current index
    }

    enqueue(instruction) {
        // Add an instruction to the end of the queue
        this.instructions.push(instruction);
    }

    dequeue() {
        // Remove and return the next instruction from the front of the queue
        const nextInstruction = this.instructions[this.currentIndex];
        this.currentIndex++;
        return nextInstruction;
    }

    jumpToIndex(index) {
        // Jump to a specific instruction index
        this.currentIndex = index;
    }

    isEmpty() {
        // Check if the queue is empty
        return this.currentIndex >= this.instructions.length;
    }

    peek() {
        // Peek at the next instruction without removing it from the queue
        return this.instructions[this.currentIndex];
    }

    size() {
        // Get the current size of the queue
        return this.instructions.length;
    }

    clear() {
        // Clear all instructions from the queue
        this.instructions = [];
        this.currentIndex = 0; // Reset the current index
    }

    retCurrentIndex(){
        return this.currentIndex;
    }
}

export { InstructionQueue };
