import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Quote, Shield, Target, Heart } from "lucide-react";

export default function QuemSomosPage() {
    return (
        <div className="flex flex-col">
            {/* Header */}
            <section className="bg-brand-blue py-24 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510915228340-29c85a43dbfe?q=80&w=2000')] opacity-10 bg-cover bg-center" />
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h1 className="text-6xl font-bold mb-6 italic text-brand-gold">Quem Somos</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Conheça a história, a missão e os valores que movem a RCC Diocese de Sinop.
                    </p>
                </div>
            </section>

            {/* History Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-block px-4 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-bold uppercase tracking-widest">
                            Nossa Herança
                        </div>
                        <h2 className="text-4xl font-bold text-brand-blue font-serif italic">Uma Caminhada de Fé e Adoração</h2>
                        <div className="prose prose-lg text-gray-600 space-y-4">
                            <p>
                                A RCC Diocese de Sinop nasceu do desejo profundo de buscar uma experiência viva com o Espírito Santo, expandindo-se por todas as paróquias e comunidades da nossa região.
                            </p>
                            <p>
                                Movidos pelo compromisso com a Renovação Carismática Católica (RCC), somos uma expressão de fé que busca o Batismo no Espírito Santo, a cura interior e o crescimento na vida espiritual de todo o povo de Deus.
                            </p>
                            <p>
                                Hoje, somos uma grande família diocesana unida pelo amor de Maria e pela força de um novo Pentecostes.
                            </p>
                        </div>
                        <div className="bg-brand-blue/5 p-8 border-l-4 border-brand-gold rounded-r-3xl italic text-brand-blue relative">
                            <Quote className="w-12 h-12 mb-4 text-brand-gold/20 absolute -top-4 -left-4" />
                            <p className="relative z-10 text-lg">
                                "A Renovação Carismática Católica é um grande dom do Espírito Santo à Igreja e ao mundo."
                            </p>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-brand-gold/20 rounded-[3rem] blur-2xl group-hover:bg-brand-gold/30 transition-all duration-500" />
                        <div className="relative h-[600px] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1000&auto=format&fit=crop"
                                alt="Comunidade em Oração"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                            <div className="w-16 h-16 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue mb-8 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                <Target className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-brand-blue">Missão</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Evangelizar com renovado ardor missionário, através da experiência do Pentecostes, formando discípulos apaixonados pelo Reino de Deus.
                            </p>
                        </div>

                        <div className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                            <div className="w-16 h-16 bg-brand-gold/5 rounded-2xl flex items-center justify-center text-brand-gold mb-8 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                                <Shield className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-brand-blue">Visão</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Ser um centro vibrante de espiritualidade e acolhimento em Sinop, onde cada pessoa possa encontrar seu lugar no coração de Jesus.
                            </p>
                        </div>

                        <div className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-brand-blue">Valores</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Fidelidade à Igreja, Docilidade ao Espírito Santo, Fraternidade Genuína, Oração Persistente e Serviço Desinteressado.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
