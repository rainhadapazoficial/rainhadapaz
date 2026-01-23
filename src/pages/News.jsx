import NewsGrid from '../components/NewsGrid'

const News = () => {
    return (
        <div className="page-content">
            <section className="page-header" style={{ background: 'var(--primary-green)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1>Notícias</h1>
                    <p>Fique por dentro de tudo o que acontece na RCC Sinop e no Grupo Rainha da Paz</p>
                </div>
            </section>

            <NewsGrid />

            <section style={{ padding: '40px 0', textAlign: 'center' }}>
                <div className="container">
                    <button style={{ padding: '10px 30px', border: '2px solid var(--primary-green)', borderRadius: '25px', color: 'var(--primary-green)', fontWeight: 'bold' }}>
                        Carregar mais notícias
                    </button>
                </div>
            </section>
        </div>
    );
};

export default News;
