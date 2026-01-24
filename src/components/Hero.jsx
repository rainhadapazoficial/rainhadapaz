import React, { useState, useEffect } from 'react';
import './Hero.css';
import { getConfig } from '../services/contentService';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [config, setConfig] = useState({});

    useEffect(() => {
        const fetchConfig = async () => {
            const data = await getConfig();
            setConfig(data);
        };
        fetchConfig();
    }, []);

    return (
        <section className="hero">
            <div className="container hero-content">
                <div className="hero-text">
                    <h1>{config.heroTitle || 'Rainha da Paz Sinop'}</h1>
                    <p>{config.heroSubtitle || 'Experimente o Pentecostes Hoje! Junte-se a nós em oração e fraternidade.'}</p>
                    <div className="hero-btns">
                        <Link to="/sobre" className="btn-primary">Conheça o Grupo</Link>
                        <Link to="/pedido-oracao" className="btn-secondary">Pedido de Oração</Link>
                    </div>
                </div>
            </div>
            <div className="hero-overlay"></div>
        </section>
    );
};

export default Hero;
