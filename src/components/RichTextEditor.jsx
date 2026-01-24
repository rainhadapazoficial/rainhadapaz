import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './RichTextEditor.css';

const RichTextEditor = ({ value, onChange, height = 400, label }) => {
    return (
        <div className="custom-editor-container">
            {label && <label className="editor-label">{label}</label>}
            <div className="editor-wrapper">
                <Editor
                    init={{
                        height: height,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | image link | help',
                        content_style: `
                            body { 
                                font-family: 'Inter', sans-serif; 
                                font-size: 16px; 
                                color: #333; 
                                line-height: 1.6;
                                padding: 20px;
                            }
                        `,
                        language: 'pt_BR',
                        skin: 'oxide',
                        content_css: 'default',
                        branding: false,
                        promotion: false,
                        placeholder: 'Comece a escrever aqui...'
                    }}
                    value={value}
                    onEditorChange={(content) => onChange(content)}
                />
            </div>
            <div className="editor-footer">
                <span>Editor Oficial - Grupo de Oração Rainha da Paz</span>
            </div>
        </div>
    );
};

export default RichTextEditor;
