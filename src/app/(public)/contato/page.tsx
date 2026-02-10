"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Heart, Loader2, CheckCircle2, Instagram, Facebook } from "lucide-react";

export default function ContatoPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/prayer", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                setIsSuccess(true);
                (e.target as HTMLFormElement).reset();
            } else {
                alert("Erro ao enviar pedido. Tente novamente mais tarde.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Erro de conexão. Verifique sua internet.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col">
            {/* Header */}
            <section className="bg-brand-blue py-24 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000')] opacity-10 bg-cover bg-center" />
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h1 className="text-6xl font-bold mb-6 italic text-brand-gold">Contato e Oração</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Estamos aqui para ouvir você. Entre em contato ou envie suas intenções para que possamos rezar juntos.
                    </p>
                </div>
            </section>

            {/* Contact & Prayer Request Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Info & Map */}
                    <div className="space-y-12">
                        <div>
                            <div className="inline-block px-4 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-bold uppercase tracking-widest mb-4">
                                Fale Conosco
                            </div>
                            <h2 className="text-4xl font-bold text-brand-blue font-serif italic mb-6">Estamos em Sinop</h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                Nossa sede oficial e administrativa está localizada na Matriz da Paróquia Santo Antônio. Venha nos visitar ou entre em contato pelos canais abaixo.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 group hover:border-brand-gold transition-colors">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-blue shadow-sm mb-4 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-brand-blue text-lg mb-1">Localização</h4>
                                <p className="text-gray-600 text-sm italic">Av. das Palmeiras, 2697 – Jardim Imperial <br /> Sinop – MT, CEP: 78555-020</p>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 group hover:border-brand-gold transition-colors">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-blue shadow-sm mb-4 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-brand-blue text-lg mb-1">Telefone / Whats</h4>
                                <a href="https://wa.me/5566992324636" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:text-brand-gold transition-colors">
                                    (66) 99232-4636 (WhatsApp)
                                </a>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 group hover:border-brand-gold transition-colors">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-blue shadow-sm mb-4 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-brand-blue text-lg mb-1">E-mail</h4>
                                <p className="text-gray-600 text-sm">coordenacao@rccdesinop.com.br</p>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 group hover:border-brand-gold transition-colors">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-blue shadow-sm mb-4 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                    <Instagram className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-brand-blue text-lg mb-1">Redes Sociais</h4>
                                <p className="text-gray-600 text-sm italic">@rccdiocesedesinop</p>
                            </div>
                        </div>

                        {/* Google Maps Embed */}
                        <div className="space-y-4">
                            <div className="h-80 bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-inner border border-gray-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.9!2d-55.5!3d-11.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x933939633e08f513%3A0xe5a2d61036f0436a!2sMatriz%20da%20Par%C3%B3quia%20Santo%20Ant%C3%B4nio!5e0!3m2!1spt-BR!2sbr!4v1"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                            <a
                                href="https://share.google/Rhja3jn19AngNkV4P"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-brand-gold hover:underline font-bold text-sm"
                            >
                                <MapPin className="w-4 h-4" /> Ver no Google Maps
                            </a>
                        </div>
                    </div>

                    {/* Prayer Request Form */}
                    <div id="pedido-oracao" className="scroll-mt-28">
                        <Card className="shadow-2xl border-none overflow-hidden rounded-[3rem]">
                            <CardHeader className="bg-brand-blue text-white p-12 text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-brand-gold/5" />
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mb-6">
                                        <Heart className="w-10 h-10 text-brand-gold fill-brand-gold" />
                                    </div>
                                    <CardTitle className="text-4xl font-bold italic text-brand-gold mb-2">Pedido de Oração</CardTitle>
                                    <CardDescription className="text-blue-100 text-lg max-w-sm">
                                        Intercederemos por suas intenções em nossos próximos encontros.
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="p-12">
                                {isSuccess ? (
                                    <div className="py-12 text-center space-y-6 animate-in zoom-in duration-500">
                                        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                                            <CheckCircle2 className="w-12 h-12" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-3xl font-bold text-brand-blue italic">Pedido Recebido!</h3>
                                            <p className="text-gray-600 px-8 text-lg italic">"A oração é a força que move o coração de Deus."</p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="border-brand-gold text-brand-gold hover:bg-brand-gold/10 rounded-full px-12 h-12 mt-8"
                                            onClick={() => setIsSuccess(false)}
                                        >
                                            Enviar outro pedido
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-brand-blue uppercase tracking-widest ml-1">Seu Nome</label>
                                            <Input name="name" placeholder="Como deseja ser chamado?" className="h-14 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white text-lg px-6" required disabled={isLoading} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-brand-blue uppercase tracking-widest ml-1">Seu E-mail</label>
                                                <Input name="email" type="email" placeholder="Para contato" className="h-14 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white px-6" required disabled={isLoading} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-brand-blue uppercase tracking-widest ml-1">Telefone</label>
                                                <Input name="phone" placeholder="(66) 00000-0000" className="h-14 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white px-6" disabled={isLoading} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-brand-blue uppercase tracking-widest ml-1">Suas Intenções</label>
                                            <Textarea
                                                name="message"
                                                placeholder="Sinta-se à vontade para compartilhar seu pedido ou agradecimento..."
                                                className="min-h-[200px] rounded-[2rem] border-gray-200 bg-gray-50 focus:bg-white text-lg p-8 leading-relaxed"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white font-bold h-16 rounded-2xl text-xl shadow-xl shadow-brand-gold/20 transition-all hover:-translate-y-1 active:scale-95"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? <Loader2 className="w-8 h-8 animate-spin mr-2" /> : <Send className="w-6 h-6 mr-2" />}
                                            {isLoading ? "Enviando..." : "Enviar Intenção"}
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
