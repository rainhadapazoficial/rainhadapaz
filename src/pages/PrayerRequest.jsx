import { useState } from 'react';

const PrayerRequest = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="page-content">
            <section className="page-header" style={{ background: 'var(--primary-green)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1>Pedido de Oração</h1>
                    <p>Deixe suas intenções. Rezaremos por você.</p>
                </div>
            </section>

            <section style={{ padding: '60px 0' }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '40px', background: 'var(--bg-gray)', borderRadius: '12px' }}>
                            <h2 style={{ color: 'var(--primary-green)' }}>Pedido Enviado!</h2>
                            <p>Sua intenção foi recebida e será colocada no altar durante nosso próximo encontro.</p>
                            <button
                                onClick={() => setSubmitted(false)}
                                style={{ marginTop: '20px', padding: '10px 25px', background: 'var(--primary-green)', color: 'white', borderRadius: '25px', fontWeight: 'bold' }}
                            >
                                Enviar outro pedido
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Seu Nome</label>
                                <input type="text" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} placeholder="Opcional" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Sua Intenção</label>
                                <textarea required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '150px' }} placeholder="Escreva aqui seu pedido de oração..."></textarea>
                            </div>
                            <button type="submit" style={{ background: 'var(--accent-yellow)', padding: '15px', borderRadius: '8px', fontWeight: '800', fontSize: '1rem' }}>
                                Enviar Pedido
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
};

export default PrayerRequest;
