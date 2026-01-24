import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container footer-content">
                <div className="footer-info">
                    <div className="footer-logo">
                        <span className="logo-text">RAINHA DA <span className="highlight">PAZ</span></span>
                    </div>
                    <p>Grupo de Oração Rainha da Paz - Sinop/MT. Um lugar de encontro com o amor de Deus.</p>
                    <div className="social-icons">
                        <a href="#">FB</a>
                        <a href="#">IG</a>
                        <a href="#">YT</a>
                        <a href="#">WA</a>
                    </div>
                </div>

                <div className="footer-links">
                    <h4>Links Úteis</h4>
                    <ul>
                        <li><Link to="/sobre">Quem Somos</Link></li>
                        <li><Link to="/noticias">Notícias</Link></li>
                        <li><Link to="/eventos">Eventos</Link></li>
                        <li><Link to="/eventos">Pedidos de Oração</Link></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Contato</h4>
                    <p>📍 Sinop - MT</p>
                    <p>📞 (66) 9999-9999</p>
                    <p>✉️ contato@rainhadapazsinop.com.br</p>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; 2026 Rainha da Paz Sinop. Todos os direitos reservados. Inspirado na RCC Brasil.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
