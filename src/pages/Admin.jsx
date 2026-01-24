import React, { useState, useEffect } from 'react';
import './Admin.css';
import RichTextEditor from '../components/RichTextEditor';
import { getConfig, saveConfig, getNews, addNewsItem, updateNewsItem, deleteNewsItem, getEvents, addEvent, updateEvent, deleteEvent } from '../services/contentService';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(true);

    const [config, setConfig] = useState({});
    const [news, setNews] = useState([]);
    const [events, setEvents] = useState([]);

    // Form States
    const [editingNews, setEditingNews] = useState(null);
    const [newsForm, setNewsForm] = useState({ title: '', category: '', date: '', image: '', description: '' });

    const [editingEvent, setEditingEvent] = useState(null);
    const [eventForm, setEventForm] = useState({ name: '', date: '', location: '', info: '', image: '' });

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        setLoading(true);
        try {
            const [fetchedConfig, fetchedNews, fetchedEvents] = await Promise.all([
                getConfig(),
                getNews(),
                getEvents()
            ]);
            setConfig(fetchedConfig);
            setNews(fetchedNews);
            setEvents(fetchedEvents);
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

    // Event Handlers
    const handleEventSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingEvent) {
                await updateEvent(editingEvent.id, eventForm);
            } else {
                await addEvent(eventForm);
            }
            await loadContent();
            setEditingEvent(null);
            setEventForm({ name: '', date: '', location: '', info: '', image: '' });
            setActiveTab('events');
        } catch (error) {
            alert("Erro ao salvar evento: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditEvent = (item) => {
        setEditingEvent(item);
        setEventForm({ ...item });
        setActiveTab('event-form');
    };

    const handleDeleteEvent = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este evento no Firebase?')) {
            setLoading(true);
            await deleteEvent(id);
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
                    <button className={activeTab.startsWith('event') ? 'active' : ''} onClick={() => setActiveTab('events')}>
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
                    <h1>
                        {activeTab === 'dashboard' && 'Visão Geral'}
                        {activeTab === 'news' && 'Gerenciar Notícias'}
                        {activeTab === 'news-form' && (editingNews ? 'Editar Notícia' : 'Nova Notícia')}
                        {activeTab === 'events' && 'Gerenciar Eventos'}
                        {activeTab === 'event-form' && (editingEvent ? 'Editar Evento' : 'Novo Evento')}
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
                                <h3>Eventos Ativos</h3>
                                <p className="stat-number">{events.length}</p>
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
                                <RichTextEditor
                                    label="Descrição da Notícia"
                                    value={newsForm.description}
                                    onChange={(content) => setNewsForm({ ...newsForm, description: content })}
                                />
                                <div className="btn-group-row">
                                    <button type="submit" className="btn-primary" disabled={loading}>
                                        {loading ? 'Salvando...' : (editingNews ? 'Atualizar' : 'Publicar')}
                                    </button>
                                    <button type="button" className="btn-secondary" onClick={() => setActiveTab('news')}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'events' && (
                        <div className="admin-section">
                            <div className="section-actions">
                                <button className="btn-primary" onClick={() => {
                                    setEditingEvent(null);
                                    setEventForm({ name: '', date: '', location: '', info: '', image: '' });
                                    setActiveTab('event-form');
                                }}>+ Novo Evento</button>
                            </div>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Data/Hora</th>
                                        <th>Local</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.date}</td>
                                            <td>{item.location}</td>
                                            <td>
                                                <button className="btn-edit" onClick={() => handleEditEvent(item)}>Editar</button>
                                                <button className="btn-delete" onClick={() => handleDeleteEvent(item.id)}>Excluir</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'event-form' && (
                        <div className="admin-section">
                            <form className="admin-form" onSubmit={handleEventSubmit}>
                                <div className="form-group">
                                    <label>Nome do Evento</label>
                                    <input
                                        type="text"
                                        required
                                        value={eventForm.name}
                                        onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Dia e Horário</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: 25/01 às 19:30"
                                        value={eventForm.date}
                                        onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Local</label>
                                    <input
                                        type="text"
                                        required
                                        value={eventForm.location}
                                        onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>URL da Imagem</label>
                                    <input
                                        type="text"
                                        value={eventForm.image}
                                        onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                                    />
                                </div>
                                <RichTextEditor
                                    label="Informações Adicionais"
                                    value={eventForm.info}
                                    onChange={(content) => setEventForm({ ...eventForm, info: content })}
                                />
                                <div className="btn-group-row">
                                    <button type="submit" className="btn-primary" disabled={loading}>
                                        {loading ? 'Salvando...' : (editingEvent ? 'Atualizar' : 'Publicar')}
                                    </button>
                                    <button type="button" className="btn-secondary" onClick={() => setActiveTab('events')}>Cancelar</button>
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
