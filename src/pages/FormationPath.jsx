import React, { useState, useEffect } from 'react';
import { getPageBySlug } from '../services/contentService';

const FormationPath = () => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            const data = await getPageBySlug('formacao');
            if (data) setPageData(data);
            setLoading(false);
        };
        fetchContent();
    }, []);

    const sections = [
        {
            id: 1,
            title: "1- QUERIGMA",
            subtitle: "O Primeiro Anúncio",
            icon: "🔥",
            color: "#e67e22",
            items: [
                "Seminário de Vida no Espírito Santo",
                "Experiência de Oração",
                "Introdução aos Dons"
            ]
        },
        {
            id: 2,
            title: "2- MÓDULO BÁSICO",
            subtitle: "Aprofundamento na Fé",
            icon: "📖",
            color: "#27ae60",
            items: [
                "Identidade",
                "Jesus Senhor e Mestre",
                "Vida no Espírito",
                "Doutrina da Igreja"
            ]
        },
        {
            id: 3,
            title: "3- FORMAÇÃO ESPECÍFICA",
            subtitle: "Chamado ao Serviço",
            icon: "🛠️",
            color: "#2980b9",
            items: [
                "Ministérios de Serviço",
                "Liderança Cristã",
                "Missão e Evangelização"
            ]
        }
    ];

    return (
        <div className="page-content">
            <section className="page-header" style={{ background: 'var(--primary-green)', color: 'white', padding: '80px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1>Caminho Formativo</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '700px', margin: '20px auto 0' }}>
                        Um processo completo de amadurecimento na fé, desde o primeiro encontro até o serviço ministerial.
                    </p>
                </div>
            </section>

            <section style={{ padding: '80px 0', background: '#f8fafc' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>

                    {/* Conteúdo Dinâmico do CMS */}
                    {pageData?.content && (
                        <div
                            className="rich-content"
                            style={{ marginBottom: '60px', textAlign: 'center', fontSize: '1.1rem', color: '#444' }}
                            dangerouslySetInnerHTML={{ __html: pageData.content }}
                        />
                    )}

                    {/* Trilha Visual */}
                    <div className="formation-timeline" style={{ position: 'relative', padding: '20px 0' }}>
                        {/* Linha Central */}
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            bottom: 0,
                            width: '4px',
                            background: '#e2e8f0',
                            transform: 'translateX(-50%)',
                            zIndex: 1
                        }}></div>

                        {sections.map((section, index) => (
                            <div key={section.id} style={{
                                display: 'flex',
                                justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                                marginBottom: '60px',
                                position: 'relative',
                                zIndex: 2
                            }}>
                                {/* Círculo Decorativo na Linha */}
                                <div style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '40px',
                                    width: '20px',
                                    height: '20px',
                                    background: section.color,
                                    borderRadius: '50%',
                                    transform: 'translateX(-50%)',
                                    border: '4px solid white',
                                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                                }}></div>

                                <div style={{
                                    width: '45%',
                                    background: 'white',
                                    padding: '40px',
                                    borderRadius: '24px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                    border: `1px solid ${section.color}20`,
                                    position: 'relative'
                                }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{section.icon}</div>
                                    <h2 style={{ color: section.color, fontSize: '1.5rem', marginBottom: '5px' }}>{section.title}</h2>
                                    <p style={{ fontWeight: '600', color: '#64748b', marginBottom: '20px' }}>{section.subtitle}</p>

                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {section.items.map((item, i) => (
                                            <li key={i} style={{
                                                padding: '10px 0',
                                                borderTop: '1px solid #f1f5f9',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                color: '#334155'
                                            }}>
                                                <span style={{ color: section.color }}>✓</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ padding: '60px 0', textAlign: 'center', background: 'white' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--primary-green)' }}>Deseja iniciar sua caminhada?</h2>
                    <p style={{ margin: '20px 0 30px', color: '#666' }}>Entre em contato conosco ou procure o coordenador do Grupo de Oração.</p>
                    <a href="/contato" className="btn-primary" style={{ display: 'inline-block', padding: '15px 40px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold' }}>
                        Falar com a Coordenação
                    </a>
                </div>
            </section>
        </div>
    );
};

export default FormationPath;
