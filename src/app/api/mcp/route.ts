import { NextResponse } from "next/server";
import { mcpServer } from "@/lib/mcpService";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    const authHeader = request.headers.get("Authorization");

    // Verificação de segurança simplificada para o MCP
    if (!process.env.MCP_AUTH_TOKEN || authHeader !== `Bearer ${process.env.MCP_AUTH_TOKEN}`) {
        return NextResponse.json({ error: "Acesso MCP negado." }, { status: 401 });
    }

    try {
        const body = await request.json();

        // O MCP Server espera uma requisição JSON-RPC
        // Aqui simulamos o transporte via HTTP POST
        // Usamos o SDK para processar a mensagem

        // Nota: O SDK do MCP geralmente é usado com stdio ou SSE. 
        // Para Next.js Route Handlers, fazemos o mapeamento manual do request para o server handler.

        // @ts-ignore - Acessando handler interno para dispatch simplificado no Next.js
        const response = await mcpServer.handleRequest(body);

        return NextResponse.json(response);
    } catch (error: any) {
        console.error("MCP Server Error:", error);
        return NextResponse.json({
            jsonrpc: "2.0",
            error: { code: -32603, message: error.message },
            id: null
        }, { status: 500 });
    }
}
