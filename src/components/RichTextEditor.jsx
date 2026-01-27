import React, { useRef, useEffect } from 'react';
import './RichTextEditor.css';

const RichTextEditor = ({ value, onChange, height = 400, label }) => {
    const editorRef = useRef(null);

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

    const execCommand = (command, val = null) => {
        if (command === 'createLink' || command === 'insertImage') {
            const promptVal = prompt(command === 'createLink' ? 'Digite a URL:' : 'Cole a URL da Imagem:');
            if (promptVal) {
                document.execCommand(command, false, promptVal);
            }
        } else {
            document.execCommand(command, false, val);
        }
        handleInput();
        editorRef.current.focus();
    };

    return (
        <div className="custom-editor-container advanced-editor">
            {label && <label className="editor-label">{label}</label>}

            <div className="native-editor-wrapper">
                <div className="editor-toolbar">
                    <div className="toolbar-group">
                        <button type="button" title="Negrito" onClick={() => execCommand('bold')}><b>B</b></button>
                        <button type="button" title="Itálico" onClick={() => execCommand('italic')}><i>I</i></button>
                        <button type="button" title="Sublinhado" onClick={() => execCommand('underline')}><u>U</u></button>
                    </div>

                    <div className="toolbar-divider"></div>

                    <div className="toolbar-group">
                        <button type="button" title="Alinhar Esquerda" onClick={() => execCommand('justifyLeft')}>⬅</button>
                        <button type="button" title="Alinhar Centro" onClick={() => execCommand('justifyCenter')}>↕</button>
                        <button type="button" title="Alinhar Direita" onClick={() => execCommand('justifyRight')}>➡</button>
                    </div>

                    <div className="toolbar-divider"></div>

                    <div className="toolbar-group">
                        <button type="button" title="Link" onClick={() => execCommand('createLink')}>🔗</button>
                        <button type="button" title="Imagem" onClick={() => execCommand('insertImage')}>🖼️</button>
                        <input
                            type="color"
                            title="Cor do Texto"
                            onChange={(e) => execCommand('foreColor', e.target.value)}
                            className="color-picker-tool"
                        />
                    </div>

                    <div className="toolbar-divider"></div>

                    <div className="toolbar-group">
                        <button type="button" title="Título" onClick={() => execCommand('formatBlock', 'h2')}>H2</button>
                        <button type="button" title="Subtítulo" onClick={() => execCommand('formatBlock', 'h3')}>H3</button>
                        <button type="button" title="Lista" onClick={() => execCommand('insertUnorderedList')}>•</button>
                    </div>

                    <div className="toolbar-divider"></div>

                    <button type="button" title="Limpar" onClick={() => execCommand('removeFormat')}>Tx</button>
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
                <span>Modo de Edição Avançado (Antigravity CMS)</span>
            </div>
        </div>
    );
};

export default RichTextEditor;
