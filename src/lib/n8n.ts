/**
 * Utilitário para integração com n8n
 * Centraliza todas as chamadas de saída para o n8n
 */

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || (process.env.N8N_BASE_URL ? `${process.env.N8N_BASE_URL}/webhook/rcc-events` : undefined);
const N8N_API_KEY = process.env.N8N_API_KEY;

export interface N8NPayload {
    event: string;
    timestamp: string;
    data: any;
}

/**
 * Dispara um webhook genérico para o n8n
 */
export async function triggerN8NWebhook(event: string, data: any) {
    if (!N8N_WEBHOOK_URL) {
        console.warn("N8N_WEBHOOK_URL não configurada. Webhook ignorado.");
        return { success: false, error: "URL não configurada" };
    }

    try {
        const payload: N8NPayload = {
            event,
            timestamp: new Date().toISOString(),
            data
        };

        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${N8N_API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error(`Erro n8n (${event}):`, response.statusText);
            return { success: false, error: response.statusText };
        }

        console.log(`Webhook n8n disparado: ${event}`);
        return { success: true };
    } catch (error: any) {
        console.error(`Falha n8n (${event}):`, error);
        return { success: false, error: error.message };
    }
}

/**
 * Atalho específico para compartilhamento social de notícias
 */
export async function shareToSocialMedia(postData: any) {
    return triggerN8NWebhook('new_post_share', {
        title: postData.title,
        excerpt: postData.excerpt,
        url: postData.url,
        image_url: postData.image_url,
        category: postData.category,
    });
}
