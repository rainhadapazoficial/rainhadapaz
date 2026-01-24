const Events = () => {
    const eventsList = [
        { title: "Seminário de Vida no Espírito", date: "Sáb, 24 Jan - 14:00", place: "Salão Paroquial" },
        { title: "Noite de Louvor Especial", date: "Seg, 26 Jan - 19:30", place: "Igreja Matriz" },
        { title: "Encontro de Jovens", date: "Dom, 01 Fev - 08:00", place: "Sede RCC Sinop" },
    ];

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
                    <div style={{ display: 'grid', gap: '20px' }}>
                        {eventsList.map((env, i) => (
                            <div key={i} style={{ display: 'flex', background: 'var(--bg-gray)', padding: '20px', borderRadius: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ color: 'var(--primary-green)' }}>{env.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>📅 {env.date} | 📍 {env.place}</p>
                                </div>
                                <button style={{ background: 'var(--accent-yellow)', padding: '10px 25px', borderRadius: '25px', fontWeight: '800' }}>
                                    Inscrição
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Events;
