import React, { useState, useEffect } from 'react';
import './Admin.css';
import RichTextEditor from '../components/RichTextEditor';
import { supabase } from '../supabase';
import {
    getConfig, saveConfig, getNews, addNewsItem, updateNewsItem, deleteNewsItem,
    getEvents, addEvent, updateEvent, deleteEvent,
    getPrayerRequests, deletePrayerRequest,
    getMultimedia, addMultimediaItem, deleteMultimediaItem,
    getPages, savePage
} from '../services/contentService';

const Admin = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(true);

    const [config, setConfig] = useState({});
    const [news, setNews] = useState([]);
    const [events, setEvents] = useState([]);
    const [prayers, setPrayers] = useState([]);
    const [multimedia, setMultimedia] = useState([]);
    const [pages, setPages] = useState([]);

    // Form States
    const [editingNews, setEditingNews] = useState(null);
    const [newsForm, setNewsForm] = useState({ title: '', category: '', date: '', image: '', description: '' });

    const [editingEvent, setEditingEvent] = useState(null);
    const [eventForm, setEventForm] = useState({ name: '', date: '', location: '', info: '', image: '' });

    const [multimediaForm, setMultimediaForm] = useState({ url: '', category: '' });

    const [editingPage, setEditingPage] = useState(null);
    const [pageForm, setPageForm] = useState({ slug: '', content: '' });

    useEffect(() => {
        // Check current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) loadContent();
            else setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) loadContent();
        });

        return () => subscription.unsubscribe();
    }, []);

    const loadContent = async () => {
        setLoading(true);
        try {
            const [fetchedConfig, fetchedNews, fetchedEvents, fetchedPrayers, fetchedMultimedia, fetchedPages] = await Promise.all([
                getConfig(),
                getNews(),
                getEvents(),
                getPrayerRequests(),
                getMultimedia(),
                getPages()
            ]);
            setConfig(fetchedConfig);
            setNews(fetchedNews);
            setEvents(fetchedEvents);
            setPrayers(fetchedPrayers);
            setMultimedia(fetchedMultimedia);
            setPages(fetchedPages);
        } catch (error) {
            console.error("Failed to load content:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
        } catch (error) {
            setLoginError('Falha no login: ' + error.message);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const handleSaveConfig = async (e) => {
        e.preventDefault();
        setLoading(true);
        await saveConfig(config);
        setLoading(false);
        alert('Configurações salvas!');
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
            await loadContent();
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
        if (window.confirm('Excluir esta notícia?')) {
            setLoading(true);
            await deleteNewsItem(id);
            await loadContent();
            setLoading(false);
        }
    };

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
        if (window.confirm('Excluir este evento?')) {
            setLoading(true);
            await deleteEvent(id);
            await loadContent();
            setLoading(false);
        }
    };

    const handleDeletePrayer = async (id) => {
        if (window.confirm('Excluir este pedido?')) {
            setLoading(true);
            await deletePrayerRequest(id);
            await loadContent();
            setLoading(false);
        }
    };

    const handleMultimediaSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addMultimediaItem(multimediaForm);
            await loadContent();
            setMultimediaForm({ url: '', category: '' });
        } catch (error) {
            alert("Erro ao adicionar item: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteMultimedia = async (id) => {
        if (window.confirm('Excluir esta imagem?')) {
            setLoading(true);
            await deleteMultimediaItem(id);
            await loadContent();
            setLoading(false);
        }
    };

    // Pages CMS Handlers
    const handlePageEdit = (slug, content = '') => {
        setEditingPage(slug);
        setPageForm({ slug, content: content || '' });
        setActiveTab('page-editor');
    };

    const handlePageSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await savePage(pageForm.slug, pageForm.content);
            await loadContent();
            alert('Página salva com sucesso!');
            setActiveTab('pages');
        } catch (error) {
            alert('Erro ao salvar página: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="admin-login-overlay">
                <div className="admin-login-card">
                    <img src="/logo-rainha.jpg" alt="Logo" className="login-logo" />
                    <h2>Acesso Restrito</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Seu E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {loginError && <span className="error-msg">{loginError}</span>}
                        <button type="submit" disabled={loading}>
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const availablePages = [
        { name: 'Início (Home)', slug: 'home' },
        { name: 'Sobre Nós', slug: 'sobre' },
        { name: 'Multimídia', slug: 'multimidia' },
        { name: 'Contato', slug: 'contato' },
        { name: 'Liturgia do Dia', slug: 'liturgia' },
        { name: 'Santo do Dia', slug: 'santo' },
        { name: 'Pedidos de Oração', slug: 'pedidos' },
        { name: 'Colabore', slug: 'colabore' },
        { name: 'Caminho Formativo', slug: 'formacao' }
    ];

    return (
        <div className="admin-dashboard">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <img src="/logo-rainha.jpg" alt="Logo" className="sidebar-logo" />
                    <span>Painel Admin</span>
                </div>
                {loading && <div className="loading-indicator">Carregando...</div>}
                <nav className="sidebar-nav">
                    <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                        🏠 Dashboard
                    </button>
                    <button className={activeTab === 'pages' || activeTab === 'page-editor' ? 'active' : ''} onClick={() => setActiveTab('pages')}>
                        📄 Páginas Site
                    </button>
                    <button className={activeTab.startsWith('news') ? 'active' : ''} onClick={() => setActiveTab('news')}>
                        📰 Notícias
                    </button>
                    <button className={activeTab.startsWith('event') ? 'active' : ''} onClick={() => setActiveTab('events')}>
                        📅 Eventos
                    </button>
                    <button className={activeTab === 'prayers' ? 'active' : ''} onClick={() => setActiveTab('prayers')}>
                        🙏 Orações ({prayers.length})
                    </button>
                    <button className={activeTab === 'multimedia' ? 'active' : ''} onClick={() => setActiveTab('multimedia')}>
                        🖼️ Multimídia
                    </button>
                    <button className={activeTab === 'site' ? 'active' : ''} onClick={() => setActiveTab('site')}>
                        ⚙️ Configurações
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout}>Sair</button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <h1>
                        {activeTab === 'dashboard' && 'Visão Geral'}
                        {activeTab === 'pages' && 'Conteúdo das Páginas'}
                        {activeTab === 'page-editor' && `Editando: ${availablePages.find(p => p.slug === editingPage)?.name}`}
                        {activeTab === 'news' && 'Gerenciar Notícias'}
                        {activeTab === 'news-form' && (editingNews ? 'Editar Notícia' : 'Nova Notícia')}
                        {activeTab === 'events' && 'Gerenciar Eventos'}
                        {activeTab === 'event-form' && (editingEvent ? 'Editar Evento' : 'Novo Evento')}
                        {activeTab === 'prayers' && 'Pedidos de Oração'}
                        {activeTab === 'multimedia' && 'Galeria Multimídia'}
                        {activeTab === 'site' && 'Configurações do Site'}
                    </h1>
                </header>

                <div className="admin-content">
                    {activeTab === 'dashboard' && (
                        <div className="dashboard-stats">
                            <div className="stat-card">
                                <h3>Notícias</h3>
                                <p className="stat-number">{news.length}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Eventos</h3>
                                <p className="stat-number">{events.length}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Pedidos</h3>
                                <p className="stat-number">{prayers.length}</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'pages' && (
                        <div className="admin-section">
                            <div className="pages-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                                {availablePages.map(p => {
                                    const savedPage = pages.find(sp => sp.id === p.slug);
                                    return (
                                        <div key={p.slug} className="stat-card page-card">
                                            <h3>{p.name}</h3>
                                            <p style={{ fontSize: '0.8rem', color: '#888', margin: '10px 0' }}>
                                                {savedPage ? `Última edição: ${new Date(savedPage.updatedAt).toLocaleDateString()}` : 'Nunca editada'}
                                            </p>
                                            <button className="btn-primary" style={{ width: '100%' }} onClick={() => handlePageEdit(p.slug, savedPage?.content)}>
                                                Editar Conteúdo
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {activeTab === 'page-editor' && (
                        <div className="admin-section">
                            <form className="admin-form" onSubmit={handlePageSubmit}>
                                <RichTextEditor
                                    label={`Editor de Conteúdo - ${availablePages.find(p => p.slug === editingPage)?.name}`}
                                    value={pageForm.content}
                                    onChange={(content) => setPageForm({ ...pageForm, content })}
                                    height={500}
                                />
                                <div className="btn-group-row" style={{ marginTop: '20px' }}>
                                    <button type="submit" className="btn-primary" disabled={loading}>
                                        {loading ? 'Salvando...' : 'Salvar Alterações'}
                                    </button>
                                    <button type="button" className="btn-secondary" onClick={() => setActiveTab('pages')}>Voltar</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'news' && (
                        <div className="admin-section">
                            <button className="btn-primary" onClick={() => { setEditingNews(null); setNewsForm({ title: '', category: '', date: '', image: '', description: '' }); setActiveTab('news-form'); }}>+ Nova Notícia</button>
                            <table className="admin-table">
                                <thead><tr><th>Título</th><th>Data</th><th>Ações</th></tr></thead>
                                <tbody>
                                    {news.map(item => (
                                        <tr key={item.id}><td>{item.title}</td><td>{item.date}</td><td><button className="btn-edit" onClick={() => handleEditNews(item)}>Editar</button><button className="btn-delete" onClick={() => handleDeleteNews(item.id)}>Excluir</button></td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'news-form' && (
                        <div className="admin-section">
                            <form className="admin-form" onSubmit={handleNewsSubmit}>
                                <div className="form-group"><label>Título</label><input type="text" required value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} /></div>
                                <div className="form-group"><label>Categoria</label><input type="text" required value={newsForm.category} onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })} /></div>
                                <div className="form-group"><label>Data</label><input type="date" required value={newsForm.date} onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })} /></div>
                                <div className="form-group"><label>URL da Imagem</label><input type="text" value={newsForm.image} onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })} /></div>
                                <RichTextEditor label="Descrição" value={newsForm.description} onChange={(content) => setNewsForm({ ...newsForm, description: content })} />
                                <div className="btn-group-row"><button type="submit" className="btn-primary">{editingNews ? 'Atualizar' : 'Publicar'}</button><button type="button" className="btn-secondary" onClick={() => setActiveTab('news')}>Cancelar</button></div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'event-form' && (
                        <div className="admin-section">
                            <form className="admin-form" onSubmit={handleEventSubmit}>
                                <div className="form-group"><label>Nome do Evento</label><input type="text" required value={eventForm.name} onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })} /></div>
                                <div className="form-group"><label>Data</label><input type="text" required value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} /></div>
                                <div className="form-group"><label>Local</label><input type="text" required value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} /></div>
                                <div className="form-group"><label>URL da Imagem</label><input type="text" value={eventForm.image} onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })} /></div>
                                <RichTextEditor label="Informações Detalhadas" value={eventForm.info} onChange={(content) => setEventForm({ ...eventForm, info: content })} />
                                <div className="btn-group-row"><button type="submit" className="btn-primary">{editingEvent ? 'Atualizar' : 'Criar Evento'}</button><button type="button" className="btn-secondary" onClick={() => setActiveTab('events')}>Cancelar</button></div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'events' && (
                        <div className="admin-section">
                            <button className="btn-primary" onClick={() => { setEditingEvent(null); setEventForm({ name: '', date: '', location: '', info: '', image: '' }); setActiveTab('event-form'); }}>+ Novo Evento</button>
                            <table className="admin-table">
                                <thead><tr><th>Nome</th><th>Data</th><th>Ações</th></tr></thead>
                                <tbody>
                                    {events.map(item => (
                                        <tr key={item.id}><td>{item.name}</td><td>{item.date}</td><td><button className="btn-edit" onClick={() => handleEditEvent(item)}>Editar</button><button className="btn-delete" onClick={() => handleDeleteEvent(item.id)}>Excluir</button></td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'prayers' && (
                        <div className="admin-section">
                            <div className="prayers-list">
                                {prayers.map(p => (
                                    <div key={p.id} className="stat-card" style={{ marginBottom: '20px', borderLeft: '4px solid var(--accent-yellow)' }}>
                                        <p><strong>De:</strong> {p.name}</p>
                                        <p style={{ margin: '10px 0' }}>{p.request}</p>
                                        <p><small>{new Date(p.createdAt).toLocaleString()}</small></p>
                                        <button className="btn-delete" style={{ marginTop: '10px' }} onClick={() => handleDeletePrayer(p.id)}>Excluir</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'multimedia' && (
                        <div className="admin-section">
                            <form className="admin-form" onSubmit={handleMultimediaSubmit} style={{ marginBottom: '30px' }}>
                                <div className="form-group"><label>URL da Imagem</label><input type="text" required value={multimediaForm.url} onChange={(e) => setMultimediaForm({ ...multimediaForm, url: e.target.value })} /></div>
                                <button type="submit" className="btn-primary">+ Adicionar Imagem</button>
                            </form>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                                {multimedia.map(m => (
                                    <div key={m.id} style={{ position: 'relative' }}>
                                        <img src={m.url} alt="multimedia" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                                        <button className="btn-delete" style={{ position: 'absolute', top: '5px', right: '5px', padding: '5px' }} onClick={() => handleDeleteMultimedia(m.id)}>X</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'site' && (
                        <div className="admin-section">
                            <form className="admin-form" onSubmit={handleSaveConfig}>
                                <div className="form-group"><label>Título do Site</label><input type="text" value={config.siteTitle} onChange={(e) => setConfig({ ...config, siteTitle: e.target.value })} /></div>
                                <div className="form-group"><label>WhatsApp</label><input type="text" value={config.contactPhone} onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })} /></div>
                                <button type="submit" className="btn-primary">Salvar Configurações</button>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Admin;
