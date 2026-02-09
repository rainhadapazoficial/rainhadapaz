import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const postsDir = path.join(process.cwd(), "wp-json", "wp", "v2", "posts");

        if (!fs.existsSync(postsDir)) {
            return NextResponse.json({ error: "Posts directory not found" }, { status: 404 });
        }

        const files = fs.readdirSync(postsDir);
        const results = [];

        for (const file of files) {
            const filePath = path.join(postsDir, file);
            if (fs.lstatSync(filePath).isFile()) {
                const content = fs.readFileSync(filePath, "utf-8");
                const postData = JSON.parse(content);

                const mappedData = {
                    title: postData.title?.rendered || "Sem Título",
                    content: postData.content?.rendered || "",
                    excerpt: postData.excerpt?.rendered || "",
                    slug: postData.slug || `post-${postData.id}`,
                    date: postData.date || new Date().toISOString(),
                    image_url: "", // Pode ser refinado se houver mapeamento de mídia
                    author: "Diocese de Sinop",
                    category: "Notícias"
                };

                const { data, error } = await supabase
                    .from("posts")
                    .upsert(mappedData, { onConflict: "slug" });

                if (error) {
                    results.push({ file, status: "error", error: error.message });
                } else {
                    results.push({ file, status: "success" });
                }
            }
        }

        return NextResponse.json({
            message: "Processamento concluído",
            total: files.length,
            details: results
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
