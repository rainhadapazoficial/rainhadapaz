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
