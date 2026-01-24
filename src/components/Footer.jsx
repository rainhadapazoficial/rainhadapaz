import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container footer-content">
                <div className="footer-info">
                    <div className="footer-logo">
                        <img src="/logo-rainha.jpg" alt="Logo Rainha da Paz" className="footer-logo-img" />
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
                    <p>📍 Av. das Sibipirunas, 3092 - Centro</p>
                    <p>📞 (66) 98136-5456</p>
                    <p>✉️ rainhadapazsinop@rccdesinop.com.br</p>
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
