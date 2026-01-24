import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple mock authentication
        if (password === 'admin123') {
            setIsLoggedIn(true);
            setError('');
        } else {
            setError('Senha incorreta!');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-login-overlay">
                <div className="admin-login-card">
                    <img src="/logo-rainha.jpg" alt="Logo Rainha da Paz" className="login-logo" />
                    <h2>Acesso Restrito</h2>
                    <p>Entre com sua senha para gerenciar o portal</p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <span className="error-msg">{error}</span>}
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <img src="/logo-rainha.jpg" alt="Logo" className="sidebar-logo" />
                    <span>Painel Admin</span>
                </div>
                <nav className="sidebar-nav">
                    <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                        🏠 Dashboard
                    </button>
                    <button className={activeTab === 'news' ? 'active' : ''} onClick={() => setActiveTab('news')}>
                        📰 Notícias
                    </button>
                    <button className={activeTab === 'events' ? 'active' : ''} onClick={() => setActiveTab('events')}>
                        📅 Eventos
                    </button>
                    <button className={activeTab === 'site' ? 'active' : ''} onClick={() => setActiveTab('site')}>
                        ⚙️ Configurações
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={() => setIsLoggedIn(false)}>Sair</button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <h1>{activeTab === 'dashboard' ? 'Visão Geral' :
                        activeTab === 'news' ? 'Gerenciar Notícias' :
                            activeTab === 'events' ? 'Gerenciar Eventos' : 'Configurações do Site'}</h1>
                </header>

                <div className="admin-content">
                    {activeTab === 'dashboard' && (
                        <div className="dashboard-stats">
                            <div className="stat-card">
                                <h3>Notícias</h3>
                                <p className="stat-number">12</p>
                            </div>
                            <div className="stat-card">
                                <h3>Próximos Eventos</h3>
                                <p className="stat-number">3</p>
                            </div>
                            <div className="stat-card">
                                <h3>Pedidos de Oração</h3>
                                <p className="stat-number">45</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'news' && (
                        <div className="admin-section">
                            <div className="section-actions">
                                <button className="btn-primary">+ Nova Notícia</button>
                            </div>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Data</th>
                                        <th>Categoria</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Seminário de Vida no Espírito Santo</td>
                                        <td>24/01/2026</td>
                                        <td>Formação</td>
                                        <td>
                                            <button className="btn-edit">Editar</button>
                                            <button className="btn-delete">Excluir</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'site' && (
                        <div className="admin-section">
                            <form className="admin-form">
                                <div className="form-group">
                                    <label>Título do Site</label>
                                    <input type="text" defaultValue="Grupo de Oração Rainha da Paz" />
                                </div>
                                <div className="form-group">
                                    <label>Frase de Destaque (Home)</label>
                                    <textarea defaultValue="Um lugar de encontro com o amor de Deus e a efusão do Espírito Santo."></textarea>
                                </div>
                                <div className="form-group">
                                    <label>WhatsApp de Contato</label>
                                    <input type="text" defaultValue="(66) 98136-5456" />
                                </div>
                                <button type="submit" className="btn-primary" onClick={(e) => { e.preventDefault(); alert('Configurações salvas (Mock)') }}>Salvar Alterações</button>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Admin;
