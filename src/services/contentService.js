const CONFIG_KEY = 'rainha_da_paz_config';
const NEWS_KEY = 'rainha_da_paz_news';

const defaultNews = [
    {
        id: 1,
        title: "Seminário de Vida no Espírito Santo",
        date: "2026-01-24",
        category: "Formação",
        image: "https://images.unsplash.com/photo-1519491050282-ce00c729c8bf?q=80&w=800&auto=format&fit=crop",
        description: "Participe do nosso seminário de vida no Espírito Santo e experimente um novo Pentecostes."
    },
    {
        id: 2,
        title: "Cerne Especial: Jovens em Missão",
        date: "2026-01-25",
        category: "Eventos",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop",
        description: "Encontro especial para jovens que desejam servir à Igreja com alegria."
    }
];

const defaultConfig = {
    siteTitle: "Grupo de Oração Rainha da Paz",
    heroTitle: "Grupo de Oração Rainha da Paz",
    heroSubtitle: "Um lugar de encontro com o amor de Deus e a efusão do Espírito Santo.",
    contactPhone: "(66) 98136-5456",
    contactEmail: "rainhadapazsinop@rccdesinop.com.br",
    whatsappLink: "https://wa.me/5566981365456"
};

export const getContent = () => {
    const config = JSON.parse(localStorage.getItem(CONFIG_KEY)) || defaultConfig;
    const news = JSON.parse(localStorage.getItem(NEWS_KEY)) || defaultNews;
    return { config, news };
};

export const saveConfig = (newConfig) => {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig));
};

export const saveNews = (newNews) => {
    localStorage.setItem(NEWS_KEY, JSON.stringify(newNews));
};

export const addNewsItem = (item) => {
    const { news } = getContent();
    const newItem = { ...item, id: Date.now() };
    const updatedNews = [newItem, ...news];
    saveNews(updatedNews);
    return updatedNews;
};

export const updateNewsItem = (id, updatedItem) => {
    const { news } = getContent();
    const updatedNews = news.map(item => item.id === id ? { ...item, ...updatedItem } : item);
    saveNews(updatedNews);
    return updatedNews;
};

export const deleteNewsItem = (id) => {
    const { news } = getContent();
    const updatedNews = news.filter(item => item.id !== id);
    saveNews(updatedNews);
    return updatedNews;
};
