import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewsItemById } from '../services/contentService';

const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const data = await getNewsItemById(id);
                if (data) {
                    setItem(data);
                } else {
                    navigate('/noticias');
                }
            } catch (error) {
                console.error("Error loading news:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id, navigate]);

    if (loading) return <div className="container" style={{ padding: '60px', textAlign: 'center' }}>Carregando notícia...</div>;
    if (!item) return null;

    return (
        <div className="page-content">
            <section className="page-header" style={{ background: 'var(--primary-green)', color: 'white', padding: '40px 0', textAlign: 'center' }}>
                <div className="container">
                    <span style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', opacity: 0.8 }}>{item.category}</span>
                    <h1 style={{ marginTop: '10px' }}>{item.title}</h1>
                </div>
            </section>

            <article style={{ padding: '60px 0' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <img
                            src={item.image || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200'}
                            alt={item.title}
                            style={{ width: '100%', borderRadius: '15px', boxShadow: 'var(--shadow)' }}
                        />
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '0.9rem' }}>
                            <span>Publicado em: {new Date(item.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                    </div>

                    <div
                        className="news-full-content"
                        style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                    />

                    <div style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '30px' }}>
                        <button
                            onClick={() => navigate('/noticias')}
                            style={{
                                background: 'none',
                                border: '2px solid var(--primary-green)',
                                color: 'var(--primary-green)',
                                padding: '10px 30px',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            ← Voltar para Notícias
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default NewsDetail;
