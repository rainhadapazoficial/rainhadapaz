import React from 'react';
import './Contact.css'; // I'll create this to ensure good styling

const Contact = () => {
    return (
        <div className="page-content contact-page">
            <section className="page-header" style={{ background: 'var(--primary-green)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1>Contato</h1>
                    <p>Fale conosco e saiba como participar do nosso grupo</p>
                </div>
            </section>

            <section className="contact-details">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <h2 style={{ color: 'var(--primary-green)', marginBottom: '30px' }}>Informações de Contato</h2>

                            <div className="info-item">
                                <div className="info-icon">📍</div>
                                <div className="info-text">
                                    <h3>Endereço</h3>
                                    <p>Av. das Sibipirunas, 3092 - St. Comercial</p>
                                    <p>Centro, Sinop - MT, 78550-230</p>
                                    <p><strong>Matriz da paróquia Santo Antônio</strong></p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">📞</div>
                                <div className="info-text">
                                    <h3>WhatsApp</h3>
                                    <a href="https://wa.me/5566981365456" target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                                        (66) 98136-5456
                                    </a>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">⏰</div>
                                <div className="info-text">
                                    <h3>Horário dos Encontros</h3>
                                    <p>Quartas-feiras às 19:30</p>
                                </div>
                            </div>
                        </div>

                        <div className="contact-map">
                            <div style={{ width: '100%', height: '400px', backgroundColor: '#e5e5e5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ textAlign: 'center', padding: '20px' }}>
                                    <p style={{ fontWeight: 'bold' }}>Localização na Matriz Santo Antônio</p>
                                    <p>Sinop - MT</p>
                                    <a
                                        href="https://share.google/KFueT3gsrl3pvhJhu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ display: 'inline-block', marginTop: '15px', padding: '10px 20px', background: 'var(--primary-green)', color: 'white', borderRadius: '5px' }}
                                    >
                                        Ver no Google Maps
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
