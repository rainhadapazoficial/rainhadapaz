import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import MinistryClientPage from "./MinistryClientPage";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;

    const { data: ministry } = await supabase
        .from("ministerios")
        .select("nome, descricao")
        .eq("id", id)
        .single();

    if (!ministry) return { title: "Ministério | Rainha da Paz" };

    return {
        title: `${ministry.nome} | Rainha da Paz`,
        description: ministry.descricao,
    };
}

export default async function MinistryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data: ministry, error } = await supabase
        .from("ministerios")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !ministry) {
        notFound();
    }

    // Fetch members and history
    const { data: allHistory } = await supabase
        .from("conselho_membros")
        .select(`
            nome, 
            ministerio_id,
            conselho_mandatos (
                id,
                titulo,
                ano_inicio,
                ativo
            )
        `)
        .eq("ministerio_id", id);

    const historyByMin: any[] = [];
    let currentCoordinator = ministry.coordenador;
    let currentBienio = ministry.bienio;

    (allHistory || []).forEach((row: any) => {
        const mandato = row.conselho_mandatos;
        if (!mandato) return;

        historyByMin.push({
            nome: row.nome,
            gestao: mandato.titulo,
            ano: mandato.ano_inicio,
            ativo: mandato.ativo
        });

        if (mandato.ativo) {
            currentCoordinator = row.nome;
            currentBienio = mandato.titulo;
        }
    });

    historyByMin.sort((a, b) => b.ano - a.ano);

    const ministryData = {
        ...ministry,
        coordenador: currentCoordinator,
        bienio: currentBienio,
        history: historyByMin
    };

    return <MinistryClientPage ministry={ministryData} />;
}

export async function generateStaticParams() {
    const { data } = await supabase.from("ministerios").select("id");
    return data?.map((m) => ({ id: m.id.toString() })) || [];
}
