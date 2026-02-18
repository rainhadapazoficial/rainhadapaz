import Link from "next/link";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { Calendar, User, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Jubileu de Ouro | Rainha da Paz Sinop",
    description: "Celebrando 50 anos de caminhada, fé e missão do Grupo de Oração Rainha da Paz.",
};

export const revalidate = 60; // Revalidate every minute

async function getJubileuPosts() {
    // 1. Find category ID for 'jubileu-de-ouro'
    const { data: cat } = await supabase
        .from('post_categories')
        .select('id')
        .eq('slug', 'jubileu-de-ouro')
        .single();

    if (!cat) return [];

    // 2. Fetch posts filtered by category_id
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category_id', cat.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching jubileu posts:", error);
        return [];
    }
    return data || [];
}

export default async function JubileuPage() {
    const posts = await getJubileuPosts();

    return (
        <div className="flex flex-col min-h-screen">
            {/* Unique Header for Jubileu */}
            <section className="bg-brand-blue py-32 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.rccdesinop.com.br/wp-content/uploads/2025/06/Renocacao-Carismatica-cartolica-fundo.png')] bg-cover bg-center" />
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="bg-brand-gold/20 p-4 rounded-full backdrop-blur-sm border border-brand-gold/30">
                            <Sparkles className="w-12 h-12 text-brand-gold" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 italic text-brand-gold">Jubileu de Ouro</h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        50 anos de Graça, Pentecostes e Missão. Acompanhe a nossa história e as celebrações deste ano especial.
                    </p>
                </div>
            </section>

            {/* Content Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    {posts.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
                            <Sparkles className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-brand-blue mb-2">Em breve mais conteúdos</h2>
                            <p className="text-gray-500">Estamos preparando materiais especiais para esta celebração.</p>
                            <Link href="/blog" className="mt-8 inline-block text-brand-blue font-bold"> Ver todas as notícias</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post: any) => (
                                <article key={post.id} className="bg-white rounded-[2.5rem] overflow-hidden border shadow-sm group hover:shadow-2xl transition-all duration-500">
                                    <Link href={`/blog/${post.slug || post.id}`}>
                                        <div className="h-64 bg-gray-200 relative overflow-hidden">
                                            <img
                                                src={post.image_url || "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000"}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                                            />
                                            <div className="absolute top-6 left-6 bg-brand-gold text-white text-[10px] font-bold uppercase px-4 py-2 rounded-full shadow-lg">
                                                Jubileu 50 Anos
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="p-10">
                                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-6 font-bold uppercase tracking-widest">
                                            <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-brand-gold" /> {post.date || new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                        <Link href={`/blog/${post.slug || post.id}`}>
                                            <h3 className="text-2xl font-bold text-brand-blue leading-tight mb-4 group-hover:text-brand-gold transition-colors italic">
                                                {post.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-600 text-sm mb-8 line-clamp-3 leading-relaxed">
                                            {post.excerpt || post.content?.substring(0, 150).replace(/<[^>]*>?/gm, '') + "..."}
                                        </p>
                                        <Link href={`/blog/${post.slug || post.id}`} className="text-brand-blue font-bold flex items-center gap-2 group/btn">
                                            Ler Matéria Completa
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-brand-gold text-brand-blue">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6 italic">Faça parte desta história</h2>
                    <p className="text-xl mb-10 opacity-80">
                        O Jubileu de Ouro é um tempo de gratidão. Se você tem fotos antigas ou depoimentos do grupo, entre em contato conosco!
                    </p>
                    <Link href="/contato">
                        <button className="bg-brand-blue text-white font-bold px-12 py-4 rounded-full hover:scale-105 transition-all shadow-xl">
                            Enviar meu depoimento
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
