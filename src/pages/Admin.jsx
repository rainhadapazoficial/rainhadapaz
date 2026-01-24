import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './Admin.css';
import { getConfig, saveConfig, getNews, addNewsItem, updateNewsItem, deleteNewsItem } from '../services/contentService';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(true);

    // Content State
    const [config, setConfig] = useState({});
    const [news, setNews] = useState([]);

    // Form States
    const [editingNews, setEditingNews] = useState(null);
    const [newsForm, setNewsForm] = useState({ title: '', category: '', date: '', image: '', description: '' });

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        setLoading(true);
        try {
            const [fetchedConfig, fetchedNews] = await Promise.all([
                getConfig(),
                getNews()
            ]);
            setConfig(fetchedConfig);
            setNews(fetchedNews);
        } catch (error) {
            console.error("Failed to load content:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsLoggedIn(true);
            setLoginError('');
        } else {
            setLoginError('Senha incorreta!');
        }
    };

    const handleSaveConfig = async (e) => {
        e.preventDefault();
        setLoading(true);
        await saveConfig(config);
        setLoading(false);
        alert('Configurações salvas no Firebase!');
    };

    const handleNewsSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingNews) {
                await updateNewsItem(editingNews.id, newsForm);
            } else {
                await addNewsItem(newsForm);
            }
            await loadContent(); // Refresh list
            setEditingNews(null);
            setNewsForm({ title: '', category: '', date: '', image: '', description: '' });
            setActiveTab('news');
        } catch (error) {
            alert("Erro ao salvar notícia: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditNews = (item) => {
        setEditingNews(item);
        setNewsForm({ ...item });
        setActiveTab('news-form');
    };

    const handleDeleteNews = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta notícia no Firebase?')) {
            setLoading(true);
            await deleteNewsItem(id);
            await loadContent();
            setLoading(false);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-login-overlay">
                <div className="admin-login-card">
                    <img src="/logo-rainha.jpg" alt="Logo Rainha da Paz" className="login-logo" />
                    <h2>Acesso Restrito</h2>
                    <p>Entre com sua senha (admin123)</p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {loginError && <span className="error-msg">{loginError}</span>}
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
                {loading && <div className="loading-indicator">Sincronizando...</div>}
                <nav className="sidebar-nav">
                    <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                        🏠 Dashboard
                    </button>
                    <button className={activeTab.startsWith('news') ? 'active' : ''} onClick={() => setActiveTab('news')}>
                        📰 Notícias
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
                    <h1>
                        {activeTab === 'dashboard' && 'Visão Geral'}
                        {activeTab === 'news' && 'Gerenciar Notícias'}
                        {activeTab === 'news-form' && (editingNews ? 'Editar Notícia' : 'Nova Notícia')}
                        {activeTab === 'site' && 'Configurações do Site'}
                    </h1>
                </header>

                <div className="admin-content">
                    {activeTab === 'dashboard' && (
                        <div className="dashboard-stats">
                            <div className="stat-card">
                                <h3>Notícias Ativas</h3>
                                <p className="stat-number">{news.length}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Status do Banco</h3>
                                <p style={{ marginTop: '10px', color: 'green', fontWeight: 'bold' }}>Conectado ao Firebase</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'news' && (
                        <div className="admin-section">
                            <div className="section-actions">
                                <button className="btn-primary" onClick={() => {
                                    setEditingNews(null);
                                    setNewsForm({ title: '', category: '', date: '', image: '', description: '' });
                                    setActiveTab('news-form');
                                }}>+ Nova Notícia</button>
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
                                    {news.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.title}</td>
                                            <td>{item.date}</td>
                                            <td>{item.category}</td>
                                            <td>
                                                <button className="btn-edit" onClick={() => handleEditNews(item)}>Editar</button>
                                                <button className="btn-delete" onClick={() => handleDeleteNews(item.id)}>Excluir</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'news-form' && (
                        <div className="admin-section">
                            <form className="admin-form" onSubmit={handleNewsSubmit}>
                                <div className="form-group">
                                    <label>Título</label>
                                    <input
                                        type="text"
                                        required
                                        value={newsForm.title}
                                        onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Categoria</label>
                                    <input
                                        type="text"
                                        required
                                        value={newsForm.category}
                                        onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Data</label>
                                    <input
                                        type="date"
                                        required
                                        value={newsForm.date}
                                        onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>URL da Imagem</label>
                                    <input
                                        type="text"
                                        value={newsForm.image}
                                        onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Descrição</label>
                                    <Editor
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo | blocks | ' +
                                                'bold italic forecolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                            content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px }',
                                            language: 'pt_BR'
                                        }}
                                        value={newsForm.description}
                                        onEditorChange={(content) => setNewsForm({ ...newsForm, description: content })}
                                    />
                                </div>
                                <div className="btn-group-row">
                                    <button type="submit" className="btn-primary" disabled={loading}>
                                        {loading ? 'Salvando...' : (editingNews ? 'Atualizar' : 'Publicar')}
                                    </button>
                                    <button type="button" className="btn-secondary" onClick={() => setActiveTab('news')}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'site' && (
                        <div className="admin-section">
                            <form className="admin-form" onSubmit={handleSaveConfig}>
                                <div className="form-group">
                                    <label>Título do Site</label>
                                    <input
                                        type="text"
                                        value={config.siteTitle}
                                        onChange={(e) => setConfig({ ...config, siteTitle: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Título do Hero (Home)</label>
                                    <input
                                        type="text"
                                        value={config.heroTitle}
                                        onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Subtítulo do Hero</label>
                                    <textarea
                                        value={config.heroSubtitle}
                                        onChange={(e) => setConfig({ ...config, heroSubtitle: e.target.value })}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label>WhatsApp</label>
                                    <input
                                        type="text"
                                        value={config.contactPhone}
                                        onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="btn-primary" disabled={loading}>
                                    {loading ? 'Salvando...' : 'Salvar no Firebase'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Admin;
