import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, Crown } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Revalidate every minute

async function getEvents() {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

    if (error) {
        console.error("Error fetching events:", error);
        return [];
    }
    return data || [];
}

export default async function EventosPage() {
    const events = await getEvents();

    // Fallback mock data if DB is empty
    const displayEvents = events.length > 0 ? events : [
        {
            id: 1,
            title: "Seminário de Vida no Espírito Santo",
            description: "Um final de semana de profunda experiência com o amor de Deus e os dons do Espírito.",
            date: "15-17 Março, 2024",
            time: "19:00 - 21:00",
            location: "Salão Paroquial - Catedral Sagrado Coração de Jesus",
            category: "Retiro"
        },
        {
            id: 2,
            title: "Noite de Louvor e Adoração",
            description: "Momento de profunda entrega e louvor com a presença do Ministério de Música Diocesano.",
            date: "05 Abril, 2024",
            time: "19:30 - 21:30",
            location: "Centro de Eventos da Diocese",
            category: "Oração"
        },
    ];

    return (
        <div className="flex flex-col">
            {/* Header */}
            <section className="bg-brand-blue py-20 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-6 italic text-brand-gold">Agenda de Eventos</h1>
                    <p className="text-xl text-blue-100">
                        Fique por dentro de todos os encontros e atividades do nosso grupo.
                    </p>
                </div>
            </section>

            {/* Events List */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="space-y-8">
                        {displayEvents.map((event: any) => (
                            <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border flex flex-col md:flex-row hover:shadow-xl transition-all duration-300">
                                <div className="bg-brand-blue md:w-48 p-8 flex flex-col items-center justify-center text-white text-center">
                                    <span className="text-sm font-bold uppercase text-brand-gold mb-2">{event.category || "Evento"}</span>
                                    <CalendarIcon className="w-8 h-8 mb-2" />
                                    <span className="text-lg font-bold leading-tight">
                                        {event.date.includes('-')
                                            ? new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
                                            : event.date.split(',')[0]}
                                    </span>
                                </div>
                                <div className="flex-1 p-8 md:p-12 space-y-4">
                                    <h3 className="text-3xl font-bold text-gray-900">{event.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-brand-gold" />
                                            <span>{event.time || "A confirmar"}</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                    <div className="pt-6">
                                        <Link href={`/eventos/${event.id}`}>
                                            <Button className="bg-brand-blue text-white group">
                                                Mais Informações
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Festa do Rei Jesus Banner */}
            <section className="py-16 bg-gradient-to-r from-brand-blue via-blue-900 to-brand-blue relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-8 text-brand-gold text-9xl font-bold opacity-20">✝</div>
                    <div className="absolute bottom-4 right-8 text-brand-gold text-9xl font-bold opacity-20">♛</div>
                </div>
                <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="flex-shrink-0 bg-brand-gold/20 rounded-full p-6">
                        <Crown className="w-16 h-16 text-brand-gold" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-4xl font-bold text-white italic mb-3">Festa do Rei Jesus</h2>
                        <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                            A maior festa cristã da região norte de Mato Grosso! Conheça o histórico de cada edição com fotos, temas e muito mais.
                        </p>
                    </div>
                    <Link href="/festa-rei-jesus">
                        <Button className="bg-brand-gold hover:bg-yellow-500 text-brand-blue font-bold text-lg px-8 py-6 rounded-xl group whitespace-nowrap">
                            Ver Histórico
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Regular Meetings */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-brand-blue mb-8">Nossos Encontros Semanais</h2>
                    <div className="bg-brand-gold/10 p-12 rounded-3xl border-2 border-dashed border-brand-gold">
                        <h3 className="text-2xl font-bold text-brand-blue mb-4">Toda Quarta-feira</h3>
                        <p className="text-xl text-gray-700">Às 19:30 na Matriz da Paróquia Santo Antônio.</p>
                        <p className="mt-4 text-gray-500 italic">"Esperamos por você com muita alegria!"</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
