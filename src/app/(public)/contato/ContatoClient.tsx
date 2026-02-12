"use client";

import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

export default function ContatoClient() {
    return (
        <div className="flex flex-col">
            {/* Header */}
            <section className="bg-brand-blue py-24 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000')] opacity-10 bg-cover bg-center" />
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h1 className="text-6xl font-bold mb-6 italic text-brand-gold">Contato</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Estamos aqui para ouvir você. Entre em contato pelos nossos canais oficiais ou venha nos visitar.
                    </p>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="space-y-12">
                        <div className="text-center">
                            <div className="inline-block px-4 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-bold uppercase tracking-widest mb-4">
                                Fale Conosco
                            </div>
                            <h2 className="text-4xl font-bold text-brand-blue font-serif italic mb-6">Canais de Atendimento</h2>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                                A Renovação Carismática Católica está presente em toda a Diocese de Sinop, levando a Cultura de Pentecostes às nossas paróquias e comunidades. Atendemos você com alegria através dos nossos canais oficiais abaixo.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:border-brand-gold transition-colors text-center">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-blue shadow-sm mb-6 mx-auto group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                    <Phone className="w-7 h-7" />
                                </div>
                                <h4 className="font-bold text-brand-blue text-xl mb-2">WhatsApp</h4>
                                <a href="https://wa.me/5566992324636" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-bold text-lg hover:text-brand-gold transition-colors underline decoration-brand-gold/30">
                                    (66) 99232-4636
                                </a>
                            </div>

                            <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:border-brand-gold transition-colors text-center">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-blue shadow-sm mb-6 mx-auto group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                    <Mail className="w-7 h-7" />
                                </div>
                                <h4 className="font-bold text-brand-blue text-xl mb-2">E-mail</h4>
                                <p className="text-brand-blue font-bold">coordenacao@rccdesinop.com.br</p>
                            </div>

                            <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:border-brand-gold transition-colors text-center sm:col-span-2">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-blue shadow-sm mb-6 mx-auto group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                    <Instagram className="w-7 h-7" />
                                </div>
                                <h4 className="font-bold text-brand-blue text-xl mb-2">Instagram</h4>
                                <p className="text-gray-600 italic">@rccdiocesedesinop</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
