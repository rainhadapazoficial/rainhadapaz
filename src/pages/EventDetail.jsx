import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { updateSEO } from '../services/seoService';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (data) {
                    setEvent(data);
                    updateSEO({
                        title: data.seo_title || data.name,
                        description: data.seo_description || data.info.replace(/<[^>]*>/g, '').substring(0, 160),
                        ogImage: data.og_image || data.image
                    });
                } else {
                    navigate('/eventos');
                }
            } catch (error) {
                console.error("Error loading event:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id, navigate]);

    if (loading) return <div className="container" style={{ padding: '60px', textAlign: 'center' }}>Carregando detalhes do evento...</div>;
    if (!event) return null;

    return (
        <div className="page-content">
            <section className="page-header" style={{ background: 'var(--accent-yellow)', color: 'var(--primary-green)', padding: '60px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1>{event.name}</h1>
                    <div style={{ marginTop: '15px', fontWeight: '600' }}>
                        <span>📅 {event.date}</span>
                        <span style={{ margin: '0 15px' }}>|</span>
                        <span>📍 {event.location}</span>
                    </div>
                </div>
            </section>

            <article style={{ padding: '60px 0' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ marginBottom: '40px' }}>
                        {event.image && (
                            <img
                                src={event.image}
                                alt={event.name}
                                style={{ width: '100%', borderRadius: '15px', boxShadow: 'var(--shadow)', maxHeight: '500px', objectFit: 'cover' }}
                            />
                        )}
                    </div>

                    <div
                        className="rich-content"
                        style={{
                            lineHeight: '1.8',
                            fontSize: '1.1rem',
                            color: '#333',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word'
                        }}
                        dangerouslySetInnerHTML={{ __html: event.info }}
                    />

                    <div style={{ marginTop: '50px', display: 'flex', gap: '20px', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '30px' }}>
                        <button
                            onClick={() => navigate('/eventos')}
                            style={{
                                background: 'none',
                                border: '2px solid var(--primary-green)',
                                color: 'var(--primary-green)',
                                padding: '12px 30px',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            ← Voltar para Eventos
                        </button>

                        <button
                            style={{
                                background: 'var(--primary-green)',
                                border: 'none',
                                color: 'white',
                                padding: '12px 40px',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(26,71,42,0.2)'
                            }}
                        >
                            Fazer Inscrição
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default EventDetail;
