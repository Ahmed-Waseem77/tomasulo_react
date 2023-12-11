import { memo } from "react";

class addressValue {
    constructor(address, value) {
        this.address = address;
        this.value = value;
    }
}

class Memory {
    constructor(size) {
        this.size = size;
        this.data = Array(size).fill([undefined, undefined]); // Initialize with undefined addresses and values
        this.paddedData = []; 
        this.maxAddress = 0;
    }

    read(address) {
        return this.data[address] ? this.data[address][1] : undefined;
    }

    write(address, value) {

        if (!this.data[address]) {
            this.data[address] = [address, undefined];
        }else{ 
            this.data[address] = [address, value]; 
        }

        if (address > this.maxAddress) {
            this.maxAddress = address + 1;
            this.updatePaddedData(); 
        }
    }

    getMemory() {
        return this.data;
    }

    updatePaddedData() {
        this.paddedData = [];
        for(let i = 0; i < this.maxAddress; i++){
            if (this.data[i] !== undefined && this.data[i][1] !== undefined) {
                var memoryValue = this.data[i][1];
                this.paddedData.push([i, memoryValue]);
            }
        }
    }

    getMemoryPadded() {
        this.updatePaddedData();
        console.log("padded data", this.paddedData);
        return this.paddedData;
    }
}
export { Memory };

//aw: edgecases
//flushing  bne
//reccurent bne
//writing to memory kaza mra 
