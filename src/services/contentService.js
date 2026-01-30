import { supabase } from "../supabase";

// Tabelas Supabase
const NEWS_TABLE = 'news';
const EVENTS_TABLE = 'events';
const PRAYERS_TABLE = 'prayer_requests';
const MULTIMEDIA_TABLE = 'multimedia';
const PAGES_TABLE = 'pages';
const SETTINGS_TABLE = 'settings';
const PROFILES_TABLE = 'profiles';
const AUDIT_LOGS_TABLE = 'audit_logs';
const MEDIA_FILES_TABLE = 'media_files';
const API_KEYS_TABLE = 'api_keys';
const WEBHOOKS_TABLE = 'webhooks';
const HEALTH_LOGS_TABLE = 'health_logs';

// Site Config
export const getConfig = async () => {
    try {
        const { data, error } = await supabase
            .from(SETTINGS_TABLE)
            .select('*')
            .eq('id', 'default')
            .single();

        if (error || !data) {
            return {
                siteTitle: "Grupo de Oração Rainha da Paz",
                heroTitle: "Grupo de Oração Rainha da Paz",
                heroSubtitle: "Um lugar de encontro com o amor de Deus e a efusão do Espírito Santo.",
                contactPhone: "(66) 98136-5456",
                contactEmail: "rainhadapazsinop@rccdesinop.com.br"
            };
        }
        return data;
    } catch (error) {
        console.error("Error getting config:", error);
        return {};
    }
};

export const saveConfig = async (newConfig) => {
    try {
        await supabase
            .from(SETTINGS_TABLE)
            .upsert({ id: 'default', ...newConfig });
    } catch (error) {
        console.error("Error saving config:", error);
    }
};

// News
export const getNews = async (isAdmin = false) => {
    try {
        let query = supabase
            .from(NEWS_TABLE)
            .select('*')
            .order('published_at', { ascending: false });

        if (!isAdmin) {
            query = query
                .eq('status', 'published')
                .lte('published_at', new Date().toISOString());
        }

        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error getting news:", error);
        return [];
    }
};

export const getNewsItemById = async (id) => {
    try {
        const { data, error } = await supabase
            .from(NEWS_TABLE)
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error getting news item:", error);
        return null;
    }
};

export const addNewsItem = async (item) => {
    try {
        const { data, error } = await supabase
            .from(NEWS_TABLE)
            .insert([item])
            .select()
            .single();
        if (error) throw error;
        await triggerWebhooks('news.created', data);
        return data;
    } catch (error) {
        console.error("Error adding news:", error);
        throw error;
    }
};

export const updateNewsItem = async (id, updatedItem) => {
    try {
        const { error } = await supabase
            .from(NEWS_TABLE)
            .update(updatedItem)
            .eq('id', id);
        if (error) throw error;
    } catch (error) {
        console.error("Error updating news:", error);
        throw error;
    }
};

export const deleteNewsItem = async (id) => {
    try {
        const { error } = await supabase
            .from(NEWS_TABLE)
            .delete()
            .eq('id', id);
        if (error) throw error;
    } catch (error) {
        console.error("Error deleting news:", error);
        throw error;
    }
};

// Events
export const getEvents = async (isAdmin = false) => {
    try {
        let query = supabase
            .from(EVENTS_TABLE)
            .select('*')
            .order('published_at', { ascending: true });

        if (!isAdmin) {
            query = query
                .eq('status', 'published')
                .lte('published_at', new Date().toISOString());
        }

        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error getting events:", error);
        return [];
    }
};

export const addEvent = async (item) => {
    try {
        const { data, error } = await supabase
            .from(EVENTS_TABLE)
            .insert([item])
            .select()
            .single();
        if (error) throw error;
        await triggerWebhooks('event.created', data);
        return data;
    } catch (error) {
        console.error("Error adding event:", error);
        throw error;
    }
};

export const updateEvent = async (id, updatedItem) => {
    try {
        const { error } = await supabase
            .from(EVENTS_TABLE)
            .update(updatedItem)
            .eq('id', id);
        if (error) throw error;
    } catch (error) {
        console.error("Error updating event:", error);
        throw error;
    }
};

export const deleteEvent = async (id) => {
    try {
        const { error } = await supabase
            .from(EVENTS_TABLE)
            .delete()
            .eq('id', id);
        if (error) throw error;
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error;
    }
};

// Prayer Requests
export const addPrayerRequest = async (request) => {
    try {
        const { data, error } = await supabase
            .from(PRAYERS_TABLE)
            .insert([{
                ...request,
                status: 'pending',
                created_at: new Date().toISOString()
            }])
            .select()
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error adding prayer request:", error);
        throw error;
    }
};

export const getPrayerRequests = async () => {
    try {
        const { data, error } = await supabase
            .from(PRAYERS_TABLE)
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error getting prayer requests:", error);
        return [];
    }
};

export const deletePrayerRequest = async (id) => {
    try {
        const { error } = await supabase
            .from(PRAYERS_TABLE)
            .delete()
            .eq('id', id);
        if (error) throw error;
    } catch (error) {
        console.error("Error deleting prayer request:", error);
        throw error;
    }
};

// Multimedia
export const getMultimedia = async () => {
    try {
        const { data, error } = await supabase
            .from(MULTIMEDIA_TABLE)
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error getting multimedia:", error);
        return [];
    }
};

export const addMultimediaItem = async (item) => {
    try {
        const { data, error } = await supabase
            .from(MULTIMEDIA_TABLE)
            .insert([{
                ...item,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error adding multimedia item:", error);
        throw error;
    }
};

export const deleteMultimediaItem = async (id) => {
    try {
        const { error } = await supabase
            .from(MULTIMEDIA_TABLE)
            .delete()
            .eq('id', id);
        if (error) throw error;
    } catch (error) {
        console.error("Error deleting multimedia item:", error);
        throw error;
    }
};

// Media Files (Novo)
export const getMediaFiles = async (folder = 'raiz') => {
    try {
        const { data, error } = await supabase
            .from(MEDIA_FILES_TABLE)
            .select('*')
            .eq('folder', folder)
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error getting media files:", error);
        return [];
    }
};

export const addMediaFile = async (fileData) => {
    try {
        const { data, error } = await supabase
            .from(MEDIA_FILES_TABLE)
            .insert([{
                ...fileData,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error adding media file:", error);
        throw error;
    }
};

export const deleteMediaFile = async (id) => {
    try {
        const { error } = await supabase
            .from(MEDIA_FILES_TABLE)
            .delete()
            .eq('id', id);
        if (error) throw error;
    } catch (error) {
        console.error("Error deleting media file:", error);
        throw error;
    }
};

// Pages CMS
export const getPages = async () => {
    try {
        const { data, error } = await supabase
            .from(PAGES_TABLE)
            .select('*');
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error getting pages:", error);
        return [];
    }
};

export const getPageBySlug = async (slug) => {
    try {
        const { data, error } = await supabase
            .from(PAGES_TABLE)
            .select('*')
            .eq('slug', slug)
            .single();
        if (error) return null;
        return data;
    } catch (error) {
        console.error("Error getting page:", error);
        return null;
    }
};

export const savePage = async (slug, content, metadata = {}) => {
    try {
        const { error } = await supabase
            .from(PAGES_TABLE)
            .upsert({
                slug,
                content,
                ...metadata,
                updated_at: new Date().toISOString()
            }, { onConflict: 'slug' });
        if (error) throw error;
    } catch (error) {
        console.error("Error saving page:", error);
        throw error;
    }
};

// --- Auth & Profile Services ---

export const getProfile = async (userId) => {
    try {
        const { data, error } = await supabase
            .from(PROFILES_TABLE)
            .select('*')
            .eq('id', userId)
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error getting profile:", error);
        return null;
    }
};

export const updateProfileRole = async (userId, role) => {
    try {
        const { error } = await supabase
            .from(PROFILES_TABLE)
            .update({ role, updated_at: new Date().toISOString() })
            .eq('id', userId);
        if (error) throw error;
    } catch (error) {
        console.error("Error updating profile role:", error);
        throw error;
    }
};

export const getAllProfiles = async () => {
    try {
        const { data, error } = await supabase
            .from(PROFILES_TABLE)
            .select('*')
            .order('email');
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error getting all profiles:", error);
        return [];
    }
};

// --- Audit Logging ---

export const logAction = async (userId, action, module, details = {}) => {
    try {
        // Obter informações básicas do cliente (Frontend)
        const userAgent = navigator.userAgent;

        await supabase
            .from(AUDIT_LOGS_TABLE)
            .insert([{
                user_id: userId,
                action,
                module,
                details,
                user_agent: userAgent,
                created_at: new Date().toISOString()
            }]);
    } catch (error) {
        console.error("Error logging action:", error);
        // Não lançamos erro aqui para não travar a ação principal se o log falhar
    }
};

export const getAuditLogs = async (limit = 100) => {
    try {
        const { data, error } = await supabase
            .from(AUDIT_LOGS_TABLE)
            .select(`
                *,
                profiles:user_id (email)
            `)
            .order('created_at', { ascending: false })
            .limit(limit);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error getting audit logs:", error);
        return [];
    }
};

// --- API Keys & Webhooks Services ---

export const getApiKeys = async () => {
    try {
        const { data, error } = await supabase
            .from(API_KEYS_TABLE)
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error getting API keys:", error);
        return [];
    }
};

export const addApiKey = async (name) => {
    try {
        const key = 'rk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const { data, error } = await supabase
            .from(API_KEYS_TABLE)
            .insert([{
                key_name: name,
                key_value: key,
                user_id: (await supabase.auth.getUser()).data.user?.id
            }])
            .select()
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error adding API key:", error);
        throw error;
    }
};

export const deleteApiKey = async (id) => {
    try {
        const { error } = await supabase
            .from(API_KEYS_TABLE)
            .delete()
            .eq('id', id);
        if (error) throw error;
    } catch (error) {
        console.error("Error deleting API key:", error);
        throw error;
    }
};

export const getWebhooks = async () => {
    try {
        const { data, error } = await supabase
            .from(WEBHOOKS_TABLE)
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error getting webhooks:", error);
        return [];
    }
};

export const addWebhook = async (webhook) => {
    try {
        const { data, error } = await supabase
            .from(WEBHOOKS_TABLE)
            .insert([webhook])
            .select()
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error adding webhook:", error);
        throw error;
    }
};

export const deleteWebhook = async (id) => {
    try {
        const { error } = await supabase
            .from(WEBHOOKS_TABLE)
            .delete()
            .eq('id', id);
        if (error) throw error;
    } catch (error) {
        console.error("Error deleting webhook:", error);
        throw error;
    }
};

// --- Webhook Trigger Logic ---

export const triggerWebhooks = async (eventType, payload) => {
    try {
        const { data: webhooks, error } = await supabase
            .from(WEBHOOKS_TABLE)
            .select('*')
            .eq('is_active', true);

        if (error || !webhooks) return;

        const promises = webhooks
            .filter(w => w.event_types.includes('all') || w.event_types.includes(eventType))
            .map(async (w) => {
                try {
                    const response = await fetch(w.url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Webhook-Secret': w.secret_token || ''
                        },
                        body: JSON.stringify({
                            event: eventType,
                            timestamp: new Date().toISOString(),
                            data: payload
                        })
                    });

                    await supabase
                        .from(WEBHOOKS_TABLE)
                        .update({
                            last_run_status: response.status,
                            last_run_at: new Date().toISOString()
                        })
                        .eq('id', w.id);
                } catch (err) {
                    console.error(`Webhook fail to ${w.url}:`, err);
                    await supabase
                        .from(WEBHOOKS_TABLE)
                        .update({
                            last_run_status: 500,
                            last_run_at: new Date().toISOString()
                        })
                        .eq('id', w.id);
                }
            });

        await Promise.all(promises);
    } catch (error) {
        console.error("Error in triggerWebhooks:", error);
    }
};

// --- Monitoring & Infrastructure Services ---

export const getHealthLogs = async () => {
    try {
        const { data, error } = await supabase
            .from(HEALTH_LOGS_TABLE)
            .select('*')
            .order('checked_at', { ascending: false })
            .limit(50);
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error getting health logs:", error);
        return [];
    }
};

export const recordHealthCheck = async (status, latency) => {
    try {
        const { data, error } = await supabase
            .from(HEALTH_LOGS_TABLE)
            .insert([{ status, latency }])
            .select()
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error recording health check:", error);
    }
};

export const measureLatency = async () => {
    const start = performance.now();
    try {
        await supabase.from(PROFILES_TABLE).select('count', { count: 'exact', head: true });
        const end = performance.now();
        return Math.round(end - start);
    } catch (error) {
        console.error("Latency measurement failed:", error);
        return -1;
    }
};
