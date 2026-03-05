"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Crown, ArrowRight, Flame } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Fallback date if no edition with dates is found in the DB
const FALLBACK_DATE = new Date("2026-11-21T18:00:00");

function getTimeLeft(target: Date) {
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        passed: false,
    };
}

export default function FestaCountdown() {
    const [festaDate, setFestaDate] = useState<Date>(FALLBACK_DATE);
    const [festaYear, setFestaYear] = useState<number>(2026);
    const [timeLeft, setTimeLeft] = useState(getTimeLeft(FALLBACK_DATE));
    const [festaInfo, setFestaInfo] = useState<{ tema?: string; data_inicio?: string; data_fim?: string } | null>(null);

    useEffect(() => {
        async function fetchNextFesta() {
            const currentYear = new Date().getFullYear();
            const { data } = await supabase
                .from("festa_rei_jesus_editions")
                .select("ano, tema, data_inicio, data_fim")
                .gte("ano", currentYear)
                .order("ano", { ascending: true })
                .limit(1);

            if (data && data.length > 0) {
                const edition = data[0];
                setFestaYear(edition.ano);
                setFestaInfo(edition);
                if (edition.data_inicio) {
                    const d = new Date(edition.data_inicio + "T18:00:00");
                    setFestaDate(d);
                    setTimeLeft(getTimeLeft(d));
                }
            }
        }
        fetchNextFesta();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(getTimeLeft(festaDate)), 1000);
        return () => clearInterval(timer);
    }, [festaDate]);

    function formatDateBR(dateStr: string) {
        return new Date(dateStr).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
        });
    }

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-brand-blue to-blue-900">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full translate-x-1/3 translate-y-1/3" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-gold/[0.03] text-[20rem] font-bold select-none">♛</div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24">
                {/* Top badge */}
                <div className="flex justify-center mb-6">
                    <div className="flex items-center gap-2 bg-brand-gold/20 backdrop-blur-sm border border-brand-gold/30 rounded-full px-5 py-2">
                        <Flame className="w-4 h-4 text-brand-gold animate-pulse" />
                        <span className="text-brand-gold text-sm font-bold uppercase tracking-wider">Evento Principal {festaYear}</span>
                        <Flame className="w-4 h-4 text-brand-gold animate-pulse" />
                    </div>
                </div>

                {/* Title */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-br from-brand-gold to-yellow-500 rounded-full p-5 shadow-lg shadow-brand-gold/20">
                            <Crown className="w-12 h-12 text-blue-950" />
                        </div>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-white italic mb-4 drop-shadow-lg">
                        Festa do Rei Jesus
                    </h2>
                    {festaInfo?.tema && (
                        <p className="text-brand-gold text-lg font-bold italic mb-2">&quot;{festaInfo.tema}&quot;</p>
                    )}
                    <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        A maior festa cristã da região norte de Mato Grosso! Conheça o histórico
                        de cada edição com fotos, temas e muito mais.
                    </p>
                    {/* Show dates if available */}
                    {festaInfo?.data_inicio && (
                        <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-white">
                            <span className="font-bold">
                                {formatDateBR(festaInfo.data_inicio)}
                                {festaInfo.data_fim && ` — ${formatDateBR(festaInfo.data_fim)}`}
                            </span>
                        </div>
                    )}
                </div>

                {/* Countdown */}
                {!timeLeft.passed ? (
                    <div className="mb-10">
                        <p className="text-center text-brand-gold text-sm font-bold uppercase tracking-widest mb-4">
                            Contagem regressiva para {festaYear}
                        </p>
                        <div className="flex justify-center gap-3 md:gap-6 flex-wrap">
                            {[
                                { value: timeLeft.days, label: "Dias" },
                                { value: timeLeft.hours, label: "Horas" },
                                { value: timeLeft.minutes, label: "Min" },
                                { value: timeLeft.seconds, label: "Seg" },
                            ].map((item) => (
                                <div key={item.label} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 md:px-8 md:py-6 text-center min-w-[80px] md:min-w-[100px]">
                                    <div className="text-4xl md:text-5xl font-black text-white tabular-nums">
                                        {String(item.value).padStart(2, "0")}
                                    </div>
                                    <div className="text-blue-300 text-xs md:text-sm font-medium uppercase tracking-wider mt-1">
                                        {item.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="mb-10 text-center">
                        <div className="inline-block bg-brand-gold/20 border border-brand-gold/40 rounded-2xl px-8 py-4">
                            <p className="text-brand-gold text-2xl font-bold">🎉 A Festa está acontecendo!</p>
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="flex justify-center gap-4 flex-wrap">
                    <Link href="/festa-rei-jesus">
                        <Button className="bg-brand-gold hover:bg-yellow-400 text-blue-950 font-bold text-lg px-8 py-6 rounded-xl group shadow-lg shadow-brand-gold/20">
                            Ver Histórico Completo
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
