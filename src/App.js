import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Riscv16TextArea } from './react_components/riscv16TextArea.js';
import GenericTable from './react_components/genericTable.js';

var textAreaRef = "";

function App() {
  const [memoryValue1, setMemoryValue1] = useState("");
  const [memoryValue2, setMemoryValue2] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  textAreaRef = useRef();

  const handleButtonClick = () => {
    if (textAreaRef.current) {
      const text = textAreaRef.current.getEditorText();
      console.log(text);
      setIsDisabled(true);
    }
  };

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
        {/* TODO: add the simulator here
              either Tables, or architecture simulation, to be discussed
              tables: T1: instruction issue, execute begin, execute end, write result
                      T2: reservation stations
              architecture: everything in detail, see https://youtu.be/zS9ngvUQPNM?si=YvRanIv92w-ik4r_
          */}
        <div className="cm-area">
          <h6>riscv16 code</h6>
          <hr></hr>
          <Riscv16TextArea ref={textAreaRef} />
          <button className="generic-button" onClick={handleButtonClick}>BEGIN</button>
        </div>
        <div className='tables-container'>
          <GenericTable columns={["INSTRUCTION", "ISSUE", "EXECUTE BEGIN", "EXECUTE END", "WRITE RESULT"]}
            data={[["ADD", 0, 0, 0, 0], ["ADD", 0, 0, 0, 0], ["ADD", 0, 0, 0, 0]]}
            numRows={5}
            numCols={5}
          />
          <GenericTable columns={["RESERVATION STATION", "BUSY", "OP", "Vj", "Vk", "Qj", "Qk"]}
            data={[["MUL", 0, 0, 0, 0, 0, 0], ["ADD2", 0, 0, 0, 0, 0, 0], ["ADD3", 0, 0, 0, 0, 0, 0]]}
            numRows={5}
            numCols={7}
          />
          <GenericTable columns={["REGISTER", "VALUE", "BUSY", "STATION"]}
            data={[["R0", 0, 0, 0], ["R1", 0, 0, 0], ["R2", 0, 0, 0], ["R3", 0, 0, 0], ["R4", 0, 0, 0], ["R5", 0, 0, 0], ["R6", 0, 0, 0], ["R7", 0, 0, 0]]}
            numRows={8}
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
export {textAreaRef};
