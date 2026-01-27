import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './RichTextEditor.css';

const RichTextEditor = ({ value, onChange, label, height = 400 }) => {

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['blockquote', 'code-block'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'list', 'bullet',
        'align',
        'link', 'image', 'video',
        'blockquote', 'code-block'
    ];

    return (
        <div className="wordpress-style-editor">
            {label && <label className="editor-label">{label}</label>}
            <div className="quill-wrapper" style={{ minHeight: height }}>
                <ReactQuill
                    theme="snow"
                    value={value || ''}
                    onChange={onChange}
                    modules={modules}
                    formats={formats}
                    style={{ height: height - 42 }} // Ajuste para a toolbar
                />
            </div>
            <div className="editor-footer-hint">
                Painel Admin Estilo WordPress
            </div>
        </div>
    );
};

export default RichTextEditor;
