import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import PageClient from "./PageClient";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
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
