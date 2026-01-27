import { db } from "../firebase";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    setDoc,
    query,
    orderBy
} from "firebase/firestore";

const CONFIG_DOC_ID = 'site_settings';
const NEWS_COLLECTION = 'news';
const EVENTS_COLLECTION = 'events';
const PRAYERS_COLLECTION = 'prayer_requests';
const MULTIMEDIA_COLLECTION = 'multimedia';
const PAGES_COLLECTION = 'pages';

const defaultConfig = {
    siteTitle: "Grupo de Oração Rainha da Paz",
    heroTitle: "Grupo de Oração Rainha da Paz",
    heroSubtitle: "Um lugar de encontro com o amor de Deus e a efusão do Espírito Santo.",
    contactPhone: "(66) 98136-5456",
    contactEmail: "rainhadapazsinop@rccdesinop.com.br",
    whatsappLink: "https://wa.me/5566981365456"
};

// Site Config
export const getConfig = async () => {
    try {
        const configDoc = await getDoc(doc(db, "settings", CONFIG_DOC_ID));
        if (configDoc.exists()) {
            return configDoc.data();
        } else {
            // Initialize with defaults if it doesn't exist
            await setDoc(doc(db, "settings", CONFIG_DOC_ID), defaultConfig);
            return defaultConfig;
        }
    } catch (error) {
        console.error("Error getting config:", error);
        return defaultConfig;
    }
};

export const saveConfig = async (newConfig) => {
    try {
        await setDoc(doc(db, "settings", CONFIG_DOC_ID), newConfig);
    } catch (error) {
        console.error("Error saving config:", error);
    }
};

// News
export const getNews = async () => {
    try {
        const q = query(collection(db, NEWS_COLLECTION), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting news:", error);
        return [];
    }
};

export const getNewsItemById = async (id) => {
    try {
        const docRef = doc(db, NEWS_COLLECTION, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    } catch (error) {
        console.error("Error getting news item:", error);
        throw error;
    }
};

export const addNewsItem = async (item) => {
    try {
        const docRef = await addDoc(collection(db, NEWS_COLLECTION), item);
        return { id: docRef.id, ...item };
    } catch (error) {
        console.error("Error adding news:", error);
        throw error;
    }
};

export const updateNewsItem = async (id, updatedItem) => {
    try {
        const docRef = doc(db, NEWS_COLLECTION, id);
        await updateDoc(docRef, updatedItem);
    } catch (error) {
        console.error("Error updating news:", error);
        throw error;
    }
};

export const deleteNewsItem = async (id) => {
    try {
        await deleteDoc(doc(db, NEWS_COLLECTION, id));
    } catch (error) {
        console.error("Error deleting news:", error);
        throw error;
    }
};

// Events
export const getEvents = async () => {
    try {
        const q = query(collection(db, EVENTS_COLLECTION), orderBy("date", "asc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting events:", error);
        return [];
    }
};

export const addEvent = async (item) => {
    try {
        const docRef = await addDoc(collection(db, EVENTS_COLLECTION), item);
        return { id: docRef.id, ...item };
    } catch (error) {
        console.error("Error adding event:", error);
        throw error;
    }
};

export const updateEvent = async (id, updatedItem) => {
    try {
        const docRef = doc(db, EVENTS_COLLECTION, id);
        await updateDoc(docRef, updatedItem);
    } catch (error) {
        console.error("Error updating event:", error);
        throw error;
    }
};

export const deleteEvent = async (id) => {
    try {
        await deleteDoc(doc(db, EVENTS_COLLECTION, id));
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error;
    }
};

// Prayer Requests
export const addPrayerRequest = async (request) => {
    try {
        const docRef = await addDoc(collection(db, PRAYERS_COLLECTION), {
            ...request,
            status: 'pending',
            createdAt: new Date().toISOString()
        });
        return { id: docRef.id, ...request };
    } catch (error) {
        console.error("Error adding prayer request:", error);
        throw error;
    }
};

export const getPrayerRequests = async () => {
    try {
        const q = query(collection(db, PRAYERS_COLLECTION), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting prayer requests:", error);
        return [];
    }
};

export const deletePrayerRequest = async (id) => {
    try {
        await deleteDoc(doc(db, PRAYERS_COLLECTION, id));
    } catch (error) {
        console.error("Error deleting prayer request:", error);
        throw error;
    }
};

// Multimedia
export const getMultimedia = async () => {
    try {
        const q = query(collection(db, MULTIMEDIA_COLLECTION), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting multimedia:", error);
        return [];
    }
};

export const addMultimediaItem = async (item) => {
    try {
        const docRef = await addDoc(collection(db, MULTIMEDIA_COLLECTION), {
            ...item,
            createdAt: new Date().toISOString()
        });
        return { id: docRef.id, ...item };
    } catch (error) {
        console.error("Error adding multimedia item:", error);
        throw error;
    }
};

export const deleteMultimediaItem = async (id) => {
    try {
        await deleteDoc(doc(db, MULTIMEDIA_COLLECTION, id));
    } catch (error) {
        console.error("Error deleting multimedia item:", error);
        throw error;
    }
};

// Pages CMS
export const getPages = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, PAGES_COLLECTION));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting pages:", error);
        return [];
    }
};

export const getPageBySlug = async (slug) => {
    try {
        const docRef = doc(db, PAGES_COLLECTION, slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (error) {
        console.error("Error getting page:", error);
        return null;
    }
};

export const savePage = async (slug, content) => {
    try {
        await setDoc(doc(db, PAGES_COLLECTION, slug), {
            content,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error saving page:", error);
        throw error;
    }
};
