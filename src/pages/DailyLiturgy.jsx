const DailyLiturgy = () => {
    return (
        <div className="page-content">
            <section className="page-header" style={{ background: 'var(--primary-green)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1>Liturgia do Dia</h1>
                    <p>Alimente sua alma com a Palavra de Deus todos os dias.</p>
                </div>
            </section>

            <section style={{ padding: '60px 0' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ background: 'var(--bg-gray)', padding: '40px', borderRadius: '12px' }}>
                        <h2 style={{ color: 'var(--primary-green)', marginBottom: '10px' }}>Salmo 23 (22)</h2>
                        <h3 style={{ marginBottom: '20px', color: '#666' }}>O Senhor é o meu pastor, nada me faltará.</h3>

                        <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>"O Senhor é o meu pastor, não me faltará. Em verdes pastos me faz repousar..."</p>

                        <div style={{ padding: '20px', borderLeft: '4px solid var(--accent-yellow)', background: 'white' }}>
                            <strong>Reflexão:</strong> A confiança total no Senhor nos traz a paz necessária para enfrentar qualquer vale escuro.
                        </div>

                        <div style={{ marginTop: '40px', fontSize: '0.9rem', opacity: 0.7 }}>
                            Conteúdo integrado via RCC Brasil / CNBB.
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DailyLiturgy;
