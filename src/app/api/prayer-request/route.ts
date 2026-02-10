import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const { name, email, phone, message } = await req.json();

        // 1. Save to Supabase
        const { error: supabaseError } = await supabase
            .from('prayer_requests')
            .insert([
                { name, email, phone, message }
            ]);

        if (supabaseError) {
            console.warn("Supabase save error:", supabaseError);
            // We continue even if DB fails to try sending email
        }

        // 2. Notification via Email (SMTP)
        const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO } = process.env;

        if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
            const transporter = nodemailer.createTransport({
                host: SMTP_HOST,
                port: Number(process.env.SMTP_PORT) || 587,
                secure: Number(process.env.SMTP_PORT) === 465,
                auth: { user: SMTP_USER, pass: SMTP_PASS },
                tls: { rejectUnauthorized: false }
            });

            await transporter.sendMail({
                from: SMTP_FROM || SMTP_USER,
                to: SMTP_TO || SMTP_FROM || SMTP_USER,
                subject: `Novo Pedido de Oração: ${name}`,
                html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
              <h2 style="color: #004d2c;">Novo Pedido de Oração</h2>
              <p><strong>Nome:</strong> ${name}</p>
              <p><strong>E-mail:</strong> ${email}</p>
              <p><strong>Telefone:</strong> ${phone || "Não informado"}</p>
              <hr />
              <h3 style="color: #d4af37;">Intenções:</h3>
              <p style="white-space: pre-wrap; font-size: 1.1em; line-height: 1.6;">${message}</p>
            </div>
          `,
            });
        }

        return NextResponse.json({ message: "Recebido com sucesso" }, { status: 200 });
    } catch (error) {
        console.error("Internal Error:", error);
        return NextResponse.json({ error: "Erro ao processar pedido" }, { status: 500 });
    }
}
