import logo from './logo.svg'; 
import './App.css'; 
import { UnControlled as CodeMirror } from "react-codemirror2";
import CodeMirrorLib from 'codemirror';
import "codemirror/lib/codemirror.css";
import 'codemirror/theme/material.css';
import "codemirror/mode/javascript/javascript";

//custom syntax highlighting for the supported instructions 
//maybe we need to define it in a separate file and avoid bloat here, maybe not
//need opinion on this
CodeMirrorLib.defineMode("riscv16", function() {
  return {
    token: function(stream) {
      if (stream.match(/R0|R1|R2|R3|R4|R5|R6|R7|r0|r1|r2|r3|r4|r5|r6|r7/)) {
        return "tag";
      }

      if (stream.match(/add|ADD|nand|NAND|bne|BNE|addi|ADDI|ret|RET|call|CALL|sub|SUB|div|DIV|load|LOAD|store|STORE/)) {
        return "keyword"; 
      }

      stream.next();
      return null;
    }
  };
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tomasulo riscv16</h1> 
        <h6>Supported Instructions: ADD, ADDI, NAND, SUB, DIV, BNE, CALL, STORE, LOAD, STORE
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
            <CodeMirror 
            options={{
              lineNumbers: true,
              mode: "riscv16",
              theme: "material",
            }}
            /> 
          </div>
        </div>
      </div>
  );
}

export default App;
