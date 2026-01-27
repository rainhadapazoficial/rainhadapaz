import React, { useState, useEffect } from 'react';
import { getPageBySlug } from '../services/contentService';

const DailyLiturgy = () => {
    const [liturgy, setLiturgy] = useState(null);
    const [extraContent, setExtraContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [liturgyRes, pageData] = await Promise.all([
                    fetch('https://liturgiadiaria.herokuapp.com/'),
                    getPageBySlug('liturgia')
                ]);
                const data = await liturgyRes.json();
                setLiturgy(data);
                if (pageData) setExtraContent(pageData.content);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="page-content">
            <section className="page-header" style={{ background: 'var(--primary-green)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1>Liturgia do Dia</h1>
                    <p>Alimente sua alma com a Palavra de Deus todos os dias.</p>
                </div>
            </section>

            <section style={{ padding: '60px 0', background: '#fdfdfd' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    {extraContent && (
                        <div className="dynamic-intro" style={{ marginBottom: '50px', textAlign: 'center', fontSize: '1.2rem', color: '#555', fontStyle: 'italic' }} dangerouslySetInnerHTML={{ __html: extraContent }} />
                    )}

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '100px 0' }}>
                            <div className="loading-spinner"></div>
                            <p>Buscando a Palavra do Dia...</p>
                        </div>
                    ) : liturgy ? (
                        <div className="liturgy-container" style={{ display: 'grid', gap: '40px' }}>
                            {/* Card de Leitura */}
                            <div style={{
                                background: 'white',
                                padding: '50px',
                                borderRadius: '20px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                border: '1px solid #f0f0f0'
                            }}>
                                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                                    <span style={{
                                        background: 'var(--accent-yellow)',
                                        color: 'var(--primary-green)',
                                        padding: '5px 15px',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: '800',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}>
                                        Primeira Leitura
                                    </span>
                                    <h2 style={{ color: 'var(--primary-green)', marginTop: '15px' }}>{liturgy.primeiraLeitura.referencia}</h2>
                                    <h3 style={{ color: '#888', fontWeight: '500', fontSize: '1.2rem' }}>{liturgy.primeiraLeitura.titulo}</h3>
                                </div>

                                <div
                                    className="liturgy-text"
                                    dangerouslySetInnerHTML={{ __html: liturgy.primeiraLeitura.texto }}
                                    style={{
                                        fontSize: '1.2rem',
                                        lineHeight: '1.9',
                                        color: '#333',
                                        textAlign: 'justify',
                                        fontFamily: "'Georgia', serif"
                                    }}
                                />

                                <div style={{ marginTop: '30px', fontWeight: 'bold', color: 'var(--primary-green)' }}>
                                    — Palavra do Senhor.
                                    <br />
                                    <span style={{ fontWeight: 'normal', color: '#666' }}>— Graças a Deus.</span>
                                </div>
                            </div>

                            {/* Card de Salmo */}
                            <div style={{
                                background: 'var(--primary-green)',
                                color: 'white',
                                padding: '40px',
                                borderRadius: '20px',
                                boxShadow: '0 10px 30px rgba(26,71,42,0.1)'
                            }}>
                                <div style={{ marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.2)', pb: '15px' }}>
                                    <h3 style={{ fontSize: '1rem', opacity: 0.8, textTransform: 'uppercase' }}>Salmo Responsorial — {liturgy.salmo.referencia}</h3>
                                </div>
                                <p style={{ fontSize: '1.5rem', fontWeight: '700', lineHeight: '1.4', margin: '20px 0' }}>
                                    <span style={{ color: 'var(--accent-yellow)' }}>R.</span> {liturgy.salmo.refrão}
                                </p>
                            </div>

                            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', opacity: 0.6 }}>
                                Fonte: Liturgia Diária (CNBB) • {new Date().toLocaleDateString('pt-BR')}
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '60px', background: '#fff0f0', borderRadius: '12px', border: '1px solid #ffcccc', color: '#cc0000' }}>
                            Não foi possível carregar a liturgia. Tente novamente em alguns minutos.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default DailyLiturgy;
