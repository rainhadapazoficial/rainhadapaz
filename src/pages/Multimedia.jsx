const Multimedia = () => {
    const items = [
        "https://images.unsplash.com/photo-1544427928-c49cdfb8194d?q=80&w=800",
        "https://images.unsplash.com/photo-1519491050282-ce00c729c8bf?q=80&w=800",
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800",
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800",
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800",
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800",
    ];

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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        {items.map((src, i) => (
                            <div key={i} style={{ overflow: 'hidden', borderRadius: '12px' }}>
                                <img src={src} alt={`Galeria ${i}`} style={{ width: '100%', height: '250px', objectFit: 'cover', transition: '0.3s' }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Multimedia;
