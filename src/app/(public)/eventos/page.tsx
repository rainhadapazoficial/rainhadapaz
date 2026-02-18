import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import FestaCountdown from "@/components/public/festa-countdown";

export const metadata: Metadata = {
    title: "Agenda de Eventos | Igreja Católica Sinop MT",
    description: "Confira o calendário de retiros e encontros do Grupo Rainha da Paz em Sinop e região.",
};

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
            id: 'mock1',
            title: "Seminário de Vida Rainha da Paz",
            description: "Início da nossa caminhada de 8 semanas de Seminário de Vida no Espírito Santo.",
            date: "2026-03-07",
            time: "19:30",
            location: "Matriz da Paróquia Santo Antônio",
            category: "Seminário"
        },
        {
            id: 'mock2',
            title: "Experiência de Oração Rainha da Paz (Dia 1)",
            description: "Um final de semana de profunda imersão e oração.",
            date: "2026-05-09",
            time: "13:30",
            location: "Matriz da Paróquia Santo Antônio",
            category: "Retiro"
        },
    ];

    return (
        <div className="flex flex-col">
            {/* Festa do Rei Jesus Hero - Destaque Principal */}
            <FestaCountdown />

            {/* Header Eventos */}
            <section className="bg-white py-16 text-center border-b">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-6 italic text-brand-blue">Agenda de Eventos</h1>
                    <p className="text-xl text-gray-600">
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

                    {/* Weekly Meetings Information */}
                    <div className="mt-20 p-12 bg-white rounded-[3rem] border-2 border-dashed border-brand-gold/30 text-center">
                        <h2 className="text-3xl font-bold text-brand-blue italic mb-6">Nossos Encontros Semanais</h2>
                        <div className="flex flex-col items-center gap-4">
                            <div className="bg-brand-blue/5 px-8 py-4 rounded-2xl">
                                <p className="text-xl font-bold text-brand-blue">Toda Quarta-feira</p>
                                <p className="text-gray-600 mt-1">Às 19:30 na Matriz da Paróquia Santo Antônio</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
