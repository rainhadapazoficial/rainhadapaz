import React, { useState, useEffect } from 'react';
import { getPageBySlug } from '../services/contentService';

const DailySaint = () => {
    const [saint, setSaint] = useState(null);
    const [extraContent, setExtraContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [saintRes, pageData] = await Promise.all([
                    fetch('https://liturgiadiaria.herokuapp.com/santo'),
                    getPageBySlug('santo')
                ]);
                const data = await saintRes.json();
                setSaint(data);
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
                    <h1>Santo do Dia</h1>
                    <p>Conheça a vida dos exemplos de santidade da nossa Igreja.</p>
                </div>
            </section>

            <section style={{ padding: '80px 0', background: '#fff' }}>
                <div className="container">
                    {extraContent && (
                        <div className="dynamic-intro" style={{ marginBottom: '60px', maxWidth: '800px', margin: '0 auto 60px', textAlign: 'center', fontSize: '1.1rem', color: '#666' }} dangerouslySetInnerHTML={{ __html: extraContent }} />
                    )}

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '100px 0' }}>Carregando santo do dia...</div>
                    ) : saint ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(300px, 450px) 1fr',
                            gap: '60px',
                            alignItems: 'start'
                        }}>
                            <div style={{ position: 'sticky', top: '100px' }}>
                                <img
                                    src={saint.imagem || "https://images.unsplash.com/photo-1544427928-c49cdfb8194d?q=80&w=800"}
                                    alt={saint.nome}
                                    style={{
                                        width: '100%',
                                        borderRadius: '20px',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                        border: '8px solid white'
                                    }}
                                />
                                {saint.oração && (
                                    <div style={{
                                        marginTop: '40px',
                                        background: 'var(--accent-yellow)',
                                        padding: '40px',
                                        borderRadius: '20px',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: '-15px',
                                            left: '30px',
                                            background: 'var(--primary-green)',
                                            color: 'white',
                                            padding: '5px 20px',
                                            borderRadius: '20px',
                                            fontSize: '0.9rem',
                                            fontWeight: 'bold'
                                        }}>
                                            Oração
                                        </div>
                                        <p style={{
                                            fontStyle: 'italic',
                                            lineHeight: '1.7',
                                            color: 'var(--primary-green)',
                                            fontSize: '1.1rem'
                                        }}>{saint.oração}</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <span style={{ color: '#999', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Exemplo de Fé</span>
                                <h1 style={{ color: 'var(--primary-green)', fontSize: '3rem', margin: '10px 0 30px' }}>{saint.nome}</h1>

                                <div
                                    className="saint-biography"
                                    dangerouslySetInnerHTML={{ __html: saint.texto }}
                                    style={{
                                        fontSize: '1.15rem',
                                        lineHeight: '1.8',
                                        color: '#444',
                                        textAlign: 'justify'
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '50px' }}>Não foi possível carregar as informações do santo. Tente mais tarde.</div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default DailySaint;
