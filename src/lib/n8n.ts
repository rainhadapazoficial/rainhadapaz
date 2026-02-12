import { supabase } from "./supabase";

/**
 * Utilitário para integração com n8n
 * Centraliza todas as chamadas de saída para o n8n
 */

let CACHED_SETTINGS: any = null;
let lastFetch = 0;

async function getSettings() {
    const now = Date.now();
    if (CACHED_SETTINGS && (now - lastFetch < 60000)) return CACHED_SETTINGS;

    const { data } = await supabase.from('system_settings').select('*');
    if (data) {
        CACHED_SETTINGS = data.reduce((acc: any, curr: any) => {
            acc[curr.settings_key] = curr.settings_value;
            return acc;
        }, {});
        lastFetch = now;
    }
    return CACHED_SETTINGS || {};
}

/**
 * Dispara um webhook genérico para o n8n
 */
export async function triggerN8NWebhook(event: string, data: any) {
    const settings = await getSettings();

    const webhookUrl = settings.n8n_webhook_url || process.env.N8N_WEBHOOK_URL || (process.env.N8N_BASE_URL ? `${process.env.N8N_BASE_URL}/webhook/rcc-events` : undefined);
    const apiKey = settings.n8n_api_key || process.env.N8N_API_KEY;

    if (!webhookUrl) {
        console.warn("N8N_WEBHOOK_URL não configurada no painel ou env. Webhook ignorado.");
        return { success: false, error: "URL não configurada" };
    }

    try {
        const payload = {
            event,
            timestamp: new Date().toISOString(),
            data
        };

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
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
