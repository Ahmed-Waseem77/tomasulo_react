class CommonDataBus {
    constructor() {
        this.data = null;
    }

    write(data) {
        this.data = data;
    }

    read() {
        return this.data;
    }
}