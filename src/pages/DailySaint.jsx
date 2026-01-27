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

            <section style={{ padding: '60px 0' }}>
                <div className="container">
                    {extraContent && (
                        <div className="dynamic-intro" style={{ marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px' }} dangerouslySetInnerHTML={{ __html: extraContent }} />
                    )}
                    {loading ? (
                        <div style={{ textAlign: 'center' }}>Carregando santo do dia...</div>
                    ) : saint ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
                            <img src={saint.imagem || "https://images.unsplash.com/photo-1544427928-c49cdfb8194d?q=80&w=800"} alt={saint.nome} style={{ borderRadius: '12px', boxShadow: 'var(--shadow)' }} />
                            <div>
                                <h2 style={{ color: 'var(--primary-green)' }}>{saint.nome}</h2>
                                <div dangerouslySetInnerHTML={{ __html: saint.texto }} style={{ margin: '20px 0', lineHeight: '1.6' }} />
                                {saint.oração && (
                                    <div style={{ background: 'var(--bg-gray)', padding: '20px', borderRadius: '8px' }}>
                                        <strong>Oração:</strong> {saint.oração}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center' }}>Não foi possível carregar as informações do santo. Tente mais tarde.</div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default DailySaint;
