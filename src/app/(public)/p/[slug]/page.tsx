import { supabase } from "@/lib/supabase";
import { notFound, redirect } from "next/navigation";
import PageClient from "./PageClient";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    // Check for redirects
    if (slug === 'modulo-basico') return { title: 'Módulo Básico | Rainha da Paz' };
    if (slug === 'formacao-especifica') return { title: 'Formação Específica | Rainha da Paz' };

    const { data } = await supabase
        .from("custom_pages")
        .select("title")
        .eq("slug", slug)
        .single();

    return {
        title: data ? `${data.title} | Rainha da Paz` : 'Página | Rainha da Paz',
    };
}

export default async function CustomDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Redirect legacy URLs to premium versions
    if (slug === 'modulo-basico') {
        redirect('/formacao/modulo-basico');
    }
    if (slug === 'formacao-especifica') {
        redirect('/formacao/especifica');
    }

    const { data: page, error } = await supabase
        .from("custom_pages")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

    if (error || !page) {
        notFound();
    }

    return <PageClient page={page} />;
}

export async function generateStaticParams() {
    const { data } = await supabase.from("custom_pages").select("slug");
    return data?.map((p) => ({ slug: p.slug })) || [];
}
