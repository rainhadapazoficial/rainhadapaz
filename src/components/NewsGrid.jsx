import './NewsGrid.css';

const NewsGrid = () => {
    const news = [
        {
            id: 1,
            title: "Seminário de Vida no Espírito Santo",
            date: "24 Jan, 2026",
            category: "Formação",
            image: "https://images.unsplash.com/photo-1519491050282-ce00c729c8bf?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Cerne Especial: Jovens em Missão",
            date: "25 Jan, 2026",
            category: "Eventos",
            image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Noite de Louvor: Rainha da Paz",
            date: "26 Jan, 2026",
            category: "Grupo de Oração",
            image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "Novo Livro: Escutando a voz de Deus",
            date: "27 Jan, 2026",
            category: "Editora",
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"
        }
    ];

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
                                <img src={item.image} alt={item.title} />
                                <span className="category">{item.category}</span>
                            </div>
                            <div className="card-body">
                                <span className="date">{item.date}</span>
                                <h3>{item.title}</h3>
                                <a href="#" className="read-more">Leia mais</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsGrid;
