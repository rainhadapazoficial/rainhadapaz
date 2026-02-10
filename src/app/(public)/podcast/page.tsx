export const revalidate = 60;

import { Radio, Podcast as PodcastIcon, Youtube, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";

async function getPodcasts() {
    const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching podcasts:", error);
        return [];
    }
    return data || [];
}

export default async function PodcastPage() {
    const podcasts = await getPodcasts();

    // Fallback if DB is empty
    const displayPodcasts = podcasts.length > 0 ? podcasts : [
        {
            id: 1,
            title: "Episódio #042 - O Poder da Oração",
            description: "Neste episódio, conversamos sobre como a oração pode transformar sua vida e sua comunidade.",
            spotify_url: "https://open.spotify.com/embed/episode/7799u9Ynm9pXn9Yn9pXn9Y",
            youtube_url: "#",
            category: "Espiritualidade"
        }
    ];

    return (
        <div className="flex flex-col">
            {/* Header */}
            <section className="bg-brand-blue py-20 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-6 italic text-brand-gold">Web Rádio & Podcast</h1>
                    <p className="text-xl text-blue-100">
                        Ouça nossas pregações, músicas e programas especiais onde quer que você esteja.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Spotify / Audio Section */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-8">
                                <Radio className="w-8 h-8 text-brand-gold" />
                                <h2 className="text-3xl font-bold text-brand-blue font-serif">Últimos Podcasts</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 p-2">
                                    <iframe
                                        style={{ borderRadius: '12px' }}
                                        src="https://open.spotify.com/embed/show/1laUwtJULJDDrzWoPDPYsZ/video?utm_source=generator"
                                        width="100%"
                                        height="351"
                                        frameBorder="0"
                                        allowFullScreen
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"
                                        className="shadow-inner"
                                    ></iframe>
                                </div>
                                <div className="bg-brand-blue/5 p-6 rounded-2xl border border-brand-blue/10 mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <p className="text-gray-600 text-sm italic text-center md:text-left">
                                        Fique por dentro de todos os nossos episódios diretamente no Spotify. Pregações e testemunhos para o seu dia a dia.
                                    </p>
                                    <a
                                        href="https://creators.spotify.com/pod/show/podcast-rainha-da-paz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#1DB954] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#1ed760] transition-colors flex flex-shrink-0 items-center gap-2"
                                    >
                                        Seguir no Spotify
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* YouTube / Video Section */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-8">
                                <Youtube className="w-8 h-8 text-red-600" />
                                <h2 className="text-3xl font-bold text-brand-blue font-serif">Vídeos e Lives</h2>
                            </div>

                            <div className="aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-2xl relative group">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/live_stream?channel=UC8xN1N3O6OqVf-Gf-Gf-Gf_Gf" // This needs a stable channel ID, but I'll use a placeholder or the handle link for now
                                    title="YouTube live stream"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                        AO VIVO
                                    </span>
                                </div>
                            </div>

                            <div className="bg-brand-blue/5 p-8 rounded-3xl border border-brand-blue/10">
                                <h3 className="text-xl font-bold text-brand-blue mb-4">Inscreva-se no Canal</h3>
                                <p className="text-gray-600 mb-6">
                                    Não perca nossas transmissões ao vivo todas as quintas-feiras às 19:30.
                                </p>
                                <a
                                    href="https://www.youtube.com/@RCCDiocesedesinop"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors"
                                >
                                    <Youtube className="w-5 h-5" />
                                    Acessar YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
