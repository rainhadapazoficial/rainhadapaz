import React, { useRef, useEffect } from 'react';
import './RichTextEditor.css';

const RichTextEditor = ({ value, onChange, height = 300, label }) => {
    const editorRef = useRef(null);

    // Sync external value with editor content (initial load and updates)
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        handleInput();
        editorRef.current.focus();
    };

    return (
        <div className="custom-editor-container">
            {label && <label className="editor-label">{label}</label>}

            <div className="native-editor-wrapper">
                <div className="editor-toolbar">
                    <button type="button" title="Negrito" onClick={() => execCommand('bold')}><b>B</b></button>
                    <button type="button" title="Itálico" onClick={() => execCommand('italic')}><i>I</i></button>
                    <button type="button" title="Sublinhado" onClick={() => execCommand('underline')}><u>U</u></button>
                    <div className="toolbar-divider"></div>
                    <button type="button" title="Lista com Marcadores" onClick={() => execCommand('insertUnorderedList')}>• Lista</button>
                    <button type="button" title="Lista Numerada" onClick={() => execCommand('insertOrderedList')}>1. Lista</button>
                    <div className="toolbar-divider"></div>
                    <button type="button" title="Título" onClick={() => execCommand('formatBlock', 'h3')}>H3</button>
                    <button type="button" title="Texto Normal" onClick={() => execCommand('formatBlock', 'p')}>P</button>
                    <div className="toolbar-divider"></div>
                    <button type="button" title="Remover Formatação" onClick={() => execCommand('removeFormat')}>Tx</button>
                </div>

                <div
                    ref={editorRef}
                    className="editor-editable-area"
                    contentEditable={true}
                    onInput={handleInput}
                    style={{ minHeight: height }}
                    onBlur={handleInput}
                ></div>
            </div>

            <div className="editor-footer">
                <span>Editor Nativo Rainha da Paz (Sem TinyMCE)</span>
            </div>
        </div>
    );
};

export default RichTextEditor;
