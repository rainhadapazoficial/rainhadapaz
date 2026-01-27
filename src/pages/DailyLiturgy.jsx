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

            <section style={{ padding: '60px 0' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    {extraContent && (
                        <div className="dynamic-intro" style={{ marginBottom: '40px' }} dangerouslySetInnerHTML={{ __html: extraContent }} />
                    )}
                    {loading ? (
                        <div style={{ textAlign: 'center' }}>Carregando liturgia...</div>
                    ) : liturgy ? (
                        <div style={{ background: 'var(--bg-gray)', padding: '40px', borderRadius: '12px' }}>
                            <h2 style={{ color: 'var(--primary-green)', marginBottom: '10px' }}>{liturgy.primeiraLeitura.referencia}</h2>
                            <h3 style={{ marginBottom: '20px', color: '#666' }}>{liturgy.primeiraLeitura.titulo}</h3>

                            <div dangerouslySetInnerHTML={{ __html: liturgy.primeiraLeitura.texto }} style={{ marginBottom: '30px', lineHeight: '1.6' }} />

                            <div style={{ padding: '20px', borderLeft: '4px solid var(--accent-yellow)', background: 'white' }}>
                                <strong>Salmo:</strong> {liturgy.salmo.referencia}
                                <p style={{ marginTop: '10px' }}>{liturgy.salmo.refrão}</p>
                            </div>

                            <div style={{ marginTop: '40px', fontSize: '0.9rem', opacity: 0.7 }}>
                                Fonte: Liturgia Diária (CNBB)
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center' }}>Não foi possível carregar a liturgia. Tente mais tarde.</div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default DailyLiturgy;
