import React, { useState, useEffect } from 'react';
import { getMultimedia, getPageBySlug } from '../services/contentService';

const Multimedia = () => {
    const [items, setItems] = useState([]);
    const [extraContent, setExtraContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mediaData, pageData] = await Promise.all([
                    getMultimedia(),
                    getPageBySlug('multimidia')
                ]);

                if (mediaData.length > 0) {
                    setItems(mediaData);
                } else {
                    setItems([
                        { url: "https://images.unsplash.com/photo-1544427928-c49cdfb8194d?q=80&w=800" },
                        { url: "https://images.unsplash.com/photo-1519491050282-ce00c729c8bf?q=80&w=800" },
                        { url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800" },
                        { url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800" }
                    ]);
                }

                if (pageData) setExtraContent(pageData.content);
            } catch (error) {
                console.error("Error fetching multimedia:", error);
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
                    <h1>Multimídia</h1>
                    <p>Galeria de fotos e vídeos dos nossos momentos de oração</p>
                </div>
            </section>

            <section style={{ padding: '60px 0' }}>
                <div className="container">
                    {extraContent && (
                        <div className="dynamic-intro" style={{ marginBottom: '40px' }} dangerouslySetInnerHTML={{ __html: extraContent }} />
                    )}

                    {loading ? (
                        <div style={{ textAlign: 'center' }}>Carregando galeria...</div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                            {items.map((item, i) => (
                                <div key={i} style={{ overflow: 'hidden', borderRadius: '12px' }}>
                                    <img src={item.url || item} alt={`Galeria ${i}`} style={{ width: '100%', height: '250px', objectFit: 'cover', transition: '0.3s' }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Multimedia;
