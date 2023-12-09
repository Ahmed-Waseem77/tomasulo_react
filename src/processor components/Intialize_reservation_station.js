function initializeReservationStations() {
    const reservationStations = [];

    // Assuming you have instances of the FunctionalUnit class
    const loadUnit = new FunctionalUnit(3);
    const storeUnit = new FunctionalUnit(3);
    const bneUnit = new FunctionalUnit(2);
    const callRetUnit = new FunctionalUnit(2);
    const addAddiUnit = new FunctionalUnit(2);
    const nandUnit = new FunctionalUnit(1);
    const divUnit = new FunctionalUnit(10);

    // Limit the number of reservation stations for each functional unit type
    const maxLoadUnits = 2;
    const maxStoreUnits = 2;
    const maxBneUnits = 1;
    const maxCallRetUnits = 1;
    const maxAddAddiUnits = 3;
    const maxNandUnits = 1;
    const maxDivUnits = 1;

    for (let i = 0; i < maxLoadUnits; i++) {
        reservationStations.push(new ReservationStation("LOAD", null, null, loadUnit, null));
    }

    for (let i = 0; i < maxStoreUnits; i++) {
        reservationStations.push(new ReservationStation("STORE", null, null, storeUnit, null));
    }

    for (let i = 0; i < maxBneUnits; i++) {
        reservationStations.push(new ReservationStation("BNE", null, null, bneUnit, null));
    }

    for (let i = 0; i < maxCallRetUnits; i++) {
        reservationStations.push(new ReservationStation("CALL/RET", null, null, callRetUnit, null));
    }

    for (let i = 0; i < maxAddAddiUnits; i++) {
        reservationStations.push(new ReservationStation("ADD/ADDI", null, null, addAddiUnit, null));
    }

    for (let i = 0; i < maxNandUnits; i++) {
        reservationStations.push(new ReservationStation("NAND", null, null, nandUnit, null));
    }

    for (let i = 0; i < maxDivUnits; i++) {
        reservationStations.push(new ReservationStation("DIV", null, null, divUnit, null));
    }

    return reservationStations;
}

// Example usage
const reservationStations = initializeReservationStations();
