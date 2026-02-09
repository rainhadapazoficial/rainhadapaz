export interface N8NSharePayload {
    title: string;
    excerpt: string;
    url: string;
    image_url: string;
    category: string;
}

const N8N_API_KEY = process.env.N8N_API_KEY;
const N8N_BASE_URL = process.env.N8N_BASE_URL;

export async function shareToSocialMedia(payload: N8NSharePayload) {
    if (!N8N_API_KEY || !N8N_BASE_URL) {
        console.error("n8n configuration missing");
        return { success: false, error: "Configuração do n8n não encontrada." };
    }

    try {
        const response = await fetch(`${N8N_BASE_URL}/webhook/share-social`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${N8N_API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`n8n error: ${response.statusText}`);
        }

        return { success: true };
    } catch (error: any) {
        console.error("Error calling n8n:", error);
        return { success: false, error: error.message };
    }
}
