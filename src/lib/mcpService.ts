import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { supabase } from "./supabase";

export const mcpServer = new Server(
    {
        name: "rainha-da-paz-manager",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
            resources: {},
        },
    }
);

// --- TOOLS DEFINITION ---

mcpServer.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "get_prayer_requests",
                description: "Recupera os pedidos de oração mais recentes do Supabase.",
                inputSchema: {
                    type: "object",
                    properties: {
                        limit: { type: "number", default: 10 }
                    }
                }
            },
            {
                name: "create_blog_post",
                description: "Cria um novo post no blog.",
                inputSchema: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        content: { type: "string" },
                        excerpt: { type: "string" },
                        category: { type: "string" },
                        image_url: { type: "string" }
                    },
                    required: ["title", "content"]
                }
            },
            {
                name: "manage_events",
                description: "Lista os próximos eventos.",
                inputSchema: {
                    type: "object",
                    properties: {
                        limit: { type: "number", default: 5 }
                    }
                }
            },
            {
                name: "get_custom_pages",
                description: "Lista todas as páginas dinâmicas (como Festa do Rei Jesus, História, etc).",
                inputSchema: {
                    type: "object",
                    properties: {}
                }
            },
            {
                name: "get_system_settings",
                description: "Recupera as configurações globais (ex: n8n URL).",
                inputSchema: {
                    type: "object",
                    properties: {}
                }
            }
        ]
    };
});

mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        if (name === "get_prayer_requests") {
            const { data, error } = await supabase
                .from("prayer_requests")
                .select("*")
                .order("created_at", { ascending: false })
                .limit((args?.limit as number) || 10);

            if (error) throw error;
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }

        if (name === "create_blog_post") {
            const { title, content, excerpt, category, image_url } = args as any;
            const slug = title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-").replace(/[^\w-]+/g, "");

            const { data, error } = await supabase
                .from("posts")
                .insert([{
                    title,
                    content,
                    excerpt: excerpt || content.slice(0, 150),
                    category: category || "Geral",
                    image_url: image_url || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3",
                    author: "IA Assistant (MCP)",
                    slug,
                    date: new Date().toLocaleDateString("pt-BR")
                }]);

            if (error) throw error;
            return { content: [{ type: "text", text: `Post "${title}" criado com sucesso!` }] };
        }

        if (name === "manage_events") {
            const { data, error } = await supabase
                .from("events")
                .select("*")
                .order("date", { ascending: true })
                .limit((args?.limit as number) || 5);

            if (error) throw error;
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }

        if (name === "get_custom_pages") {
            const { data, error } = await supabase
                .from("custom_pages")
                .select("id, slug, title, is_published");

            if (error) throw error;
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }

        if (name === "get_system_settings") {
            const { data, error } = await supabase
                .from("system_settings")
                .select("*");

            if (error) throw error;
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }

        throw new Error(`Tool not found: ${name}`);
    } catch (error: any) {
        return {
            isError: true,
            content: [{ type: "text", text: error.message }]
        };
    }
});
