import React from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import CodeMirrorLib from 'codemirror';
import "codemirror/lib/codemirror.css";
import 'codemirror/theme/material.css';
import "codemirror/mode/javascript/javascript";

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

class Riscv16TextArea extends React.Component {
    componentDidMount() {
        const editor = this.editorRef.editor;
        if (editor) {
            editor.setSize(null, '100%');
        }
    }

    render() {
        return (
            <CodeMirror  id="riscv16-cm"
                ref={ref => this.editorRef = ref}
                options={{
                    lineNumbers: true,
                    mode: "riscv16",
                    theme: "material",
                    viewportMargin: Infinity
                }} 
            />  
        );
    }
}

export {Riscv16TextArea};


