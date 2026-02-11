import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Flame, Users, Globe, Target, Shield, Heart, Quote, ChevronRight } from "lucide-react";

export default function ARCCPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="bg-brand-blue py-24 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510915228340-29c85a43dbfe?q=80&w=2000')] opacity-10 bg-cover bg-center" />
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h1 className="text-6xl font-bold mb-6 italic text-brand-gold">A RCC</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto italic font-medium">
                        "O Movimento Eclesial Renovação Carismática Católica é uma Corrente de Graça para a Igreja e para o mundo."
                    </p>
                </div>
            </section>

            {/* Core Grace: Baptism in the Spirit */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-block px-4 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-bold uppercase tracking-widest">
                            Nossa Identidade
                        </div>
                        <h2 className="text-4xl font-bold text-brand-blue font-serif italic">Batismo no Espírito Santo</h2>
                        <div className="prose prose-lg text-gray-600 space-y-4">
                            <p>
                                A espiritualidade carismática nasce em Pentecostes! No Cenáculo, com Maria e os apóstolos, vemos o derramamento do Espírito Santo sobre a Igreja. Esse evento se atualiza respondendo ao clamor por um Novo Pentecostes.
                            </p>
                            <p>
                                O Batismo no Espírito Santo é uma experiência que renova e transforma a vida. É uma experiência profunda com o amor de Deus derramado no coração humano, recebido através da submissão ao senhorio de Jesus Cristo.
                            </p>
                            <p>
                                Ele atualiza o batismo e o crisma sacramentais, aprofunda a comunhão com Deus e com os outros cristãos, reaviva o fervor evangelístico e equipa as pessoas com carismas para o serviço e a missão.
                            </p>
                        </div>
                        <div className="bg-brand-blue/5 p-8 border-l-4 border-brand-gold rounded-r-3xl italic text-brand-blue relative">
                            <Quote className="w-12 h-12 mb-4 text-brand-gold/20 absolute -top-4 -left-4" />
                            <p className="relative z-10 text-lg">
                                "Nosso apostolado é ser rosto e memória de Pentecostes nos dias de hoje!"
                            </p>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-brand-gold/20 rounded-[3rem] blur-2xl group-hover:bg-brand-gold/30 transition-all duration-500" />
                        <div className="relative h-[600px] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1000&auto=format&fit=crop"
                                alt="Experiência de Pentecostes"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Charisms and Communion */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue mb-8 group-hover:bg-brand-blue group-hover:text-white transition-all">
                                <Flame className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-6 text-brand-blue italic">Prática dos Carismas</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Os carismas do Espírito Santo são dons especiais concedidos aos fiéis para a edificação da Igreja e para a evangelização. Incluem dons como profecia, línguas, cura, discernimento, sabedoria e conhecimento.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                A RCC acredita que esses carismas são atuais e devem ser buscados e vivenciados. Eles incentivam os fiéis a discernir os sinais da presença do Espírito Santo em suas vidas e a permitir que Ele os conduza no caminho da santidade.
                            </p>
                        </div>

                        <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-brand-gold/5 rounded-2xl flex items-center justify-center text-brand-gold mb-8 group-hover:bg-brand-gold group-hover:text-white transition-all">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-6 text-brand-blue italic">Comunhão Fraterna</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                A comunhão fraterna é um valor central, enfatizando o amor como reflexo do amor de Deus. Os membros são encorajados a se relacionarem como uma verdadeira família espiritual, onde o respeito e a solidariedade são cultivados.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                A vida cristã é uma caminhada em comunidade, concebida como um corpo onde cada membro é importante. Nos Grupos de Oração, vive-se um clima de respeito, confiança e partilha de vitórias espirituais.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-brand-blue/5 rounded-full flex items-center justify-center text-brand-blue mx-auto">
                                <Target className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-bold italic text-brand-blue">Missão</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Evangelizar com renovado ardor missionário, a partir da experiência do Batismo no Espírito Santo, para fazer discípulos de nosso Senhor Jesus Cristo.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-brand-gold/5 rounded-full flex items-center justify-center text-brand-gold mx-auto">
                                <Shield className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-bold italic text-brand-blue">Visão</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Tornar o Espírito Santo mais conhecido, amado e adorado, difundindo a espiritualidade e a Cultura de Pentecostes a partir do Grupo de Oração.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                                <Globe className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-bold italic text-brand-blue">A Cultura</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Propagar a Cultura de Pentecostes para transformar a sociedade através do poder do Espírito Santo, respeitando a dignidade humana.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Organization */}
            <section className="py-24 bg-brand-blue text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-bold italic font-serif">Como estamos organizados</h2>
                            <p className="text-lg text-blue-100 leading-relaxed">
                                A RCC Brasil é uma realidade organizada e estruturada em rede de coordenação para promover a unidade e o crescimento do Movimento.
                            </p>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                        <Heart className="w-6 h-6 text-brand-gold" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold">Conselho Nacional</h4>
                                        <p className="text-blue-100/70 text-sm">Órgão que traça diretrizes nacionais, composto pelos presidentes dos Conselhos Estaduais.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                        <Heart className="w-6 h-6 text-brand-gold" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold">Instâncias Regionais</h4>
                                        <p className="text-blue-100/70 text-sm">Estruturada em estados, dioceses e paróquias para auxiliar e formar as lideranças locais.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                        <Heart className="w-6 h-6 text-brand-gold" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold">Grupos de Oração</h4>
                                        <p className="text-blue-100/70 text-sm">A célula fundamental da RCC, onde os fiéis vivem e propagam a espiritualidade carismática.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-12 rounded-[50px] border border-white/10 backdrop-blur-sm">
                            <h4 className="text-2xl font-bold mb-6 italic text-brand-gold">RCC e os Papas</h4>
                            <p className="text-blue-100 mb-8 italic">"A Renovação Carismática é uma Corrente de Graça para a Igreja e para o mundo." - Papa Francisco</p>
                            <div className="space-y-4">
                                {["Papa Francisco", "Bento XVI", "João Paulo II"].map((papa) => (
                                    <div key={papa} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-white/5 cursor-pointer">
                                        <span className="font-bold">{papa}</span>
                                        <ChevronRight className="w-5 h-5 text-brand-gold" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-brand-blue italic mb-8">Participe da Corrente de Graça</h2>
                    <p className="text-gray-600 text-lg mb-12">
                        Venha viver a experiência do Batismo no Espírito Santo em um de nossos Grupos de Oração. Procure o grupo mais próximo de você!
                    </p>
                    <Link href="/grupos">
                        <Button className="bg-brand-blue text-white px-12 h-16 rounded-2xl text-lg font-bold shadow-xl shadow-brand-blue/20 hover:scale-105 transition-all">
                            Encontrar um Grupo de Oração
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
