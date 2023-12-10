import React, {useRef} from 'react';
import logo from './logo.svg'; 
import './App.css'; 
import {Riscv16TextArea} from './react_components/riscv16TextArea.js';
import GenericTable from './react_components/genericTable.js';
import {Instruction} from './processor components/Instruction.js';
import {TomasuloSimulator} from './TomasuloSimulator.js';
//import GenericIOTable from './react_components/genericIOTable.js';

var textAreaRef = "";
// Example usage
const tomasuloSimulator = new TomasuloSimulator(128 * 1024, 8, 100);
tomasuloSimulator.initializeReservationStations();
const programInstructions = [
    new Instruction("ADD", 1, 2, 3),
    new Instruction("LOAD", 4, 5, 6),
    // Add more instructions as needed
];
tomasuloSimulator.loadProgram(programInstructions);
tomasuloSimulator.simulate();
tomasuloSimulator.displayResults();
function App() {

  textAreaRef = useRef();

  const handleButtonClick = () => {
    if (textAreaRef.current) {
      const text = textAreaRef.current.getEditorText();
      console.log(text);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TOMASULO RISCV16</h1> 
        <h6>Supported Instructions: ADD, ADDI, NAND, SUB, DIV, BNE, CALL, RET, STORE, LOAD, STORE
        <br></br> Registers from R0 to R7</h6>
      </header>  
        <div className="simulator-container">  
          {/* TODO: add the simulator here 
              either Tables, or architecture simulation, to be discussed
              tables: T1: instruction issue, execute begin, execute end, write result 
                      T2: reservation stations 
              architecture: everything in detail, see https://youtu.be/zS9ngvUQPNM?si=YvRanIv92w-ik4r_ 
          */}
          <div className="cm-area"> 
            <h6>riscv16 code</h6> 
            <hr></hr>
            <Riscv16TextArea ref={textAreaRef}/>
            <button className="generic-button" onClick={handleButtonClick}>BEGIN</button>
          </div>
          <div className='tables-container'>
          <GenericTable columns={["INSTRUCTION", "ISSUE", "EXECUTE BEGIN", "EXECUTE END", "WRITE RESULT"]}
                        data={[["ADD",0,0,0,0],["ADD",0,0,0,0],["ADD",0,0,0,0]]}
                        numRows={5}
                        numCols={5}
                        />
          <GenericTable columns={["RESERVATION STATION", "BUSY", "OP", "Vj", "Vk", "Qj", "Qk"]}
                        data={[["MUL",0,0,0,0,0,0],["ADD2",0,0,0,0,0,0],["ADD3",0,0,0,0,0,0]]}
                        numRows={5}
                        numCols={7}
                        />
          <GenericTable columns={["REGISTER", "VALUE", "BUSY", "STATION"]}
                        data={[["R0",0,0,0],["R1",0,0,0],["R2",0,0,0],["R3",0,0,0],["R4",0,0,0],["R5",0,0,0],["R6",0,0,0],["R7",0,0,0]]}
                        numRows={8}
                        numCols={4}
                        />
          </div>
        </div>
      </div>
  );
}

export default App;
export {textAreaRef};
