import { supabase } from "../supabase";

// Tabelas Supabase
const NEWS_TABLE = 'news';
const EVENTS_TABLE = 'events';
const PRAYERS_TABLE = 'prayer_requests';
const MULTIMEDIA_TABLE = 'multimedia';
const PAGES_TABLE = 'pages';
const SETTINGS_TABLE = 'settings';

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
export const getNews = async () => {
    try {
        const { data, error } = await supabase
            .from(NEWS_TABLE)
            .select('*')
            .order('date', { ascending: false });
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
export const getEvents = async () => {
    try {
        const { data, error } = await supabase
            .from(EVENTS_TABLE)
            .select('*')
            .order('date', { ascending: true });
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

export const savePage = async (slug, content) => {
    try {
        const { error } = await supabase
            .from(PAGES_TABLE)
            .upsert({
                slug,
                content,
                updated_at: new Date().toISOString()
            }, { onConflict: 'slug' });
        if (error) throw error;
    } catch (error) {
        console.error("Error saving page:", error);
        throw error;
    }
};
