import React, { useState, useEffect } from 'react';
import { getPageBySlug } from '../services/contentService';

const Donate = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            const data = await getPageBySlug('colabore');
            if (data) setContent(data.content);
            setLoading(false);
        };
        fetchContent();
    }, []);

    return (
        <div className="page-content">
            <section className="page-header" style={{ background: 'var(--accent-yellow)', color: 'var(--primary-green)', padding: '60px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1>Colabore conosco</h1>
                    <p>Sua doação ajuda a manter nossa missão de evangelização.</p>
                </div>
            </section>

            <section style={{ padding: '60px 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
                        {loading ? (
                            <p style={{ textAlign: 'center' }}>Carregando informações...</p>
                        ) : content ? (
                            <div className="dynamic-content" dangerouslySetInnerHTML={{ __html: content }} />
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <h2 style={{ color: 'var(--primary-green)', marginBottom: '30px' }}>Como ajudar?</h2>
                                <p style={{ marginBottom: '20px' }}>O Grupo de Oração Rainha da Paz é mantido por doações espontâneas de seus membros e amigos. Se você sente no coração o desejo de nos ajudar, pode fazer via PIX ou diretamente em nossos encontros.</p>

                                <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '15px', border: '1px solid #eee', display: 'inline-block', marginTop: '20px' }}>
                                    <h3 style={{ marginBottom: '10px' }}>Chave PIX (E-mail)</h3>
                                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-green)' }}>contato@rccsinop.com.br</p>
                                    <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#888' }}>Mitra Diocesana de Sinop - Grupo Rainha da Paz</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Donate;
