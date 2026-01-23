import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-content">
                <div className="hero-text">
                    <h1>Rainha da Paz Sinop</h1>
                    <p>Experimente o Pentecostes Hoje! Junte-se a nós em oração e fraternidade.</p>
                    <div className="hero-btns">
                        <button className="btn-primary">Conheça o Grupo</button>
                        <button className="btn-secondary">Pedido de Oração</button>
                    </div>
                </div>
            </div>
            <div className="hero-overlay"></div>
        </section>
    );
};

export default Hero;
