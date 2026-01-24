const DailySaint = () => {
    return (
        <div className="page-content">
            <section className="page-header" style={{ background: 'var(--primary-green)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1>Santo do Dia</h1>
                    <p>Conheça a vida dos exemplos de santidade da nossa Igreja.</p>
                </div>
            </section>

            <section style={{ padding: '60px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
                        <img src="https://images.unsplash.com/photo-1544427928-c49cdfb8194d?q=80&w=800" alt="Santo do Dia" style={{ borderRadius: '12px', boxShadow: 'var(--shadow)' }} />
                        <div>
                            <h2 style={{ color: 'var(--primary-green)' }}>São Francisco de Assis</h2>
                            <p style={{ margin: '20px 0' }}>
                                O "Poverello de Assis" foi um exemplo de humildade e amor à criação.
                                Sua vida nos inspira a buscar a simplicidade e a fraternidade universal sob o olhar de Deus.
                            </p>
                            <div style={{ background: 'var(--bg-gray)', padding: '20px', borderRadius: '8px' }}>
                                <strong>Oração:</strong> "Senhor, fazei de mim um instrumento de vossa paz..."
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DailySaint;
