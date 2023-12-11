import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Riscv16TextArea } from './react_components/riscv16TextArea.js';
import GenericTable from './react_components/genericTable.js';
import { Instruction } from './processor components/Instruction.js';
import { TomasuloSimulator } from './TomasuloSimulator.js';

var textAreaRef = "";

const tomasuloSimulator = new TomasuloSimulator(128 * 1024, 8, 100);
tomasuloSimulator.initializeReservationStations();

function App() {
  const [memoryValue1, setMemoryValue1] = useState("");
  const [memoryValue2, setMemoryValue2] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  textAreaRef = useRef();
  const [reservationStations, setReservationStations] = useState([]);

  const handleButtonClick = () => {
    if (textAreaRef.current) {
      const text = textAreaRef.current.getEditorText();
      console.log(text);
      setIsDisabled(true);
    }
  };

  const handleInsertClick = () => {
    console.log("insert clicked", textAreaRef.current.getEditorText());
    var instructions = parseInstructions(textAreaRef.current.getEditorText());
    tomasuloSimulator.loadProgram(instructions);
    console.log("instruction list", instructions);
  }

  function parseInstructions(riscvCode) {
    var operand1 = null;
    var operand2 = null;
    var imm = null;
    var rsreg = null;
    // Your logic to parse RISC-V16 code and return an array of Instruction objects
    // Example logic (use your actual parsing logic):
    const instructions = riscvCode.split('\n').map((line) => {
      var [operationType, val1, val2, val3] = line.split(' ');

      //make operationType uppercase
      operationType = operationType.toUpperCase();
      
      if(operationType === "LOAD"){
        //load rdreg imm operand1
         rsreg = val1;
         imm = val2;
         operand1 = val3;
         operand2 = null;
        return new Instruction(operationType, parseInt(operand1), parseInt(operand2), parseInt(imm), parseInt(rsreg));
      }
      if(operationType === "STORE"){
        //store 
         operand1 = val3;
         operand2 = val1;
         imm = val2;
         rsreg = null;
        return new Instruction(operationType, parseInt(operand1), parseInt(operand2), parseInt(imm), parseInt(rsreg));
      }
      if(operationType === "BNE"){
        //bne
         operand1 = val1;
         operand2 = val2;
         imm = val3;
         rsreg = null;
        return new Instruction(operationType, parseInt(operand1), parseInt(operand2), parseInt(imm), parseInt(rsreg));
      }
      if(operationType === "CALL"){
        //call
         operand1 = null;
         operand2 = null;
         imm = val1;
         rsreg = null;
        return new Instruction(operationType, parseInt(operand1), parseInt(operand2), parseInt(imm), parseInt(rsreg));
      }
      if(operationType === "RET"){
        //ret
        const operand1 = null;
        const operand2 = null;
        const imm = null;
        const rsreg = val1;
        return new Instruction(operationType, parseInt(operand1), parseInt(operand2), parseInt(imm), parseInt(rsreg));
      }
      if(operationType === "ADD" || operationType === "ADDI" || operationType === "NAND" || operationType === "DIV"){
        //add addi nand div
        const operand1 = val3;
        const operand2 = val2;
        const imm = null;
        const rsreg = val1;
        return new Instruction(operationType, parseInt(operand1), parseInt(operand2), parseInt(imm), parseInt(rsreg));
      }

      return new Instruction(operationType, parseInt(operand1), parseInt(operand2), parseInt(imm), parseInt(rsreg));
    });
  
    return instructions;
  }

  React.useEffect(() => {
    console.log("reservation stations", reservationStations);
  }, [reservationStations]);

  const handleStepButtonClick = () => {
    var reservationStationsData = tomasuloSimulator.step();
    setReservationStations(reservationStationsData.map((station) => ({
      reservationStations: station.unitName,
      Busy: station.Busy,
      Op: station.Op,
      Vj: station.Vj,
      Vk: station.Vk,
      Qj: station.Qj,
      Qk: station.Qk,
      A: station.A,
    })));
  };
  
  const registersData = tomasuloSimulator.registers.getRegisters().map((register, index) => ({
    REGISTER : `R${index}`,  // REGISTER
    VALUE: register.value,  // VALUE
    BUSY: register.busy,   // BUSY
    STATION: register.Qi      // STATION
}));
  
  React.useEffect(() => {
    console.log("registersData", registersData);
  }, [registersData]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>TOMASULO RISCV16</h1>
        <h6>
          Supported Instructions: ADD, ADDI, NAND, SUB, DIV, BNE, CALL, RET, STORE, LOAD, STORE
          <br></br> Registers from R0 to R7
        </h6>
      </header>
      <div className="simulator-container">
        <div className="cm-area">
          <h6>riscv16 code</h6>
          <hr></hr>
          <Riscv16TextArea ref={textAreaRef} />
          <button className="generic-button" onClick={handleInsertClick}>INSERT INSTRUCTIONS</button>
          <button className="generic-button" onClick={handleButtonClick}>BEGIN</button>
          <button className="generic-button" onClick={handleStepButtonClick}>STEP</button>
        </div>
        <div className='tables-container'>
          <GenericTable columns={["INSTRUCTION", "ISSUE", "EXECUTE BEGIN", "EXECUTE END", "WRITE RESULT"]}
            data={[["ADD", 0, 0, 0, 0], ["ADD", 0, 0, 0, 0], ["ADD", 0, 0, 0, 0]]}
            numRows={5}
            numCols={5}
          />
          <GenericTable columns={["reservationStations", "Busy", "Op", "Vj", "Vk", "Qj", "Qk", "A"]}
            data={reservationStations}
            numRows={reservationStations.length}
            numCols={8}
          />
          {console.log("registers", tomasuloSimulator.registers.getRegisters())}
          <GenericTable columns={["REGISTER", "VALUE", "BUSY", "STATION"]}
            
            data={registersData}
            numRows={registersData.length}
            numCols={4}
          />
        </div>
        <div className="memory-io">
          <div className="io-area">
            ADDRESS: <input type="text" value={memoryValue1} disabled={isDisabled} onChange={(e) => setMemoryValue1(e.target.value)} />
            VALUE: <input type="text" value={memoryValue2} disabled={isDisabled} onChange={(e) => setMemoryValue2(e.target.value)} />
            <button className="generic-button">INSERT</button>
          </div>
          <GenericTable columns={["MEMORY ADDRESS", "VALUE"]} 
                        data={[["0x0000",0],["0x0001",0],["0x0002",0],["0x0003",0],["0x0004",0],["0x0005",0],["0x0006",0],["0x0007",0]]} 
                        numRows={8} 
                        numCols={2} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
export { textAreaRef };
