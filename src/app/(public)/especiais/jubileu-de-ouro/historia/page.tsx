import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, History, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
    title: "Nossa História - Jubilee de Ouro | Rainha da Paz",
    description: "Conheça a trajetória de 50 anos do Grupo de Oração Rainha da Paz em Sinop.",
};

export const revalidate = 0; // Force dynamic rendering

async function getJubileuSettings() {
    const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'jubileu_settings')
        .single();

    return data?.value || null;
}

export default async function HistoryPage() {
    const settings = await getJubileuSettings();

    // Ensure we have a valid timeline array, falling back if empty or missing
    const hasTimeline = settings?.history?.timeline && Array.isArray(settings.history.timeline) && settings.history.timeline.length > 0;

    if (!hasTimeline) {
        console.warn("Jubileu History: Timeline not found or empty in settings. Using fallback data.");
    }

    const timelineData = hasTimeline ? settings.history.timeline : [
        {
            year: "1976",
            title: "O Início",
            description: "Um pequeno grupo de amigos se reúne para rezar o terço e compartilhar a Palavra, dando início à semente do que viria a ser o Rainha da Paz.",
            image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1000"
        },
        {
            year: "1985",
            title: "Crescimento e Missão",
            description: "O grupo expande sua atuação, iniciando as primeiras missões em bairros e cidades vizinhas, fortalecendo a espiritualidade carismática.",
            image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000"
        }
    ];

    const historyInfo = settings?.history || {
        title: "Nossa História",
        description: "Meio século de milagres, amizades e evangelização em Sinop.",
        image_url: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2000"
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header */}
            <header className="bg-brand-blue py-20 text-white relative h-[50vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-cover bg-center group-hover:scale-105 transition-transform duration-[3s]" style={{ backgroundImage: `url('${historyInfo.image_url}')` }} />
                <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
                    <Link href="/especiais/jubileu-de-ouro" className="flex items-center gap-2 text-brand-gold font-bold mb-8 hover:translate-x-[-4px] transition-transform">
                        <ArrowLeft className="w-5 h-5" />
                        Voltar para o Jubileu
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-bold italic text-brand-gold mb-6">{historyInfo.title}</h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-2xl leading-relaxed">
                        {historyInfo.description}
                    </p>
                </div>
            </header>

            {/* Introduction */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <History className="w-16 h-16 text-brand-gold mx-auto mb-8 opacity-20" />
                    <p className="text-2xl text-brand-blue font-serif italic leading-relaxed text-gray-600">
                        "Recordar o passado é agradecer a Deus por cada passo dado. Ao longo destes 50 anos, o Grupo Rainha da Paz tem sido um farol de esperança e renovação espiritual para milhares de famílias."
                    </p>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 bg-slate-50 relative">
                {/* Center Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-gold/20 hidden md:block" />

                <div className="max-w-7xl mx-auto px-4 space-y-24 md:space-y-48">
                    {timelineData.map((item: any, index: number) => (
                        <div key={item.year + index} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                            {/* Text Content */}
                            <div className="flex-1 space-y-6 text-center md:text-left">
                                <span className="text-7xl font-black text-brand-blue/5 block">{item.year}</span>
                                <div className="inline-flex items-center justify-center p-3 bg-brand-gold/10 rounded-2xl text-brand-gold mb-4">
                                    <Sparkles className="w-8 h-8" />
                                </div>
                                <h2 className="text-4xl font-bold text-brand-blue italic">{item.title}</h2>
                                <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                                    {item.description}
                                </p>
                            </div>

                            {/* Center Point */}
                            <div className="hidden md:flex w-12 h-12 rounded-full bg-white border-4 border-brand-gold z-10 items-center justify-center shadow-lg">
                                <div className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                            </div>

                            {/* Image Content */}
                            <div className="flex-1 w-full">
                                <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final Message */}
            <section className="py-32 bg-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-brand-blue mb-8 italic">O amanhã começa hoje</h2>
                    <p className="text-lg text-gray-600 mb-12">
                        Esta história não termina aqui. Cada pessoa que se junta a nós em oração se torna parte fundamental deste mosaico de fé. Que venham os próximos 50 anos!
                    </p>
                    <Link href="/contato">
                        <button className="bg-brand-blue text-white font-bold px-12 py-5 rounded-full hover:scale-105 transition-all shadow-2xl">
                            Faça parte desta história
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
