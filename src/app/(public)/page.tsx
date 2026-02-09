import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart, Users, Calendar, Newspaper, Radio, Clock, MapPin } from "lucide-react";

export const revalidate = 0;

async function getLatestPosts() {
    const { data } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
    return data || [];
}

async function getLatestEvents() {
    const { data } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
        .limit(2);
    return data || [];
}

async function getHomeBanner() {
    const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'home_banner')
        .single();

    return data?.value || {
        title: "Grupo de Oração Rainha da Paz",
        subtitle: "Um encontro de amor com o Espírito Santo em Sinop",
        image_url: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop",
        button1_text: "Conheça nossa História",
        button1_link: "/quem-somos",
        button2_text: "Ver Programação",
        button2_link: "/eventos"
    };
}

export default async function HomePage() {
    const [latestPosts, latestEvents, banner] = await Promise.all([
        getLatestPosts(),
        getLatestEvents(),
        getHomeBanner()
    ]);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center bg-brand-blue text-white text-center">
                <div className="absolute inset-0 bg-black/40 z-10" />
                {/* Background Image Placeholder */}
                <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url('${banner.image_url}')` }} />

                <div className="relative z-20 max-w-5xl px-4">
                    <h1 className="text-4xl md:text-6xl font-bold italic mb-6 animate-in fade-in slide-in-from-bottom duration-1000">
                        {banner.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto font-medium">
                        {banner.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={banner.button1_link || "/quem-somos"}>
                            <Button size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-white text-lg h-14 px-8">
                                {banner.button1_text}
                            </Button>
                        </Link>
                        <Link href={banner.button2_link || "/eventos"}>
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-brand-blue text-lg h-14 px-8">
                                {banner.button2_text}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Latest News */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-16 text-brand-blue">Últimas Notícias</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {latestPosts.map((post) => (
                            <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm border group hover:shadow-md transition-shadow">
                                <Link href={`/blog/${post.slug || post.id}`}>
                                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                                        <img
                                            src={post.image_url || "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000"}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </Link>
                                <div className="p-6">
                                    <span className="text-xs font-bold text-brand-gold uppercase">{post.category || 'Notícia'}</span>
                                    <Link href={`/blog/${post.slug || post.id}`}>
                                        <h3 className="text-xl font-bold mt-2 h-14 line-clamp-2 group-hover:text-brand-blue transition-colors">
                                            {post.title}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-600 text-sm mt-4 line-clamp-3 h-16">
                                        {post.excerpt || (post.content && post.content.substring(0, 100)) || 'Leia mais sobre esta notícia...'}
                                    </p>
                                    <Link href={`/blog/${post.slug || post.id}`} className="mt-6 block text-sm font-bold text-brand-blue hover:text-brand-gold transition-colors">
                                        Ler notícia completa &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link href="/blog" className="mt-16 inline-block">
                        <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 h-12">
                            Ver todas as postagens
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-brand-blue">Próximos Eventos</h2>
                        <p className="text-gray-600 mt-4">Participe dos nossos encontros e retiros</p>
                    </div>
                    <div className="space-y-6">
                        {latestEvents.length > 0 ? (
                            latestEvents.map((event: any) => (
                                <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border flex flex-col md:flex-row hover:shadow-md transition-all">
                                    <div className="bg-brand-blue md:w-32 p-6 flex flex-col items-center justify-center text-white text-center">
                                        <Calendar className="w-6 h-6 mb-1 text-brand-gold" />
                                        <span className="text-sm font-bold">
                                            {event.date.includes('-')
                                                ? new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
                                                : event.date.split(',')[0]}
                                        </span>
                                    </div>
                                    <div className="flex-1 p-6 space-y-2">
                                        <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4 text-brand-gold" />
                                                <span>{event.time || "A confirmar"}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4 text-brand-gold" />
                                                <span className="line-clamp-1">{event.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 flex items-center">
                                        <Link href="/eventos">
                                            <Button variant="ghost" className="text-brand-blue font-bold">
                                                Detalhes <ChevronRight className="w-4 h-4 ml-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                                <p className="text-gray-500 italic">Nenhum evento programado para breve. Confira nossa agenda completa.</p>
                            </div>
                        )}
                        <div className="text-center mt-12">
                            <Link href="/eventos">
                                <Button className="bg-brand-blue text-white px-8">Ver Agenda Completa</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources/Highlights Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-gray-50 p-10 rounded-3xl flex items-start gap-6 group hover:shadow-lg transition-all">
                            <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                                <Radio className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Último Podcast</h3>
                                <p className="text-gray-600 mb-6">Acompanhe nossas pregações e momentos de formação onde você estiver.</p>
                                <Link href="/podcast" className="text-brand-blue font-bold flex items-center gap-1 hover:underline">
                                    Escutar Agora <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-10 rounded-3xl flex items-start gap-6 group hover:shadow-lg transition-all">
                            <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                                <Newspaper className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Blog da RCC</h3>
                                <p className="text-gray-600 mb-6">Fique por dentro das notícias e formações da RCC Brasil e do nosso grupo.</p>
                                <Link href="/blog" className="text-brand-blue font-bold flex items-center gap-1 hover:underline">
                                    Ler Blog <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prayer Request Section */}
            <section className="bg-brand-blue py-24 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Heart className="w-12 h-12 mx-auto mb-6 fill-brand-gold text-brand-gold" />
                    <h2 className="text-4xl font-bold mb-4">Você precisa de oração?</h2>
                    <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
                        Nossos intercessores estão prontos para rezar por você. Deixe seu pedido e rezaremos em nossos próximos encontros.
                    </p>
                    <Link href="/contato#pedido-oracao">
                        <Button size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-white font-bold px-12 h-16 text-xl shadow-xl shadow-black/20">
                            Fazer Pedido de Oração
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
