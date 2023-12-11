class Registers {
    constructor() {
        //CREATE REGISTERS REG, QI AND INDEX THE VALUES DEFAULT TO 0
        this.registers = new Array(10).fill(0).map((value, index) => ({
            value: 0,
            busy: false,
            Qi: null,
        }));
    }

    read(registerIndex) {
        if (this.registers[registerIndex].busy) {
            return null;
        }else{
            return this.registers[registerIndex].value;
        }
    }

    getQi(registerIndex) {
        return this.registers[registerIndex].Qi;
    }

    write(registerIndex, data, busy = false, Qi = null) {
        this.registers[registerIndex].value = data;
        this.registers[registerIndex].busy = busy;
        this.registers[registerIndex].Qi = Qi;
    }

    isBusy(registerIndex) {
        console.log("register_indx",registerIndex);
        return this.registers[registerIndex].busy;
    }


    setBusy_Qi(registerIndex, isBusy = true, Qi) {
        console.log(registerIndex, " sss ", isBusy, " sss ", Qi);

        this.registers[registerIndex].busy = isBusy;
        this.registers[registerIndex].Qi = Qi;
    }

    getRegisters() {
        return this.registers;
    }
}export { Registers };