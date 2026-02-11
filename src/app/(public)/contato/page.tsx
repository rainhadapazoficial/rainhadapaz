"use client";

import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

export default function ContatoPage() {
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
                            <h2 className="text-4xl font-bold text-brand-blue font-serif italic mb-6">Nossa Sede em Sinop</h2>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                                Nossa sede oficial e administrativa está localizada na Matriz da Paróquia Santo Antônio. Atendemos você com alegria em nossos canais abaixo.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:border-brand-gold transition-colors text-center">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-blue shadow-sm mb-6 mx-auto group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                    <MapPin className="w-7 h-7" />
                                </div>
                                <h4 className="font-bold text-brand-blue text-xl mb-2">Localização</h4>
                                <p className="text-gray-600 italic">Av. das Palmeiras, 2697 – Jardim Imperial <br /> Sinop – MT, CEP: 78555-020</p>
                            </div>

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

                            <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:border-brand-gold transition-colors text-center">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-blue shadow-sm mb-6 mx-auto group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                    <Instagram className="w-7 h-7" />
                                </div>
                                <h4 className="font-bold text-brand-blue text-xl mb-2">Instagram</h4>
                                <p className="text-gray-600 italic">@rccdiocesedesinop</p>
                            </div>
                        </div>

                        {/* Google Maps Embed */}
                        <div className="space-y-6">
                            <div className="h-96 bg-gray-100 rounded-[3rem] overflow-hidden shadow-xl border border-gray-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.9!2d-55.5!3d-11.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x933939633e08f513%3A0xe5a2d61036f0436a!2sMatriz%20da%20Par%C3%B3quia%20Santo%20Ant%C3%B4nio!5e0!3m2!1spt-BR!2sbr!4v1"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                            <div className="text-center">
                                <a
                                    href="https://share.google/Rhja3jn19AngNkV4P"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-brand-blue text-white px-8 py-3 rounded-full hover:bg-brand-blue/90 font-bold transition-all transform hover:scale-105 shadow-lg"
                                >
                                    <MapPin className="w-5 h-5 text-brand-gold" /> Abrir no Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
