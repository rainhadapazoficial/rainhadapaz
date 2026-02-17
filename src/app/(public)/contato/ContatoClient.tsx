"use client";

import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

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
                                O Grupo de Oração Rainha da Paz se reúne na Matriz da Paróquia Santo Antônio, em Sinop. Venha nos visitar ou entre em contato pelos nossos canais oficiais abaixo.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:border-brand-gold transition-colors text-center">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-blue shadow-sm mb-6 mx-auto group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                    <Phone className="w-7 h-7" />
                                </div>
                                <h4 className="font-bold text-brand-blue text-xl mb-2">WhatsApp</h4>
                                <a href="https://wa.me/5566981365456" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-bold text-lg hover:text-brand-gold transition-colors underline decoration-brand-gold/30">
                                    (66) 98136-5456
                                </a>
                            </div>

                            <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:border-brand-gold transition-colors text-center">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-blue shadow-sm mb-6 mx-auto group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                    <Mail className="w-7 h-7" />
                                </div>
                                <h4 className="font-bold text-brand-blue text-xl mb-2">E-mail</h4>
                                <p className="text-brand-blue font-bold">rainhadapazsinop@rccdesinop.com.br</p>
                            </div>

                            <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:border-brand-gold transition-colors text-center sm:col-span-2">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-blue shadow-sm mb-6 mx-auto group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                    <MapPin className="w-7 h-7" />
                                </div>
                                <h4 className="font-bold text-brand-blue text-xl mb-2">Nossa Sede</h4>
                                <p className="text-gray-600 mb-2">Matriz da Paróquia Santo Antônio</p>
                                <p className="text-gray-600 font-medium">Av. das Sibipirunas, 3092 - Centro, Sinop – MT</p>
                            </div>

                            <div className="p-8 bg-gradient-to-br from-pink-50 to-orange-50 rounded-[2.5rem] border border-orange-100 group hover:scale-[1.02] transition-all text-center">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm mb-6 mx-auto group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                    <Instagram className="w-7 h-7" />
                                </div>
                                <h4 className="font-bold text-gray-800 text-xl mb-2">Instagram</h4>
                                <a href="https://instagram.com/rainhadapazsinop" target="_blank" rel="noopener noreferrer" className="text-gray-600 italic hover:text-brand-blue transition-colors block">
                                    @rainhadapazsinop
                                </a>
                            </div>

                            <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2.5rem] border border-blue-100 group hover:scale-[1.02] transition-all text-center">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-6 mx-auto group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Facebook className="w-7 h-7" />
                                </div>
                                <h4 className="font-bold text-gray-800 text-xl mb-2">Facebook</h4>
                                <a href="http://facebook.com/rainhadapazsinop" target="_blank" rel="noopener noreferrer" className="text-gray-600 italic hover:text-brand-blue transition-colors block">
                                    rainhadapazsinop
                                </a>
                            </div>

                            <div className="p-8 bg-gradient-to-br from-red-50 to-rose-50 rounded-[2.5rem] border border-red-100 group hover:scale-[1.02] transition-all text-center sm:col-span-2">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm mb-6 mx-auto group-hover:bg-red-600 group-hover:text-white transition-colors">
                                    <Youtube className="w-7 h-7" />
                                </div>
                                <h4 className="font-bold text-gray-800 text-xl mb-2">YouTube</h4>
                                <a href="https://www.youtube.com/@rainhadapazsinop" target="_blank" rel="noopener noreferrer" className="text-gray-600 italic hover:text-brand-blue transition-colors block">
                                    @rainhadapazsinop
                                </a>
                            </div>
                        </div>

                        {/* Google Maps Embed */}
                        <div className="mt-16 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.3!2d-55.507!3d-11.862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAv.%20das%20Sibipirunas%2C%203092%20-%20Centro%2C%20Sinop%20-%20MT!5e0!3m2!1spt-BR!2sbr!4v1707765000000"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
