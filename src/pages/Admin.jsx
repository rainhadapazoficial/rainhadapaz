import React, { useState, useEffect } from 'react';
import './Admin.css';
import RichTextEditor from '../components/RichTextEditor';
import { supabase } from '../supabase';
import {
    getConfig, saveConfig, getNews, addNewsItem, updateNewsItem, deleteNewsItem,
    getEvents, addEvent, updateEvent, deleteEvent,
    getPrayerRequests, deletePrayerRequest,
    getMultimedia, addMultimediaItem, deleteMultimediaItem,
    getPages, savePage, getProfile, getAllProfiles, getAuditLogs, logAction, updateProfileRole,
    getApiKeys, addApiKey, deleteApiKey, getWebhooks, addWebhook, deleteWebhook,
    getHealthLogs, recordHealthCheck, measureLatency
} from '../services/contentService';
import { useTheme } from '../context/ThemeContext';

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
    const [userProfile, setUserProfile] = useState(null);
    const [allProfiles, setAllProfiles] = useState([]);
    const [auditLogs, setAuditLogs] = useState([]);
    const [apiKeys, setApiKeys] = useState([]);
    const [webhooks, setWebhooks] = useState([]);
    const [webhookForm, setWebhookForm] = useState({ url: '', event_types: ['all'], secret_token: '' });
    const [healthLogs, setHealthLogs] = useState([]);
    const [currentLatency, setCurrentLatency] = useState(null);
    const { theme, setTheme, toggleTheme, primaryColor, setPrimaryColor } = useTheme();

    // Filtros e Busca
    const [newsSearch, setNewsSearch] = useState('');
    const [eventSearch, setEventSearch] = useState('');

    // Form States
    const [editingNews, setEditingNews] = useState(null);
    const [newsForm, setNewsForm] = useState({ title: '', category: '', date: '', image: '', description: '', status: 'published', published_at: new Date().toISOString().split('T')[0], custom_fields: {}, seo_title: '', seo_description: '' });

    const [editingEvent, setEditingEvent] = useState(null);
    const [eventForm, setEventForm] = useState({ name: '', date: '', location: '', info: '', image: '', status: 'published', published_at: new Date().toISOString().split('T')[0], custom_fields: {}, seo_title: '', seo_description: '' });

    const [multimediaForm, setMultimediaForm] = useState({ url: '', category: '' });

    const [editingPage, setEditingPage] = useState(null);
    const [pageForm, setPageForm] = useState({ slug: '', content: '' });

    useEffect(() => {
        // Check current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                loadProfile(currentUser.id);
                loadContent(currentUser.id);
            } else {
                setLoading(false);
            }
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                loadProfile(currentUser.id);
                loadContent(currentUser.id);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const loadProfile = async (userId) => {
        const profile = await getProfile(userId);
        setUserProfile(profile);
    };

    const loadContent = async (userId) => {
        setLoading(true);
        try {
            // Primeiro carregar o perfil para saber as permissões
            const profile = await getProfile(userId || user?.id);
            setUserProfile(profile);

            const promises = [
                getConfig(),
                getNews(true),
                getEvents(true),
                getPrayerRequests(),
                getMultimedia(),
                getPages()
            ];

            // Se for super_admin ou admin, carregar usuários e logs
            if (profile?.role === 'super_admin' || profile?.role === 'admin') {
                promises.push(getAllProfiles());
                promises.push(getAuditLogs());
                promises.push(getApiKeys());
                promises.push(getWebhooks());
                promises.push(getHealthLogs());
            }

            const results = await Promise.all(promises);

            setConfig(results[0]);
            setNews(results[1]);
            setEvents(results[2]);
            setPrayers(results[3]);
            setMultimedia(results[4]);
            setPages(results[5]);

            if (results.length > 6) {
                setAllProfiles(results[6]);
                setAuditLogs(results[7]);
                setApiKeys(results[8]);
                setWebhooks(results[9]);
                setHealthLogs(results[10]);
            }
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

    useEffect(() => {
        if (activeTab === 'health') {
            const check = async () => {
                const lat = await measureLatency();
                setCurrentLatency(lat);
                await recordHealthCheck(lat > 0 ? 'online' : 'offline', lat);
            };
            check();
            const interval = setInterval(check, 30000);
            return () => clearInterval(interval);
        }
    }, [activeTab]);

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
            await logAction(user.id, editingNews ? 'UPDATE' : 'CREATE', 'news', { title: newsForm.title });
            setEditingNews(null);
            setNewsForm({ title: '', category: '', date: '', image: '', description: '', status: 'published', published_at: new Date().toISOString().split('T')[0], custom_fields: {}, seo_title: '', seo_description: '' });
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
            await logAction(user.id, 'DELETE', 'news', { id });
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
            setEventForm({ name: '', date: '', location: '', info: '', image: '', status: 'published', published_at: new Date().toISOString().split('T')[0], custom_fields: {}, seo_title: '', seo_description: '' });
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
                    {(userProfile?.role === 'super_admin' || userProfile?.role === 'admin') && (
                        <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
                            👥 Usuários
                        </button>
                    )}
                    <button className={activeTab === 'calendar' ? 'active' : ''} onClick={() => setActiveTab('calendar')}>
                        📅 Calendário
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
                    {(userProfile?.role === 'super_admin' || userProfile?.role === 'admin') && (
                        <>
                            <button className={activeTab === 'integrations' ? 'active' : ''} onClick={() => setActiveTab('integrations')}>
                                🔗 Integrações
                            </button>
                            <button className={activeTab === 'health' ? 'active' : ''} onClick={() => setActiveTab('health')}>
                                ⚡ Status & Saúde
                            </button>
                            <button className={activeTab === 'audit' ? 'active' : ''} onClick={() => setActiveTab('audit')}>
                                📜 Logs Auditoria
                            </button>
                            <button className={activeTab === 'site' ? 'active' : ''} onClick={() => setActiveTab('site')}>
                                ⚙️ Configurações
                            </button>
                        </>
                    )}
                </nav>
                <div className="sidebar-footer">
                    <div className="user-badge-sidebar">
                        <small>{userProfile?.role?.toUpperCase()}</small>
                        <span>{user?.email}</span>
                    </div>
                    <button onClick={handleLogout}>Sair</button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <h1 style={{ margin: 0 }}>
                            {activeTab === 'dashboard' && 'Painel de Controle'}
                            {activeTab === 'users' && 'Gerenciar Usuários'}
                            {activeTab === 'calendar' && 'Calendário Editorial'}
                            {activeTab === 'pages' && 'Conteúdo das Páginas'}
                            {activeTab === 'page-editor' && `Editando: ${availablePages.find(p => p.slug === editingPage)?.name}`}
                            {activeTab === 'news' && 'Notícias & Artigos'}
                            {activeTab === 'news-form' && (editingNews ? 'Editar Notícia' : 'Nova Notícia')}
                            {activeTab === 'events' && 'Eventos & Agenda'}
                            {activeTab === 'event-form' && (editingEvent ? 'Editar Evento' : 'Novo Evento')}
                            {activeTab === 'prayers' && 'Pedidos de Oração'}
                            {activeTab === 'multimedia' && 'Galeria Multimídia'}
                            {activeTab === 'audit' && 'Registro de Auditoria'}
                            {activeTab === 'integrations' && 'APIs & Webhooks'}
                            {activeTab === 'health' && 'Saúde do Sistema & Infra'}
                            {activeTab === 'site' && 'Configurações do Site'}
                        </h1>
                        <div className="admin-top-actions" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <button
                                onClick={toggleTheme}
                                title="Alternar Tema"
                                style={{ padding: '8px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)', display: 'flex' }}
                            >
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </button>
                            <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{user?.email}</span>
                        </div>
                    </div>
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

                    {activeTab === 'calendar' && (
                        <div className="admin-section">
                            <div className="calendar-controls" style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <h3>{new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h3>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <span style={{ color: '#2ecc71' }}>● Publicado</span>
                                    <span style={{ color: '#f1c40f' }}>● Agendado</span>
                                    <span style={{ color: '#95a5a6' }}>● Rascunho</span>
                                </div>
                            </div>
                            <div className="calendar-visual-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', background: '#eee', padding: '10px', borderRadius: '12px' }}>
                                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => <div key={d} style={{ textAlign: 'center', fontWeight: 'bold', padding: '10px' }}>{d}</div>)}
                                {Array.from({ length: 31 }).map((_, i) => {
                                    const day = i + 1;
                                    const items = [...news, ...events].filter(item => {
                                        const dateValue = item.published_at || item.date;
                                        if (!dateValue) return false;
                                        const date = new Date(dateValue);
                                        return date.getDate() === day && date.getMonth() === new Date().getMonth();
                                    });
                                    return (
                                        <div key={i} style={{ background: 'white', minHeight: '100px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                            <div style={{ fontWeight: 'bold', borderBottom: '1px solid #eee', marginBottom: '5px' }}>{day}</div>
                                            {items.map(item => (
                                                <div
                                                    key={item.id}
                                                    title={item.title || item.name}
                                                    style={{
                                                        fontSize: '0.7rem',
                                                        padding: '2px 5px',
                                                        marginBottom: '2px',
                                                        borderRadius: '4px',
                                                        background: item.status === 'published' ? '#e8f5e9' : (item.status === 'scheduled' ? '#fff9c4' : '#f5f5f5'),
                                                        color: item.status === 'published' ? '#2e7d32' : (item.status === 'scheduled' ? '#fbc02d' : '#616161'),
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => (item.title ? handleEditNews(item) : handleEditEvent(item))}
                                                >
                                                    {item.title || item.name}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
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
                            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <button className="btn-primary" onClick={() => { setEditingNews(null); setNewsForm({ title: '', category: '', date: '', image: '', description: '', status: 'published', published_at: new Date().toISOString().split('T')[0], custom_fields: {}, seo_title: '', seo_description: '' }); setActiveTab('news-form'); }}>+ Nova Notícia</button>
                                <div className="search-bar">
                                    <input
                                        type="text"
                                        placeholder="Buscar notícias..."
                                        value={newsSearch}
                                        onChange={(e) => setNewsSearch(e.target.value)}
                                        style={{ padding: '8px 15px', borderRadius: '20px', border: '1px solid #ddd' }}
                                    />
                                </div>
                            </div>

                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Categoria</th>
                                        <th>Status</th>
                                        <th>Data</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {news
                                        .filter(n => (n.title || '').toLowerCase().includes((newsSearch || '').toLowerCase()))
                                        .map(n => (
                                            <tr key={n.id}>
                                                <td>{n.title}</td>
                                                <td>{n.category}</td>
                                                <td><span className={`status-badge status-${n.status}`}>{n.status}</span></td>
                                                <td>{new Date(n.published_at).toLocaleDateString()}</td>
                                                <td>
                                                    <button className="btn-edit" onClick={() => handleEditNews(n)}>Editar</button>
                                                    <button className="btn-delete" onClick={() => handleDeleteNews(n.id)}>Excluir</button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'news-form' && (
                        <div className="admin-section">
                            <div className="form-card-container">
                                <form className="admin-form-modern" onSubmit={handleNewsSubmit}>
                                    <div className="form-inner-grid">
                                        <div className="form-group full-width">
                                            <label>Título da Notícia</label>
                                            <input type="text" required placeholder="Ex: Retiro de Jovens 2026" value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Categoria</label>
                                            <input type="text" required placeholder="Ex: Avisos, Formação..." value={newsForm.category} onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Status</label>
                                            <select value={newsForm.status} onChange={(e) => setNewsForm({ ...newsForm, status: e.target.value })}>
                                                <option value="published">Publicado</option>
                                                <option value="draft">Rascunho</option>
                                                <option value="scheduled">Agendado</option>
                                                <option value="archived">Arquivado</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Data de Publicação</label>
                                            <input type="date" value={newsForm.published_at ? newsForm.published_at.split('T')[0] : ''} onChange={(e) => setNewsForm({ ...newsForm, published_at: e.target.value })} />
                                        </div>
                                        <div className="form-group full-width">
                                            <label>URL da Imagem (Opcional)</label>
                                            <input type="text" placeholder="https://exemplo.com/imagem.jpg" value={newsForm.image} onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })} />
                                        </div>
                                        <div className="form-group full-width">
                                            <label>Campos Dinâmicos (JSON)</label>
                                            <textarea
                                                placeholder='{"chave": "valor"}'
                                                value={JSON.stringify(newsForm.custom_fields || {})}
                                                onChange={(e) => {
                                                    try {
                                                        const val = JSON.parse(e.target.value);
                                                        setNewsForm({ ...newsForm, custom_fields: val });
                                                    } catch (err) {
                                                        console.warn("Invalid JSON in custom fields:", err);
                                                    }
                                                }}
                                                style={{ height: '80px', fontSize: '0.8rem', fontFamily: 'monospace' }}
                                            />
                                        </div>
                                        <div className="form-group full-width">
                                            <RichTextEditor label="Conteúdo da Notícia" value={newsForm.description} onChange={(content) => setNewsForm({ ...newsForm, description: content })} />
                                        </div>

                                        <div className="form-group full-width seo-section" style={{ borderTop: '1px solid #eee', marginTop: '20px', paddingTop: '20px' }}>
                                            <h4>🔍 SEO & Pré-visualização</h4>
                                            <div className="form-inner-grid">
                                                <div className="form-group"><label>Meta Título (SEO)</label><input type="text" value={newsForm.seo_title} onChange={(e) => setNewsForm({ ...newsForm, seo_title: e.target.value })} /></div>
                                                <div className="form-group"><label>Meta Descrição</label><textarea value={newsForm.seo_description} onChange={(e) => setNewsForm({ ...newsForm, seo_description: e.target.value })} style={{ height: '60px' }} /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-group-row-sticky">
                                        <button type="submit" className="btn-submit-primary">{editingNews ? '✅ Atualizar Notícia' : '🚀 Publicar Notícia'}</button>
                                        <button type="button" className="btn-cancel" onClick={() => setActiveTab('news')}>Cancelar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {activeTab === 'event-form' && (
                        <div className="admin-section">
                            <form className="admin-form-modern" onSubmit={handleEventSubmit}>
                                <div className="form-inner-grid">
                                    <div className="form-group full-width">
                                        <label>Nome do Evento</label>
                                        <input type="text" required value={eventForm.name} onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select value={eventForm.status} onChange={(e) => setEventForm({ ...eventForm, status: e.target.value })}>
                                            <option value="published">Publicado</option>
                                            <option value="draft">Rascunho</option>
                                            <option value="scheduled">Agendado</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Data de Publicação/Lançamento</label>
                                        <input type="date" value={eventForm.published_at ? eventForm.published_at.split('T')[0] : ''} onChange={(e) => setEventForm({ ...eventForm, published_at: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Data do Evento (Texto)</label>
                                        <input type="text" placeholder="Ex: 15 de Março" required value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Local</label>
                                        <input type="text" required value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>URL da Imagem</label>
                                        <input type="text" value={eventForm.image} onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })} />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Campos Dinâmicos (JSON)</label>
                                        <textarea
                                            placeholder='{"link": "https://..."}'
                                            value={JSON.stringify(eventForm.custom_fields || {})}
                                            onChange={(e) => {
                                                try {
                                                    const val = JSON.parse(e.target.value);
                                                    setEventForm({ ...eventForm, custom_fields: val });
                                                } catch (err) {
                                                    console.warn("Invalid JSON in custom fields:", err);
                                                }
                                            }}
                                            style={{ height: '80px', fontSize: '0.8rem', fontFamily: 'monospace' }}
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <RichTextEditor label="Informações Detalhadas" value={eventForm.info} onChange={(content) => setEventForm({ ...eventForm, info: content })} />
                                    </div>

                                    <div className="form-group full-width seo-section" style={{ borderTop: '1px solid #eee', marginTop: '20px', paddingTop: '20px' }}>
                                        <h4>🔍 SEO & Pré-visualização</h4>
                                        <div className="form-inner-grid">
                                            <div className="form-group"><label>Meta Título (SEO)</label><input type="text" value={eventForm.seo_title} onChange={(e) => setEventForm({ ...eventForm, seo_title: e.target.value })} /></div>
                                            <div className="form-group"><label>Meta Descrição</label><textarea value={eventForm.seo_description} onChange={(e) => setEventForm({ ...eventForm, seo_description: e.target.value })} style={{ height: '60px' }} /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-group-row-sticky">
                                    <button type="submit" className="btn-submit-primary">{editingEvent ? 'Atualizar' : 'Criar Evento'}</button>
                                    <button type="button" className="btn-cancel" onClick={() => setActiveTab('events')}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'events' && (
                        <div className="admin-section">
                            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <button className="btn-primary" onClick={() => { setEditingEvent(null); setEventForm({ name: '', date: '', location: '', info: '', image: '', status: 'published', published_at: new Date().toISOString().split('T')[0], custom_fields: {}, seo_title: '', seo_description: '' }); setActiveTab('event-form'); }}>+ Novo Evento</button>
                                <div className="search-bar">
                                    <input
                                        type="text"
                                        placeholder="Buscar eventos..."
                                        value={eventSearch}
                                        onChange={(e) => setEventSearch(e.target.value)}
                                        style={{ padding: '8px 15px', borderRadius: '20px', border: '1px solid #ddd' }}
                                    />
                                </div>
                            </div>

                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Data</th>
                                        <th>Status</th>
                                        <th>Local</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events
                                        .filter(e => (e.name || '').toLowerCase().includes((eventSearch || '').toLowerCase()))
                                        .map(item => (
                                            <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td>{item.date}</td>
                                                <td><span className={`status-badge status-${item.status}`}>{item.status}</span></td>
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
                            <div className="media-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <div className="media-folders" style={{ display: 'flex', gap: '10px' }}>
                                    <button className="active">📁 Todos</button>
                                    <button>📂 Imagens</button>
                                    <button>📂 Vídeos</button>
                                    <button>📂 Documentos</button>
                                </div>
                                <form className="admin-form-inline" onSubmit={handleMultimediaSubmit} style={{ display: 'flex', gap: '10px' }}>
                                    <input type="text" placeholder="URL da nova imagem..." required value={multimediaForm.url} onChange={(e) => setMultimediaForm({ ...multimediaForm, url: e.target.value })} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ddd', width: '250px' }} />
                                    <button type="submit" className="btn-primary" style={{ padding: '8px 15px' }}>+ Adicionar</button>
                                </form>
                            </div>
                            <div className="media-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
                                {multimedia.map(m => (
                                    <div key={m.id} className="media-card" style={{ position: 'relative', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                        <img src={m.url} alt="media" style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                                        <div style={{ padding: '10px', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                                            <span>{new Date(m.created_at).toLocaleDateString()}</span>
                                            <button onClick={() => handleDeleteMultimedia(m.id)} style={{ color: '#e74c3c' }}>🗑️</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}



                    {activeTab === 'users' && (
                        <div className="admin-section">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>E-mail</th>
                                        <th>Nível de Acesso</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allProfiles.map(p => (
                                        <tr key={p.id}>
                                            <td>{p.email} {p.id === user.id ? '(Você)' : ''}</td>
                                            <td>
                                                <select
                                                    value={p.role}
                                                    disabled={p.id === user.id}
                                                    onChange={async (e) => {
                                                        const newRole = e.target.value;
                                                        if (window.confirm(`Mudar nível de ${p.email} para ${newRole}?`)) {
                                                            await updateProfileRole(p.id, newRole);
                                                            await logAction(user.id, 'UPDATE_ROLE', 'users', { target: p.email, newRole });
                                                            loadContent();
                                                        }
                                                    }}
                                                >
                                                    <option value="super_admin">Super Admin</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="editor">Editor</option>
                                                    <option value="author">Autor</option>
                                                    <option value="viewer">Visualizador</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button className="btn-delete" disabled={p.id === user.id}>Remover</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'audit' && (
                        <div className="admin-section">
                            <div className="audit-logs-list">
                                {auditLogs.map(log => (
                                    <div key={log.id} className="audit-log-item" style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <strong>{log.profiles?.email || 'Sistema'}</strong>
                                            <small>{new Date(log.created_at).toLocaleString()}</small>
                                        </div>
                                        <div style={{ marginTop: '5px' }}>
                                            <span className={`badge-action ${log.action.toLowerCase()}`}>{log.action}</span>
                                            <span style={{ margin: '0 10px' }}>no módulo</span>
                                            <strong>{log.module}</strong>
                                        </div>
                                        {log.details && (
                                            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>
                                                {JSON.stringify(log.details)}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'integrations' && (
                        <div className="admin-section">
                            <section className="integration-group">
                                <h3>🔑 Chaves de API</h3>
                                <p>Use estas chaves para postar conteúdos via n8n, Pabbly ou scripts externos.</p>
                                <button className="btn-primary" onClick={async () => {
                                    const name = prompt('Nome para esta chave (ex: n8n Workflow):');
                                    if (name) {
                                        const newKey = await addApiKey(name);
                                        alert(`CHAVE GERADA (COPIE AGORA, ELA NÃO SERÁ MOSTRADA NOVAMENTE):\n\n${newKey.key_value}`);
                                        loadContent();
                                    }
                                }}>+ Gerar Nova Chave</button>
                                <table className="admin-table" style={{ marginTop: '15px' }}>
                                    <thead><tr><th>Nome</th><th>Criada em</th><th>Ações</th></tr></thead>
                                    <tbody>
                                        {apiKeys.map(k => (
                                            <tr key={k.id}>
                                                <td>{k.key_name}</td>
                                                <td>{new Date(k.created_at).toLocaleDateString()}</td>
                                                <td><button className="btn-delete" onClick={async () => { if (confirm('Revogar chave?')) { await deleteApiKey(k.id); loadContent(); } }}>Revogar</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>

                            <section className="integration-group" style={{ marginTop: '40px' }}>
                                <h3>🪝 Webhooks (Saída)</h3>
                                <p>O site enviará uma notificação para estas URLs sempre que houver mudanças.</p>
                                <form className="admin-form-modern" style={{ padding: '20px', marginBottom: '20px' }} onSubmit={async (e) => {
                                    e.preventDefault();
                                    await addWebhook(webhookForm);
                                    await logAction(user.id, 'ADD_WEBHOOK', 'integrations', { url: webhookForm.url });
                                    setWebhookForm({ url: '', event_types: ['all'], secret_token: '' });
                                    loadContent();
                                }}>
                                    <div className="form-inner-grid">
                                        <div className="form-group full-width">
                                            <label>URL do Webhook (ex: n8n trigger URL)</label>
                                            <input type="url" required value={webhookForm.url} onChange={(e) => setWebhookForm({ ...webhookForm, url: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Token Secreto (Opcional)</label>
                                            <input type="text" value={webhookForm.secret_token} onChange={(e) => setWebhookForm({ ...webhookForm, secret_token: e.target.value })} />
                                        </div>
                                        <button type="submit" className="btn-primary" style={{ alignSelf: 'end' }}>Adicionar Webhook</button>
                                    </div>
                                </form>
                                <div className="webhooks-list">
                                    {webhooks.map(w => (
                                        <div key={w.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #eee' }}>
                                            <div>
                                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{w.url}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                                                    Status: {w.last_run_status === 200 ? '✅ OK' : '❌ Falha (' + (w.last_run_status || '-') + ')'}
                                                    | Último disparo: {w.last_run_at ? new Date(w.last_run_at).toLocaleString() : 'Nunca'}
                                                </div>
                                            </div>
                                            <button className="btn-delete" onClick={async () => { if (confirm('Remover webhook?')) { await deleteWebhook(w.id); loadContent(); } }}>Remover</button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'health' && (
                        <div className="admin-section">
                            <div className="health-dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                                <div className="health-card" style={{ background: '#fff', padding: '25px', borderRadius: '15px', border: '1px solid #eee', textAlign: 'center' }}>
                                    <h4 style={{ color: '#666', marginBottom: '10px' }}>Latência do Banco (Supabase)</h4>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: currentLatency < 200 ? '#2ecc71' : '#f1c40f' }}>
                                        {currentLatency ? `${currentLatency}ms` : 'Medindo...'}
                                    </div>
                                    <div style={{ marginTop: '10px', color: '#888' }}>Status: <strong>{currentLatency > 0 ? 'ESTÁVEL' : 'OFFLINE'}</strong></div>
                                </div>
                                <div className="health-card" style={{ background: '#fff', padding: '25px', borderRadius: '15px', border: '1px solid #eee' }}>
                                    <h4>Uptime Recente</h4>
                                    <div style={{ marginTop: '15px' }}>
                                        {healthLogs.slice(0, 5).map(log => (
                                            <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', padding: '8px 0', borderBottom: '1px solid #f9f9f9' }}>
                                                <span>{new Date(log.checked_at).toLocaleTimeString()}</span>
                                                <span style={{ color: log.status === 'online' ? '#2ecc71' : '#e74c3c' }}>● {log.status}</span>
                                                <strong>{log.latency}ms</strong>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <section className="integration-group">
                                <h3>🛡️ Infraestrutura & Segurança</h3>
                                <div className="admin-form-modern" style={{ padding: '25px' }}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <input type="checkbox" checked={config.security_config?.maintenance_mode} onChange={(e) => setConfig({ ...config, security_config: { ...config.security_config, maintenance_mode: e.target.checked } })} />
                                            <strong>Modo de Manutenção</strong> (Bloqueia acesso público ao site)
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>Frequência de Backup Automático</label>
                                        <select value={config.backup_config?.frequency} onChange={(e) => setConfig({ ...config, backup_config: { ...config.backup_config, frequency: e.target.value } })}>
                                            <option value="hourly">A cada hora</option>
                                            <option value="daily">Diário</option>
                                            <option value="weekly">Semanal</option>
                                        </select>
                                    </div>
                                    <button className="btn-submit-primary" onClick={handleSaveConfig} style={{ marginTop: '20px' }}>Salvar Ajustes de Infra</button>
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'site' && (
                        <div className="admin-section">
                            <form className="admin-form-modern" onSubmit={handleSaveConfig}>
                                <div style={{ marginBottom: '30px' }}>
                                    <h3>🌍 Configurações Gerais</h3>
                                    <div className="form-inner-grid">
                                        <div className="form-group"><label>Título do Site</label><input type="text" value={config.siteTitle} onChange={(e) => setConfig({ ...config, siteTitle: e.target.value })} /></div>
                                        <div className="form-group"><label>WhatsApp de Contato</label><input type="text" value={config.contactPhone} onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })} /></div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '30px' }}>
                                    <h3>🔍 SEO Global</h3>
                                    <div className="form-inner-grid">
                                        <div className="form-group full-width"><label>Meta Título Padrão</label><input type="text" value={config.seo_title} onChange={(e) => setConfig({ ...config, seo_title: e.target.value })} /></div>
                                        <div className="form-group full-width"><label>Meta Descrição Global</label><textarea value={config.seo_description} onChange={(e) => setConfig({ ...config, seo_description: e.target.value })} /></div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '30px' }}>
                                    <h3>📊 Analytics & Pixels</h3>
                                    <div className="form-inner-grid">
                                        <div className="form-group"><label>Google Analytics ID (GA4)</label><input type="text" placeholder="G-XXXXXXXXXX" value={config.ga_id} onChange={(e) => setConfig({ ...config, ga_id: e.target.value })} /></div>
                                        <div className="form-group"><label>Facebook Pixel ID</label><input type="text" value={config.fb_pixel_id} onChange={(e) => setConfig({ ...config, fb_pixel_id: e.target.value })} /></div>
                                        <div className="form-group"><label>Google Tag Manager ID</label><input type="text" placeholder="GTM-XXXXXXX" value={config.gtm_id} onChange={(e) => setConfig({ ...config, gtm_id: e.target.value })} /></div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '30px' }}>
                                    <h3>🎨 Whitelabeling & Personalização</h3>
                                    <div className="form-inner-grid">
                                        <div className="form-group">
                                            <label>Cor Primária do Painel</label>
                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} style={{ width: '50px', height: '40px', padding: '0', border: 'none' }} />
                                                <span>{primaryColor}</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Idioma do Painel (i18n)</label>
                                            <select value={config.i18n_config?.language || 'pt-BR'} onChange={(e) => setConfig({ ...config, i18n_config: { ...(config.i18n_config || {}), language: e.target.value } })}>
                                                <option value="pt-BR">Português (Brasil)</option>
                                                <option value="en">English</option>
                                                <option value="es">Español</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Modo Escuro Padrão</label>
                                            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                                                <option value="light">Claro</option>
                                                <option value="dark">Escuro</option>
                                                <option value="system">Seguir Sistema</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn-submit-primary">Salvar Todas as Configurações</button>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Admin;
