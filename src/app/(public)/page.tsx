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

async function getLatestGroups() {
    const { data } = await supabase
        .from('groups')
        .select('id, nome, cidade, dia, local, slug')
        .order('created_at', { ascending: false })
        .limit(3);
    return data || [];
}

async function getLatestMinistries() {
    const { data } = await supabase
        .from('ministerios')
        .select('id, nome, descricao, coordenador, slug, cor')
        .order('ordem', { ascending: true })
        .limit(3);
    return data || [];
}

async function getHomeBanner() {
    const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'home_banner')
        .single();

    return data?.value || {
        title: "RCC Diocese de Sinop",
        subtitle: "Um encontro de amor com o Espírito Santo em Sinop",
        image_url: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop",
        button1_text: "Conheça nossa História",
        button1_link: "/quem-somos",
        button2_text: "Ver Programação",
        button2_link: "/eventos"
    };
}

export default async function HomePage() {
    const [latestPosts, latestEvents, latestGroups, latestMinistries, banner] = await Promise.all([
        getLatestPosts(),
        getLatestEvents(),
        getLatestGroups(),
        getLatestMinistries(),
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
                        {latestPosts.length > 0 ? (
                            latestPosts.map((post) => (
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
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-12 text-gray-400 italic">
                                Nenhuma notícia encontrada no momento.
                            </div>
                        )}
                    </div>
                    <Link href="/blog" className="mt-16 inline-block">
                        <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 h-12">
                            Ver todas as postagens
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Grupos de Oração Section */}
            <section className="py-24 bg-gray-50 text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-4 text-brand-blue italic">Grupos de Oração</h2>
                    <p className="text-gray-600 mb-16 max-w-2xl mx-auto">Encontre um Grupo de Oração mais próximo de você e vivencie Pentecostes!</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {latestGroups.length > 0 ? (
                            latestGroups.map((group) => (
                                <div key={group.id} className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-500">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                            <Users className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-brand-blue italic leading-tight">{group.nome}</h3>
                                            <p className="text-brand-gold font-bold flex items-center gap-1 uppercase tracking-widest text-[10px]">
                                                <MapPin className="w-3 h-3" /> {group.cidade}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-3 mb-8 text-gray-600 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-brand-gold" />
                                            <span>{group.dia}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-brand-gold" />
                                            <span className="line-clamp-1">{group.local}</span>
                                        </div>
                                    </div>
                                    <Link href="/grupos" className="w-full">
                                        <Button className="w-full rounded-2xl bg-brand-blue/5 text-brand-blue hover:bg-brand-blue hover:text-white transition-all font-bold">
                                            Ver Detalhes
                                        </Button>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 py-12 text-gray-400 italic">Nenhum grupo cadastrado.</div>
                        )}
                    </div>

                    <Link href="/grupos" className="mt-16 inline-block">
                        <Button size="lg" className="bg-brand-blue text-white px-10 rounded-full h-14 shadow-lg hover:scale-105 transition-all">
                            Encontrar mais Grupos
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Ministérios Section */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-4 text-brand-blue italic">Nossos Ministérios</h2>
                    <p className="text-gray-600 mb-16 max-w-2xl mx-auto">Conheça os diversos campos de missão onde servimos com amor.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {latestMinistries.length > 0 ? (
                            latestMinistries.map((min) => (
                                <div key={min.id} className="bg-white p-8 rounded-[3.5rem] shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-500 flex flex-col">
                                    <div className={`w-14 h-14 rounded-2xl mb-6 ${min.cor || 'bg-brand-blue/5 text-brand-blue'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <Heart className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-brand-blue mb-4 italic">{min.nome}</h3>
                                    <p className="text-gray-500 text-sm italic mb-8 flex-1 line-clamp-3">"{min.descricao}"</p>
                                    <div className="pt-6 border-t flex items-center justify-between">
                                        <div className="text-left">
                                            <p className="text-[10px] uppercase font-bold text-gray-400">Coordenador</p>
                                            <p className="font-bold text-brand-blue text-sm">{min.coordenador || 'A definir'}</p>
                                        </div>
                                        <Link href="/ministerios">
                                            <Button variant="ghost" size="sm" className="text-brand-gold font-bold group-hover:translate-x-1 transition-transform">
                                                <ChevronRight className="w-5 h-5" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 py-12 text-gray-400 italic">Nenhum ministério cadastrado.</div>
                        )}
                    </div>

                    <Link href="/ministerios" className="mt-16 inline-block">
                        <Button variant="outline" className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white px-10 rounded-full h-14 font-bold transition-all">
                            Ver Todos os Ministérios
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
                    <div className="bg-gray-50 p-10 rounded-3xl flex items-start gap-6 group hover:shadow-lg transition-all mx-auto max-w-2xl">
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
            </section>
        </div>
    );
}
