import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart, Users, Calendar, Newspaper, Radio, Clock, MapPin } from "lucide-react";
import { HeroCarousel } from "@/components/public/HeroCarousel";

export const revalidate = 0;

async function getLatestPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
    if (error) console.error('Error fetching latest posts:', error);
    return data || [];
}

async function getLatestEvents() {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
        .limit(2);
    if (error) console.error('Error fetching latest events:', error);
    return data || [];
}





async function getHomeBanners() {
    const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'home_banner')
        .single();

    if (!data?.value) {
        return [{
            title: "Grupo Rainha da Paz",
            subtitle: "Um encontro de amor com o Espírito Santo em Sinop.",
            image_url: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop",
            button1_text: "Conheça nossa História",
            button1_link: "/quem-somos",
            button2_text: "Pedido de Oração",
            button2_link: "/contato#pedido-oracao"
        }];
    }

    return Array.isArray(data.value) ? data.value : [data.value];
}

export default async function HomePage() {
    const [latestPosts, latestEvents, banners] = await Promise.all([
        getLatestPosts(),
        getLatestEvents(),
        getHomeBanners()
    ]);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <HeroCarousel banners={banners} />

            {/* Latest News */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold text-brand-blue italic">Últimas Notícias</h2>
                        <div className="w-24 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {latestPosts.length > 0 ? (
                            latestPosts.map((post) => (
                                <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-2xl transition-all duration-500 flex flex-col">
                                    <Link href={`/blog/${post.slug || post.id}`}>
                                        <div className="h-56 bg-gray-200 relative overflow-hidden">
                                            <img
                                                src={post.image_url || "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000"}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>
                                    </Link>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="w-2 h-2 rounded-full bg-brand-gold" />
                                            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">{post.category || 'Notícia'}</span>
                                        </div>
                                        <Link href={`/blog/${post.slug || post.id}`}>
                                            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-brand-blue transition-colors mb-4">
                                                {post.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-500 text-sm line-clamp-3 mb-6">
                                            {post.excerpt || (post.content && post.content.substring(0, 100)) || 'Leia mais sobre esta notícia...'}
                                        </p>
                                        <Link href={`/blog/${post.slug || post.id}`} className="mt-auto flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-gold transition-colors group/link">
                                            Ler notícia completa
                                            <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                                <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-400 italic">Nenhuma notícia encontrada no momento.</p>
                            </div>
                        )}
                    </div>

                    <Link href="/blog" className="mt-16 inline-block">
                        <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-10 rounded-2xl h-14 font-bold transition-all">
                            Acessar Todas as Notícias
                        </Button>
                    </Link>
                </div>
            </section>





            {/* Upcoming Events */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-brand-blue italic underline decoration-brand-gold decoration-4 underline-offset-8">Próximos Eventos</h2>
                    </div>

                    <div className="space-y-8">
                        {latestEvents.length > 0 ? (
                            latestEvents.map((event: any) => (
                                <div key={event.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row hover:shadow-xl transition-all duration-500 group">
                                    <div className="bg-brand-blue md:w-40 p-10 flex flex-col items-center justify-center text-white text-center group-hover:bg-brand-gold transition-colors duration-500">
                                        <Calendar className="w-8 h-8 mb-3 opacity-80" />
                                        <span className="text-xl font-black uppercase tracking-tighter">
                                            {event.date.includes('-')
                                                ? new Date(event.date + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
                                                : event.date.split(',')[0]}
                                        </span>
                                    </div>
                                    <div className="flex-1 p-8 space-y-4">
                                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-brand-blue transition-colors">{event.title}</h3>
                                        <div className="flex flex-wrap gap-6 text-sm">
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Clock className="w-5 h-5 text-brand-gold" />
                                                <span className="font-medium">{event.time || "Horário a confirmar"}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <MapPin className="w-5 h-5 text-brand-gold" />
                                                <span className="font-medium line-clamp-1">{event.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 flex items-center justify-center bg-gray-50/50">
                                        <Link href="/eventos">
                                            <Button className="rounded-xl border-none bg-brand-blue/5 text-brand-blue hover:bg-brand-blue hover:text-white transition-all font-bold px-6 h-12">
                                                Saber Mais
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
                                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-400 italic font-medium">Fique atento! Novas programações em breve.</p>
                            </div>
                        )}
                        <div className="text-center mt-16">
                            <Link href="/eventos">
                                <Button className="bg-brand-blue text-white px-10 h-14 rounded-2xl shadow-lg hover:shadow-brand-blue/20 transition-all font-bold">
                                    Visualizar Calendário Completo
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
