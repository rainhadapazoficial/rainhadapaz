import React, { useState, useEffect } from 'react';
import { getPageBySlug } from '../services/contentService';

const About = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            const data = await getPageBySlug('sobre');
            if (data) setContent(data.content);
            setLoading(false);
        };
        fetchContent();
    }, []);

    return (
        <div className="page-content">
            <section className="page-header" style={{ background: 'var(--primary-green)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1>Sobre Nós</h1>
                    <p>Conheça a história e a missão do Grupo de Oração Rainha da Paz</p>
                </div>
            </section>

            <section className="about-details" style={{ padding: '60px 0' }}>
                <div className="container">
                    {loading ? (
                        <p>Carregando...</p>
                    ) : content ? (
                        <div className="dynamic-content" dangerouslySetInnerHTML={{ __html: content }} />
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
                            <div>
                                <h2 style={{ color: 'var(--primary-green)', marginBottom: '20px' }}>Nossa História</h2>
                                <p style={{ marginBottom: '15px' }}>
                                    O Grupo de Oração Rainha da Paz nasceu do desejo de propagar a espiritualidade da Renovação Carismática Católica (RCC) na cidade de Sinop.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    Através do batismo no Espírito Santo, buscamos viver um novo Pentecostes a cada dia, servindo à Igreja com alegria e devoção.
                                </p>
                                <h2 style={{ color: 'var(--primary-green)', marginBottom: '20px', marginTop: '30px' }}>Nossa Missão</h2>
                                <p>
                                    Evangelizar com renovado ardor missionário, a partir da experiência do Batismo no Espírito Santo, para que todos conheçam o Senhorio de Jesus Cristo.
                                </p>
                            </div>
                            <div>
                                <img src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200" alt="Sobre Nós" style={{ borderRadius: '12px', boxShadow: 'var(--shadow)' }} />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default About;
