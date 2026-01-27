import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../services/contentService';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const data = await getEvents();
            setEvents(data);
            setLoading(false);
        };
        fetchEvents();
    }, []);

    if (loading) return <div className="container" style={{ padding: '60px', textAlign: 'center' }}>Carregando eventos...</div>;

    return (
        <div className="page-content">
            <section className="page-header" style={{ background: 'var(--primary-green)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1>Eventos</h1>
                    <p>Confira nossa agenda e participe dos nossos encontros</p>
                </div>
            </section>

            <section style={{ padding: '60px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gap: '40px' }}>
                        {events.map((env) => (
                            <div
                                key={env.id}
                                onClick={() => navigate(`/evento/${env.id}`)}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: env.image ? '300px 1fr' : '1fr',
                                    gap: '30px',
                                    background: 'white',
                                    padding: '30px',
                                    borderRadius: '15px',
                                    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                                    alignItems: 'start',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                {env.image && (
                                    <div style={{ width: '100%', height: '200px', borderRadius: '10px', overflow: 'hidden' }}>
                                        <img src={env.image} alt={env.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                )}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <h2 style={{ color: 'var(--primary-green)', marginBottom: '10px' }}>{env.name}</h2>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: '500' }}>
                                                📅 {env.date} | 📍 {env.location}
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); navigate(`/evento/${env.id}`); }}
                                                style={{
                                                    background: 'var(--primary-green)',
                                                    color: 'white',
                                                    padding: '10px 25px',
                                                    borderRadius: '30px',
                                                    fontWeight: '600',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}>
                                                Ver Detalhes
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className="event-info-preview"
                                        style={{
                                            fontSize: '1rem',
                                            color: '#555',
                                            lineHeight: '1.6',
                                            display: '-webkit-box',
                                            WebkitLineClamp: '3',
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}
                                        dangerouslySetInnerHTML={{ __html: env.info }}
                                    />
                                </div>
                            </div>
                        ))}
                        {events.length === 0 && <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>Nenhum evento programado no momento.</p>}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Events;
