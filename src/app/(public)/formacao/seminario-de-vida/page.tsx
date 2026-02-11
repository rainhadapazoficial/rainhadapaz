import { Flame, Star, BookOpen, Users, Heart, Shield, CheckCircle2, Award } from "lucide-react";

export default function SeminarioVidaPage() {
    const themes = [
        { name: "O Semeador", icon: <Star className="w-5 h-5 text-brand-gold" /> },
        { name: "O Amor de Deus", icon: <Heart className="w-5 h-5 text-brand-gold" /> },
        { name: "Pecado e Salvação", icon: <Shield className="w-5 h-5 text-brand-gold" /> },
        { name: "Fé e Conversão", icon: <Flame className="w-5 h-5 text-brand-gold" /> },
        { name: "Senhorio de Jesus", icon: <Award className="w-5 h-5 text-brand-gold" /> },
        { name: "Perdão e Cura Interior", icon: <Heart className="w-5 h-5 text-brand-gold" /> },
        { name: "Batismo no Espírito Santo", icon: <Flame className="w-5 h-5 text-brand-gold" /> },
        { name: "Vida Fraterna e Vida em Comunidade", icon: <Users className="w-5 h-5 text-brand-gold" /> },
        { name: "Testemunhando o poder de Deus", icon: <CheckCircle2 className="w-5 h-5 text-brand-gold" /> },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center bg-brand-blue text-white text-center">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('https://rccbrasil.org.br/wp-content/uploads/2023/04/seminario-1024x349.jpg')" }} />

                <div className="relative z-20 max-w-4xl px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold italic mb-6 animate-in fade-in slide-in-from-bottom duration-1000">
                        Seminário de Vida no Espírito Santo
                    </h1>
                    <div className="w-24 h-1 bg-brand-gold mx-auto mb-6 rounded-full" />
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-brand-blue italic mb-6">O que é e como funciona?</h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    O Seminário de Vida no Espírito Santo (SVES) tem, primordialmente, um caráter evangelizador. Ele se destina a anunciar o Querigma, a mensagem básica do Evangelho, e a proclamá-la de maneira nova de forma que todos aqueles que a ouçam possam se comprometer de modo renovado com o Senhor, abrindo-se, assim, a uma experiência mais completa com a obra do Espírito em suas vidas.
                                </p>
                            </div>

                            <div className="bg-brand-blue/5 p-8 rounded-[2.5rem] border border-brand-blue/10">
                                <p className="text-brand-blue font-medium italic mb-0">
                                    &quot;O objetivo do Seminário de Vida é levar cada participante a descobrir Jesus Cristo como seu Senhor e Salvador pessoal, através de uma nova efusão do Espírito Santo.&quot;
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 md:p-12 rounded-[3.5rem] shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold text-brand-blue italic mb-8 flex items-center gap-3">
                                <BookOpen className="w-6 h-6 text-brand-gold" />
                                Temas do Querigma
                            </h3>
                            <div className="space-y-4">
                                {themes.map((theme, index) => (
                                    <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                                        <div className="w-10 h-10 bg-brand-blue/5 rounded-xl flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
                                            {theme.icon}
                                        </div>
                                        <span className="font-bold text-gray-700">{theme.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Callout */}
            <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="rounded-[3rem] overflow-hidden shadow-2xl relative group">
                        <img
                            src="https://rccbrasil.org.br/wp-content/uploads/2023/04/seminario-1024x349.jpg"
                            alt="Seminário de Vida no Espírito Santo"
                            className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-transparent to-transparent flex items-end p-12">
                            <p className="text-white text-xl font-medium italic max-w-2xl">
                                Venha ter uma experiência profunda com o amor de Deus que transforma vidas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
