import React, { useState, useEffect } from 'react';
import './NewsGrid.css';
import { getContent } from '../services/contentService';

const NewsGrid = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const { news } = getContent();
        setNews(news);
    }, []);

    // Format date for display
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <section className="news-section">
            <div className="container">
                <div className="section-header">
                    <h2>Notícias em Destaque</h2>
                    <a href="#" className="view-all">Ver todas</a>
                </div>

                <div className="news-grid">
                    {news.map(item => (
                        <div key={item.id} className="news-card">
                            <div className="card-image">
                                <img src={item.image || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800'} alt={item.title} />
                                <span className="category">{item.category}</span>
                            </div>
                            <div className="card-body">
                                <span className="date">{formatDate(item.date)}</span>
                                <h3>{item.title}</h3>
                                <p className="description-preview">
                                    {item.description ? item.description.substring(0, 100) + '...' : ''}
                                </p>
                                <a href="#" className="read-more">Leia mais</a>
                            </div>
                        </div>
                    ))}
                    {news.length === 0 && <p>Nenhuma notícia encontrada.</p>}
                </div>
            </div>
        </section>
    );
};

export default NewsGrid;
