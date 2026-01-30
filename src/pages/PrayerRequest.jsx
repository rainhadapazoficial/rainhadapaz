import { useState, useEffect } from 'react';
import { addPrayerRequest, getPageBySlug } from '../services/contentService';

const PrayerRequest = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', request: '' });
    const [extraContent, setExtraContent] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            const data = await getPageBySlug('pedidos');
            if (data) setExtraContent(data.content);
        };
        fetchContent();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addPrayerRequest({
                name: formData.name || 'Anônimo',
                request: formData.request
            });
            setSubmitted(true);
            setFormData({ name: '', request: '' });
        } catch {
            alert("Erro ao enviar pedido. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-content">
            <section className="page-header" style={{ background: 'var(--primary-green)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1>Pedido de Oração</h1>
                    <p>Deixe suas intenções. Rezaremos por você.</p>
                </div>
            </section>

            <section style={{ padding: '80px 0', background: 'linear-gradient(to bottom, #f9fbf9, #ffffff)' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    {extraContent && (
                        <div className="dynamic-intro" style={{ marginBottom: '50px', textAlign: 'center', fontSize: '1.2rem', color: '#666', fontStyle: 'italic' }} dangerouslySetInnerHTML={{ __html: extraContent }} />
                    )}

                    <div style={{
                        background: 'white',
                        padding: '60px',
                        borderRadius: '30px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                        border: '1px solid #f0f0f0'
                    }}>
                        {submitted ? (
                            <div style={{ textAlign: 'center', padding: '20px' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🙏</div>
                                <h2 style={{ color: 'var(--primary-green)', fontSize: '2rem', marginBottom: '15px' }}>Pedido de Oração Recebido</h2>
                                <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.6', marginBottom: '30px' }}>
                                    Sua intenção foi acolhida com amor. Ela será apresentada diante do altar em nossas próximas orações comunitárias. Que a paz de Cristo esteja com você.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    style={{
                                        padding: '15px 40px',
                                        background: 'var(--primary-green)',
                                        color: 'white',
                                        borderRadius: '35px',
                                        fontWeight: 'bold',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 5px 15px rgba(26,71,42,0.2)'
                                    }}
                                >
                                    Enviar outra intenção
                                </button>
                            </div>
                        ) : (
                            <>
                                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                                    <h2 style={{ color: 'var(--primary-green)', fontSize: '2rem' }}>Apresente sua Intenção</h2>
                                    <p style={{ color: '#888', marginTop: '10px' }}>Escreva abaixo o que você deseja colocar em nossas orações.</p>
                                </div>

                                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '30px' }}>
                                    <div className="form-group-custom">
                                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '700', color: 'var(--primary-green)' }}>Seu Nome (ou Anônimo)</label>
                                        <input
                                            type="text"
                                            style={{
                                                width: '100%',
                                                padding: '15px',
                                                borderRadius: '12px',
                                                border: '2px solid #eee',
                                                fontSize: '1rem',
                                                transition: 'border-color 0.3s'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--primary-green)'}
                                            onBlur={(e) => e.target.style.borderColor = '#eee'}
                                            placeholder="Ex: Maria José ou Agradecimento"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group-custom">
                                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '700', color: 'var(--primary-green)' }}>Sua Oração / Intenção</label>
                                        <textarea
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '15px',
                                                borderRadius: '12px',
                                                border: '2px solid #eee',
                                                minHeight: '180px',
                                                fontSize: '1rem',
                                                lineHeight: '1.6',
                                                transition: 'border-color 0.3s'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--primary-green)'}
                                            onBlur={(e) => e.target.style.borderColor = '#eee'}
                                            placeholder="Pelo que você gostaria que rezássemos hoje?"
                                            value={formData.request}
                                            onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        style={{
                                            background: 'var(--accent-yellow)',
                                            color: 'var(--primary-green)',
                                            padding: '18px',
                                            borderRadius: '12px',
                                            fontWeight: '800',
                                            fontSize: '1.1rem',
                                            border: 'none',
                                            cursor: 'pointer',
                                            boxShadow: '0 8px 25px rgba(241,196,15,0.2)',
                                            transition: 'transform 0.2s',
                                            opacity: loading ? 0.7 : 1
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                    >
                                        {loading ? 'Entregando ao Altar...' : 'Entregar Intenção de Oração'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrayerRequest;
