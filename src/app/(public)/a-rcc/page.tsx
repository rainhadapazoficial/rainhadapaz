"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Flame, Users, Globe, Target, Shield, Heart, Quote, ChevronRight, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const POPES = {
    "Papa Francisco": {
        title: "Papa Francisco: A Renovação Carismática é uma corrente de graça para a Igreja",
        subtitle: "Discurso na 37ª Convocação da Renovação na Itália (2014)",
        content: `
A Renovação Carismática Católica exultou de alegria neste domingo (1º de junho) pelo histórico encontro do Movimento com o Papa Francisco. O Pontífice esteve presente na 37ª Convocação da Renovação na Itália. O encontro continua acontecendo até esta segunda-feira, no Estádio Olímpico em Roma.

Ao chegar, o Papa Francisco foi recebido por uma multidão de fieis carismáticos vinda de mais de 50 países. O presidente da RCC italiana, Salvatore Martinez, deu as boas vindas ao Santo Padre dizendo que o estádio não é palco de um jogo de futebol, mas há sempre uma equipe a dos discípulos de Jesus, cujo técnico é o Espírito Santo e o capitão, o Papa. “A estratégia de jogo é maravilhosa! Colocando em campo a fé, a vitória de Jesus está garantida”, disse.

Alguns representantes de sacerdotes, jovens, famílias e enfermos deixaram seu testemunho intercalados pelas palavras do Santo Padre, que finalizou o momento com uma oração. Seguindo as atividades, o Papa Francisco deu início ao seu pronunciamento, o qual se lê na íntegra.

### Palavras do Papa aos sacerdotes:
Para vós sacerdotes, eu posso dizer uma palavra de proximidade. A proximidade com Jesus Cristo na oração e adoração. Perto do Senhor, e proximidade com o povo, o povo de Deus, que foi confiado a vocês. Amem o seu povo, estejam perto das pessoas. Isto é o que eu lhes peço, essa dupla aproximação: proximidade com Jesus e proximidade com o povo.

### Palavras do Papa aos jovens:
Seria triste que um jovem guardasse em um cofre em sua juventude: de modo que a juventude se torne velha, no pior sentido da palavra; torna-se um pedaço de pano; não serve para nada. A juventude é para arriscar: arriscar bem, arriscar com esperança. É para apostar em grandes coisas. A juventude é para doar-se, para que os outros conheçam o Senhor. Não poupe para você sua juventude: Vá em frente!

### Palavras do Papa às famílias:
As famílias são a Igreja doméstica , onde Jesus cresce, cresce o amor dos cônjuges, cresce na vida dos filhos. E é por isso que inimigo ataca tanto a família: o diabo não quer isso! Ele tenta destruí-la, procura garantir que o amor não está lá. As famílias são a igreja doméstica. A noiva e o noivo são pecadores como todos os outros, mas eles querem ir em frente com fé, na sua fertilidade, nos filhos e na fé de seus filhos. Que o Senhor abençoe a família, em vista da forte crise que esta passa na qual o diabo quer destruí-la.

### Palavras do Papa para os enfermos:
Os irmãos e irmãs que sofrem, que têm uma doença, que são deficientes, são irmãos e irmãs ungidos pelo sofrimento de Jesus Cristo, imitando Jesus no momento difícil da sua cruz, sua vida. Esta unção do sofrimento eles levam adiante por toda a Igreja. Obrigado, irmãos e irmãs; muito obrigado pelo vosso aceitar ser ungido pelo sofrimento. Muito obrigado pela esperança que vocês testemunham, esta esperança que nos leva para frente buscando o carinho de Jesus.

### Palavras sobre os idosos
Eu disse para o Salvatore que, talvez, faltasse alguém, talvez o mais importante: os avós! Faltam os idosos, e esses são a segurança da nossa fé, o “velho”. Vejam, quando Maria e José levaram Jesus ao templo, havia dois; e quatro vezes, senão cinco – não me recordo bem – o Evangelho diz que “eles foram guiados pelo Espírito Santo”. Maria e José dizem que foram conduzidos pela lei. Os jovens precisam cumprir a lei, os idosos – como um bom vinho – eles têm a liberdade do Espírito Santo. E assim este Simeão, que era corajoso, inventou uma “liturgia”, e louva a Deus, louvava… E foi o Espírito que o levou a fazer isso. Os anciãos! Eles são a nossa sabedoria, são a sabedoria da Igreja; idosos que muitas vezes descartamos, avós, os anciãos… E aquela anciã, Ana, fez uma coisa extraordinária na Igreja: ela santificou a fofoca! E como ele fez isso? Por que, em vez de cochichar com alguém, andava de um lado para o outro dizendo [a respeito de Jesus]: “É este, este é que vai nos salvar”. E isso é uma coisa boa. Avós e avôs são a nossa força e nossa sabedoria. Que o Senhor nos dê sempre anciãos sábios! Idosos que nos dão a memória do nosso povo, a memória da Igreja. E nós também devemos dar-lhes o que diz na Carta aos Hebreus: um sentimento de alegria. Diz que os idosos, esses, saudaram de longe a promessa: que estes nos ensinam.

### A oração do Papa:
Senhor, olhe para o teu povo à espera do Espírito Santo. Olhe para os jovens, olhe para as famílias, olhe as crianças, olhe para os doentes, olhe para os sacerdotes, as pessoas consagradas, religiosas, bispos, olhe para nós, olhe para todos. E dai-nos aquela santa embriaguez, aquela do Espírito, aquela que nos faz falar todas as línguas, as línguas de amor, sempre perto dos irmãos e irmãs que precisam de nós. Ensina-nos a não lutar entre nós para ter mais um pedaço de poder; ensina-nos a ser humildes, ensina-nos a amar mais à Igreja do que o nosso partido, que nossas “brigas” internas; Ensina-nos a ter um coração aberto para receber o Espírito. Enviai, Senhor, o vosso Espírito sobre nós! Amém.

### Discurso do Papa Francisco à Renovação Carismática Católica
Queridos irmãos e irmãs! Muito obrigado pela vossa acolhida... Vocês, Renovação Carismática, receberam um grande dom do Senhor. Vocês nasceram de um desejo do Espírito Santo como “uma corrente de graça na Igreja e para a Igreja”. Esta é a sua definição: a corrente de graça.

O perigo para a Renovação é a organização excessiva. Sim, vocês precisam de organização, mas não percam a graça de deixar Deus ser Deus! Outro perigo é tornarem-se “controladores” da graça de Deus. Vocês são dispensadores da graça de Deus e não controladores! Não sejam alfândega ao Espírito Santo!

Espero de vocês uma evangelização com a Palavra de Deus que anuncia que Jesus está vivo e ama todas as pessoas. Aproximem-se dos pobres, dos necessitados, para tocar em sua carne, a carne ferida de Jesus. Procurem a unidade da Renovação, porque a unidade vem do Espírito Santo e nasceu da Trindade. Obrigado!`
    },
    "Bento XVI": {
        title: "Mensagem do Papa Bento XVI aos membros da RCC",
        subtitle: "Saudação pelo 40º aniversário da Renovação na Itália (2012)",
        content: `
Queridos irmãos e irmãs! Com grande alegria saúdo-vos por ocasião do quadragésimo aniversário da Renovação no Espírito Santo, na Itália, a expressão deste grande movimento de renovação carismática que ocorre na Igreja Católica, a partir do Concílio Vaticano II.

Tenho o prazer de encontrar-vos na véspera de Pentecostes, festa fundamental para a Igreja e tão significativa para o seu movimento, e exorto-vos a aceitar o amor de Deus que nos é comunicada através do dom do Espírito Santo, o princípio unificador da Igreja. De maneiras diferentes vós afirmastes o primado de Deus, para quem se dirige sempre e supremamente nossa adoração.

Queridos amigos, continuai a testemunhar a alegria da fé em Cristo, a beleza de ser discípulos de Cristo, o poder do amor que o Evangelho irradia na História, bem como a graça incomparável que cada crente pode experimentar com a prática santificadora dos sacramentos na Igreja e com o exercício de humildade e desinteressado dos carismas.

Na sociedade de hoje vivemos em uma situação precária, caracterizada pela insegurança. Torna-se cada vez mais importante construir o edifício da vida e das relações sociais na rocha estável da Palavra de Deus, guiado pelo Magistério da Igreja.

Hoje, os crentes são chamados a um testemunho convicto, sincero e confiável de fé, estreitamente unido aos esforços da caridade. Não vos canseis do contato com o Céu: o mundo precisa de oração. Precisamos de homens e mulheres que sentem a atração ao Céu em sua vida, que façam do louvor ao Senhor um novo estilo de vida. E sejai cristãos alegres! Confio todos vós a Maria Santíssima, presente no Cenáculo durante o evento de Pentecostes. Obrigado!

**BENEDICTUS PP. XVI**`
    },
    "João Paulo II": {
        title: "Discurso do Papa João Paulo II à Renovação Carismática",
        subtitle: "Conferência Internacional para os Responsáveis (1998)",
        content: `
Caríssimos Irmãos e Irmãs! “Dou graças ao meu Deus por meio de Jesus Cristo, a respeito de vós, pois a fama da vossa fé espalhou-se pelo mundo inteiro” (Rm 1, 8).

A Renovação Carismática Católica ajudou muitos cristãos a redescobrir a presença e a força do Espírito Santo na sua vida, na vida da Igreja e no mundo. Esta redescoberta despertou neles uma fé em Cristo repleta de alegria, um grande amor pela Igreja e uma generosa dedicação à sua missão evangelizadora.

Como responsáveis da Renovação Carismática Católica, uma das vossas tarefas consiste em tutelar a identidade católica das comunidades carismáticas, estimulando-as sempre a manter um vínculo hierárquico e estreito com os Bispos e o Papa. Pertenceis a um movimento eclesial e a palavra «eclesial» obriga a uma preciosa tarefa de formação cristã.

O tema da vossa Conferência, «Let the fire fall again!», recorda as palavras de Cristo: «Vim para lançar fogo sobre a terra; e como gostaria que já estivesse aceso!» (Lc 12, 49). Olhando para o Grande Jubileu, estas palavras ecoam com todo o seu vigor.

Acompanho a vossa Conferência com as minhas orações, convicto de que isto dará ricos frutos espirituais à Renovação Carismática Católica em todo o mundo. Maria, Esposa do Espírito e Mãe de Cristo, vigie sobre quanto fazeis em nome do seu Filho!

**Vaticano, 30 de outubro de 1998.**`
    }
};

export default function ARCCPage() {
    const [selectedPope, setSelectedPope] = useState<keyof typeof POPES | null>(null);

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
                            <p className="text-blue-100 mb-8 italic text-sm">Desde o seu nascimento, a RCC tem sido acompanhada e encorajada pelos sucessores de Pedro como uma corrente de graça para a Igreja.</p>
                            <div className="space-y-4">
                                {(Object.keys(POPES) as Array<keyof typeof POPES>).map((papa) => (
                                    <div
                                        key={papa}
                                        onClick={() => setSelectedPope(papa)}
                                        className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-white/5 cursor-pointer group"
                                    >
                                        <span className="font-bold group-hover:text-brand-gold transition-colors">{papa}</span>
                                        <ChevronRight className="w-5 h-5 text-brand-gold group-hover:translate-x-1 transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pope Message Modal */}
            <Dialog open={!!selectedPope} onOpenChange={(open) => !open && setSelectedPope(null)}>
                <DialogContent className="max-w-4xl p-0 overflow-hidden border-none rounded-[2.5rem] bg-white shadow-2xl">
                    {selectedPope && (
                        <div className="flex flex-col h-[85vh]">
                            <div className="bg-brand-blue p-8 text-white relative">
                                <DialogHeader className="space-y-2">
                                    <div className="inline-block px-3 py-1 bg-brand-gold/20 text-brand-gold rounded-full text-[10px] font-bold uppercase tracking-widest border border-brand-gold/20 mb-2">
                                        Mensagem Pontifícia
                                    </div>
                                    <DialogTitle className="text-2xl md:text-3xl font-bold italic leading-tight">
                                        {POPES[selectedPope].title}
                                    </DialogTitle>
                                    <p className="text-blue-100/80 text-sm italic font-medium">
                                        {POPES[selectedPope].subtitle}
                                    </p>
                                </DialogHeader>
                                <button
                                    onClick={() => setSelectedPope(null)}
                                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <ScrollArea className="flex-1 p-8 md:p-12">
                                <div className="prose prose-blue max-w-none">
                                    <div className="text-gray-600 leading-relaxed space-y-6 text-lg whitespace-pre-wrap font-medium pb-12">
                                        {POPES[selectedPope].content}
                                    </div>
                                </div>
                            </ScrollArea>
                            <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
                                <Button
                                    onClick={() => setSelectedPope(null)}
                                    className="bg-brand-blue hover:bg-brand-gold text-white px-8 rounded-xl font-bold transition-all h-12"
                                >
                                    Fechar Mensagem
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Footer CTA */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-brand-blue italic mb-8">Participe da Corrente de Graça</h2>
                    <p className="text-gray-600 text-lg mb-12 font-medium">
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
