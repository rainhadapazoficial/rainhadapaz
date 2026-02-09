import { Button } from "@/components/ui/button";
import {
    Mic2,
    Heart,
    Baby,
    Flame,
    Users,
    ShieldCheck,
    BookOpen,
    Music,
    Share2,
    Scale,
    HandHelping,
    GraduationCap,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

const ministerios = [
    {
        title: "Ministério de Pregação",
        description: "A voz que anuncia a Boa Nova, proclamando o Evangelho com unção e poder para tocar corações e transformar vidas.",
        icon: Mic2,
        color: "bg-blue-100 text-blue-600"
    },
    {
        title: "Oração por Cura e Libertação",
        description: "Ministério que, pela fé, intercede e proclama a cura e a libertação que vêm de Jesus Cristo para as feridas da alma e do corpo.",
        icon: Heart,
        color: "bg-red-100 text-red-600"
    },
    {
        title: "Ministério para Crianças e Adolescentes",
        description: "Semeando a Palavra de Deus nos corações dos mais novos, guiando-os em seus primeiros passos na fé com alegria e criatividade.",
        icon: Baby,
        color: "bg-yellow-100 text-yellow-600"
    },
    {
        title: "Ministério Jovem",
        description: "A juventude em chamas pelo Espírito Santo! Formando jovens líderes e evangelizadores, ativos na Igreja e no mundo.",
        icon: Flame,
        color: "bg-orange-100 text-orange-600"
    },
    {
        title: "Ministério para as Famílias",
        description: "Levando a experiência do amor de Deus ao coração dos lares, fortalecendo as famílias como igrejas domésticas.",
        icon: Users,
        color: "bg-green-100 text-green-600"
    },
    {
        title: "Ministério de Intercessão",
        description: "Sustentando a missão da RCC e da Igreja pela oração contínua, em um clamor silencioso e poderoso pelas necessidades de todos.",
        icon: ShieldCheck,
        color: "bg-purple-100 text-purple-600"
    },
    {
        title: "Ministério de Formação",
        description: "Aprofundando a fé e o conhecimento da doutrina católica e dos carismas, capacitando líderes e servos para a missão.",
        icon: BookOpen,
        color: "bg-indigo-100 text-indigo-600"
    },
    {
        title: "Ministério de Música e Artes",
        description: "Louvor que eleva a alma e artes que evangelizam. A serviço da liturgia e da evangelização através do canto, da dança e do teatro.",
        icon: Music,
        color: "bg-pink-100 text-pink-600"
    },
    {
        title: "Ministério de Comunicação Social",
        description: "Anunciando a Palavra de Deus em todos os meios. Responsável por levar a mensagem da RCC além das fronteiras físicas.",
        icon: Share2,
        color: "bg-cyan-100 text-cyan-600"
    },
    {
        title: "Ministério de Fé e Política",
        description: "Formando cristãos conscientes de seu papel na sociedade, para que atuem nos meios políticos à luz do Evangelho.",
        icon: Scale,
        color: "bg-slate-100 text-slate-600"
    },
    {
        title: "Ministério de Promoção Humana",
        description: "O amor em ação, servindo aos mais necessitados e promovendo a dignidade humana através de obras de misericórdia.",
        icon: HandHelping,
        color: "bg-emerald-100 text-emerald-600"
    },
    {
        title: "Ministério Universidades Renovadas",
        description: "Levando a cultura de Pentecostes para o ambiente acadêmico, evangelizando estudantes e profissionais.",
        icon: GraduationCap,
        color: "bg-violet-100 text-violet-600"
    }
];

export default function MinisteriosPage() {
    return (
        <div className="flex flex-col">
            {/* Header Section */}
            <section className="bg-brand-blue py-24 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.rccdesinop.com.br/wp-content/uploads/2025/06/Renocacao-Carismatica-cartolica-fundo.png')] bg-cover bg-center" />
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 italic text-brand-gold">Nossos Ministérios</h1>
                    <p className="text-xl text-blue-100 leading-relaxed">
                        Na RCC Diocese de Sinop, a evangelização se faz viva através de diversos ministérios
                        que servem à Igreja e à comunidade com seus dons.
                    </p>
                </div>
            </section>

            {/* Grid de Ministérios */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-brand-blue mb-4">Onde o Espírito Santo te chama?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Conheça cada um deles e descubra onde o Senhor deseja usar os seus talentos para a glória de Deus.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ministerios.map((min, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                                <div className={`w-14 h-14 rounded-xl ${min.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <min.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-brand-blue transition-colors">
                                    {min.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-6 italic">
                                    "{min.description}"
                                </p>
                                <Button variant="ghost" className="text-brand-blue p-0 hover:bg-transparent hover:translate-x-2 transition-transform font-bold gap-2">
                                    Saiba mais sobre este ministério <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-brand-blue text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-8 italic text-brand-gold">Quer Servir em um Ministério?</h2>
                    <p className="text-lg mb-10 text-blue-100">
                        Se você sente o chamado para servir a Deus e aos irmãos em algum de nossos ministérios,
                        entre em contato conosco e venha fazer parte desta grande família de servos!
                    </p>
                    <Link href="/contato">
                        <Button size="lg" className="bg-brand-gold hover:bg-yellow-600 text-brand-blue font-bold px-12 rounded-full transform hover:scale-105 transition-all">
                            Quero me tornar um servo
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
