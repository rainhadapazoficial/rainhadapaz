import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, GraduationCap, Flame, Download } from "lucide-react";

export default function FormacaoPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center bg-brand-blue text-white text-center">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2000&auto=format&fit=crop')" }} />

                <div className="relative z-20 max-w-4xl px-4">
                    <h1 className="text-4xl md:text-6xl font-bold italic mb-6 animate-in fade-in slide-in-from-bottom duration-1000">
                        PROCESSO FORMATIVO
                    </h1>
                    <div className="w-24 h-1 bg-brand-gold mx-auto mb-6 rounded-full" />
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-medium">
                        Um caminho seguro para a santidade e maturidade na vida cristã.
                    </p>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed text-lg">
                        <p>
                            O Movimento Eclesial da RCCBRASIL possui um processo formativo completo, que contempla Querigma e Catequese, ou seja, anúncio de Jesus Cristo, levando a experiência do Seu infinito amor, que desperta para uma formação sólida, que toca os mais diversos aspectos da nossa vida: formação espiritual, doutrinária, humana e comunitária.
                        </p>
                        <p className="font-semibold text-brand-blue">
                            Processo formativo é a nossa grande estratégia de evangelização, um caminho seguro para trilharmos, para formarmos homens e mulheres para o céu, que busquem uma vida de santidade.
                        </p>

                        <div className="bg-brand-blue/5 border-l-4 border-brand-gold p-8 my-12 rounded-r-3xl italic">
                            <p className="text-xl text-brand-blue font-medium mb-4">
                                &quot;O nosso processo formativo é um instrumento eficaz de Deus para assegurar a unidade do Movimento. Uma liderança bem formada, ovelhas bem formadas, servos bem formados, bem evangelizados caminham em unidade. Unidade é buscar a mesma visão, propósitos comuns e estratégias comuns de evangelização&quot;.
                            </p>
                            <footer className="text-right font-bold text-brand-gold">— Vinícius Simões, ENF 2022</footer>
                        </div>

                        <p className="text-center text-2xl font-bold text-brand-blue mt-12 mb-8">
                            Está dividido em duas fases (QUERIGMÁTICA E CATEQUÉTICA), e três etapas:
                        </p>
                    </div>
                </div>
            </section>

            {/* Stages Section */}
            <section className="py-10 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 space-y-24">

                    {/* Stage 1: Querigma */}
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-bold uppercase tracking-widest">
                                <Flame className="w-4 h-4" /> Etapa 1
                            </div>
                            <h2 className="text-4xl font-bold text-brand-blue italic">QUERIGMA</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                É a apresentação da fé Cristã, o primeiro anúncio, o anúncio fundamental, cuja experiência irá se perpetuar por toda a vida cristã. Essa etapa não visa a catequese, o ensino, mas sim a experiência de Cristo. E conhecendo-O, apaixonar-se por Ele.
                            </p>

                            <div className="space-y-4">
                                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-all">
                                    <h4 className="font-bold text-brand-blue mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-brand-gold" /> Seminário de Vida no Espírito Santo
                                    </h4>
                                    <p className="text-sm text-gray-500 italic">Encontro de 9 semanas focado nos temas do querigma por meio de oração, pregação, partilha e convivência.</p>
                                </div>
                                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-all">
                                    <h4 className="font-bold text-brand-blue mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-brand-gold" /> Experiência de Oração
                                    </h4>
                                    <p className="text-sm text-gray-500 italic">Retiro de final de semana para um encontro pessoal impactante com Jesus. (Requisito: Seminário de Vida).</p>
                                </div>
                                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-all">
                                    <h4 className="font-bold text-brand-blue mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-brand-gold" /> Introdução aos Dons
                                    </h4>
                                    <p className="text-sm text-gray-500 italic">Retiro para despertar os dons carismáticos através de oficinas práticas. (Requisito: Experiência de Oração).</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-black">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/W9xRLbgSmmI"
                                    title="1º Etapa do Processo Formativo - Etapa Querigmática"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <p className="text-center text-sm text-gray-400 italic">Vídeo: 1ª Etapa do Processo Formativo - Etapa Querigmática</p>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gray-200" />

                    {/* Stage 2: Modulo Basico */}
                    <div className="grid md:grid-cols-2 gap-12 items-start md:flex-row-reverse">
                        <div className="space-y-6 md:order-2">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-bold uppercase tracking-widest">
                                <BookOpen className="w-4 h-4" /> Etapa 2
                            </div>
                            <h2 className="text-4xl font-bold text-brand-blue italic">MÓDULO BÁSICO DE FORMAÇÃO</h2>
                            <div className="bg-brand-blue/5 p-6 rounded-2xl border-l-4 border-brand-blue italic text-gray-700">
                                &quot;Na Igreja Católica, a fase querigmática é só o começo e depois daquela decisão, abre-se o caminho para o crescimento e a plenitude da vida cristã...&quot;
                                <footer className="font-bold mt-2">— Cardeal Raniero Cantalamessa</footer>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Esta etapa visa a nossa perseverança e aprofundamento na Doutrina do Senhor e ensinamentos da Santa Igreja. Contempla 8 apostilas: Formação Humana (2), Identidade, Jesus Senhor e Mestre, Grupo de Oração, Vida de Oração, Carismas e Igreja.
                            </p>
                        </div>
                        <div className="space-y-6 md:order-1">
                            <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-black">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/KggcNvUYOaU"
                                    title="2º Etapa do Processo Formativo - Módulo básico de formação"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <p className="text-center text-sm text-gray-400 italic">Vídeo: 2ª Etapa do Processo Formativo - Módulo Básico</p>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gray-200" />

                    {/* Stage 3: Especifica */}
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-bold uppercase tracking-widest">
                                <GraduationCap className="w-4 h-4" /> Etapa 3
                            </div>
                            <h2 className="text-4xl font-bold text-brand-blue italic">FORMAÇÕES ESPECÍFICAS</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Visa atender ao chamado de Jesus ao serviço específico de ministério. O objetivo é preparar o servo para atuar na célula principal do nosso Movimento: o Grupo de Oração.
                            </p>
                            <p className="text-brand-blue font-medium italic">
                                &quot;O objetivo do processo não é apenas formar servos, mas sim, um povo bem-disposto para povoar o céu.&quot;
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-black">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/7OQ8zMNKdhc"
                                    title="3º Etapa do Processo Formativo - Formações especificas de Ministérios"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <p className="text-center text-sm text-gray-400 italic">Vídeo: 3ª Etapa do Processo Formativo - Ministérios</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-brand-blue text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full -ml-32 -mb-32 blur-3xl" />

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl font-bold italic mb-8">Material de Apoio</h2>
                    <p className="text-xl text-blue-100 mb-12 italic">
                        Faça o download da apresentação abaixo e a utilize no processo formativo da sua diocese, paróquia e Grupo de Oração.
                    </p>
                    <div className="group relative transition-all duration-500 hover:scale-105 inline-block rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <img
                            src="https://rccbrasil.org.br/wp-content/uploads/2025/02/09-Silde-Processo-Formativo-768x432.jpg"
                            alt="Slide Processo Formativo"
                            className="max-w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <a
                                href="https://rccbrasil.org.br/wp-content/uploads/2025/02/09-Silde-Processo-Formativo.jpg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="bg-brand-gold hover:bg-white hover:text-brand-blue text-white rounded-full px-8 h-14 font-bold text-lg gap-2">
                                    <Download className="w-6 h-6" /> Baixar Apresentação
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
