import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
    title: "Blog e Notícias | Rainha da Paz Sinop",
    description: "Acompanhe as últimas notícias, formações e eventos do Grupo de Oração Rainha da Paz em Sinop.",
};

export const revalidate = 60; // Revalidate every minute

async function getPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
    return data || [];
}

export default async function BlogPage() {
    const posts = await getPosts();

    const displayPosts = posts;

    return (
        <div className="flex flex-col">
            {/* Header */}
            <section className="bg-brand-blue py-20 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-6 italic text-brand-gold">Blog e Notícias</h1>
                    <p className="text-xl text-blue-100">
                        Acompanhe as últimas notícias, formações e eventos do nosso grupo.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                        <h2 className="text-3xl font-bold text-brand-blue">Postagens Recentes</h2>
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar notícias..."
                                className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-brand-blue outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayPosts.map((post: any) => (
                            <article key={post.id} className="bg-white rounded-2xl overflow-hidden border shadow-sm group hover:shadow-xl transition-all duration-300">
                                <Link href={`/blog/${post.slug || post.id}`}>
                                    <div className="h-56 bg-gray-200 relative overflow-hidden">
                                        <img
                                            src={post.image_url || post.image || "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000"}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 bg-brand-gold text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">
                                            {post.category || "Geral"}
                                        </div>
                                    </div>
                                </Link>
                                <div className="p-8">
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date ? new Date(post.date + "T12:00:00").toLocaleDateString('pt-BR') : new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
                                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author || "Grupo Rainha da Paz"}</span>
                                    </div>
                                    <Link href={`/blog/${post.slug || post.id}`}>
                                        <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-brand-blue transition-colors">
                                            {post.title}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                        {post.excerpt || post.content?.substring(0, 150) + "..."}
                                    </p>
                                    <Link href={`/blog/${post.slug || post.id}`} className="text-brand-blue font-bold flex items-center gap-2 group/btn">
                                        Ler Mais
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Button size="lg" className="bg-brand-blue text-white px-10">
                            Carregar mais postagens
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
