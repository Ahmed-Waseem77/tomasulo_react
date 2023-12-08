import React from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import CodeMirrorLib from 'codemirror';
import "codemirror/lib/codemirror.css";
import 'codemirror/theme/material.css';
import "codemirror/mode/javascript/javascript";

CodeMirrorLib.defineMode("riscv16", function() {
    return {
        token: function(stream) {
            if (stream.match(/r[0-7]/i)) {
                return "tag";
            }

            if (stream.match(/addi|nand|bne|add|ret|call|sub|div|load|store/i)) {
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
            editor.setSize(null, '20vh');
        }
    } 

    getEditorText = () => {
        if (!this.editorRef) {
            return "";
        }
        return this.editorRef.editor.getValue();
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
    };

}

export {Riscv16TextArea};


