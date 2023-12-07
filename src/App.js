import logo from './logo.svg'; 
import './App.css'; 
import {Riscv16TextArea} from './react_components/riscv16TextArea.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tomasulo riscv16</h1> 
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
            <Riscv16TextArea />
          </div>
        </div>
      </div>
  );
}

export default App;
