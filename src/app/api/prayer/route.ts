import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";
import { triggerN8NWebhook } from "@/lib/n8n";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        // 1. Basic Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Campos obrigatórios ausentes" },
                { status: 400 }
            );
        }

        // 2. Save to Supabase
        const { data, error: supabaseError } = await supabase
            .from("prayer_requests")
            .insert([
                {
                    name,
                    email,
                    phone: phone || null,
                    message,
                    created_at: new Date().toISOString()
                },
            ])
            .select();

        if (supabaseError) {
            console.error("Supabase Error:", supabaseError);
            return NextResponse.json(
                { error: "Erro ao salvar no banco de dados" },
                { status: 500 }
            );
        }

        // 2.5 Trigger n8n webhook
        triggerN8NWebhook('prayer_request', {
            name,
            email,
            phone,
            message
        });

        // 3. Send Email via SMTP
        // Configuration from environment variables
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "mail.rccdesinop.com.br",
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true, // SSL
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"Grupo Rainha da Paz - Site" <${process.env.SMTP_USER}>`,
            to: "rainhadapazsinop@rccdesinop.com.br",
            replyTo: email,
            subject: `🙏 Novo Pedido de Oração: ${name}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #004d2c; padding: 20px; text-align: center;">
            <h1 style="color: #d4af37; margin: 0; font-style: italic;">Grupo Rainha da Paz</h1>
          </div>
          <div style="padding: 30px; color: #333;">
            <h2 style="color: #004d2c; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Pedido de Intercessão</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone || "Não informado"}</p>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #d4af37;">
              <p style="margin: 0; font-style: italic;">"${message}"</p>
            </div>
            <p style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
              Este é um e-mail automático enviado pelo site oficial do Grupo Rainha da Paz.
            </p>
          </div>
        </div>
      `,
        };

        // Only send email if SMTP is configured
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            await transporter.sendMail(mailOptions);
        } else {
            console.warn("SMTP credentials not found. Skipping email delivery.");
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}
