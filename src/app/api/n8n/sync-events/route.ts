import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    const authHeader = request.headers.get("Authorization");

    // Simples verificação de segurança (Bearer Token coincide com a nossa Key)
    if (authHeader !== `Bearer ${process.env.N8N_API_KEY}`) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, date, time, location, description, category, image_url } = body;

        if (!title || !date) {
            return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("events")
            .insert([{
                title,
                date,
                time,
                location,
                description,
                category,
                image_url,
                created_at: new Date().toISOString()
            }]);

        if (error) throw error;

        return NextResponse.json({ success: true, message: "Evento sincronizado com sucesso!" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
