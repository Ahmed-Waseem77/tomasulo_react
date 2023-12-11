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


function App() {
  const [memoryValue1, setMemoryValue1] = useState("");
  const [memoryValue2, setMemoryValue2] = useState("");
  const [isDisabled, setIsDisabled] = useState(false); 
  const [memoryData, setMemoryData] = useState([]);

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

  const handleInputMemoryButtonClick = () => {
    const address = parseInt(memoryValue1);
    const data = parseInt(memoryValue2);
    tomasuloSimulator.memory.write(address, data);
    console.log(`Memory write: Address=${address}, Data=${data}`); 

  const newMemoryData = tomasuloSimulator.memory.getMemoryPadded().map((memory, index) => ({
    "MEMORY ADDRESS": memory[0],      // MEMORY ADDRESS
    VALUE: memory[1]                 // VALUE
  })); 

  setMemoryData(newMemoryData);

  }

  React.useEffect(() => {
    console.log("reservation stations", reservationStations);
  }, [reservationStations]);

  const handleStepButtonClick = () => {
    var reservationStationsData = tomasuloSimulator.step();
    setReservationStations(reservationStationsData.map((station) => ({
      reservationStations: station.unitName,
      //make the value of busy string yes or no base on the boolean value
      Busy: station.Busy ? "Yes" : "No",
      Op: station.Op,
      Vj: station.Vj,
      Vk: station.Vk,
      Qj: station.Qj,
      Qk: station.Qk,
      A:  station.A,
    })));
  };

  // const memoryData = tomasuloSimulator.memory.getMemory().map((memory, index) => ({
  //   "MEMORY ADDRESS": index,      // MEMORY ADDRESS
  //   VALUE: memory      // VALUE
  // }));

  
  
  const registersData = tomasuloSimulator.registers.getRegisters().map((register, index) => ({
    REGISTER : `R${index}`,      // REGISTER
    VALUE: register.value,      // VALUE
    BUSY: register.busy,       // BUSY
    STATION: register.Qi      // STATION
}));
  const instructionData = tomasuloSimulator.instructionQueue.getInstructions().map((instruction, index) => ({
    INSTRUCTION : instruction.operationType + instruction.operand1 + instruction.operand2,  // INSTRUCTION
    ISSUE: instruction.issueCycle,  // ISSUE
    EXECUTE_BEGIN: instruction.executionStartCycle,   // EXECUTE BEGIN
    EXECUTE_END: instruction.executionFinishCycle,      // EXECUTE END
    WRITE_RESULT: instruction.writeResultCycle      // WRITE RESULT
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
          <GenericTable columns={["INSTRUCTION", "ISSUE", "EXECUTE_BEGIN", "EXECUTE_END", "WRITE_RESULT"]}
            data={instructionData}
            numRows={instructionData.length}
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
            <button className="generic-button" onClick={handleInputMemoryButtonClick}>INSERT</button>
          </div>

          {/* Memory table*/}
          <GenericTable columns={["MEMORY ADDRESS", "VALUE"]} 
                        data={memoryData} 
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
