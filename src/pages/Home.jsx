import Hero from '../components/Hero'
import NewsGrid from '../components/NewsGrid'

const Home = () => {
    return (
        <>
            <Hero />
            <NewsGrid />

            <section className="about-cta" style={{ background: 'var(--bg-gray)', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--primary-green)', marginBottom: '20px' }}>Participe do nosso Grupo de Oração</h2>
                    <p style={{ marginBottom: '30px', maxWidth: '800px', margin: '0 auto 30px' }}>
                        Toda semana nos reunimos para louvar, agradecer e ouvir a Palavra de Deus.
                        Venha fazer parte desta família e sentir a força do Espírito Santo em sua vida.
                    </p>
                    <button className="btn-primary" style={{ padding: '12px 40px', borderRadius: '30px', background: 'var(--primary-green)', color: 'white', fontWeight: 'bold' }}>
                        Ver Horários e Locais
                    </button>
                </div>
            </section>
        </>
    );
};

export default Home;
