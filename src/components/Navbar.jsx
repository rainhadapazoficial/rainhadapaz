import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar-container">
            <div className="top-bar">
                <div className="container top-bar-content">
                    <div className="top-links">
                        <Link to="/pedido-oracao">Pedido de Oração</Link>
                        <Link to="/liturgia">Liturgia do Dia</Link>
                        <Link to="/santo-dia">Santo do Dia</Link>
                    </div>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook">FB</a>
                        <a href="#" aria-label="Instagram">IG</a>
                        <a href="#" aria-label="YouTube">YT</a>
                    </div>
                </div>
            </div>

            <div className="main-nav">
                <div className="container main-nav-content">
                    <div className="logo">
                        <Link to="/" className="logo-text">RAINHA DA <span className="highlight">PAZ</span></Link>
                    </div>

                    <ul className="nav-menu">
                        <li><NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Início</NavLink></li>
                        <li><NavLink to="/sobre" className={({ isActive }) => isActive ? "active" : ""}>Sobre Nós</NavLink></li>
                        <li><NavLink to="/noticias" className={({ isActive }) => isActive ? "active" : ""}>Notícias</NavLink></li>
                        <li><NavLink to="/eventos" className={({ isActive }) => isActive ? "active" : ""}>Eventos</NavLink></li>
                        <li><NavLink to="/multimidia" className={({ isActive }) => isActive ? "active" : ""}>Multimídia</NavLink></li>
                        <li><NavLink to="/contato" className={({ isActive }) => isActive ? "active" : ""}>Contato</NavLink></li>
                        <li><a href="#" className="btn-donate">Colabore</a></li>
                    </ul>

                    <div className="mobile-menu-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
