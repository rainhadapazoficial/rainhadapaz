"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
    Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Save, Loader2, Sparkles, Image as ImageIcon,
    Plus, Trash2, ChevronUp, ChevronDown, History
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function JubileuEditorPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    async function fetchSettings() {
        setIsLoading(true);
        const { data, error } = await supabase
            .from("site_settings")
            .select("value")
            .eq("key", "jubileu_settings")
            .single();

        if (error) {
            console.error("Error fetching jubileu settings:", error);
        } else if (data?.value) {
            setSettings(data.value);
        }
        setIsLoading(false);
    }

    async function handleSave() {
        setIsSaving(true);
        const { error } = await supabase
            .from("site_settings")
            .upsert({
                key: "jubileu_settings",
                value: settings,
                updated_at: new Date().toISOString()
            }, { onConflict: "key" });

        if (error) {
            alert("Erro ao salvar: " + error.message);
        } else {
            alert("Configurações do Jubileu salvas com sucesso!");
        }
        setIsSaving(false);
    }

    const updateParish = (field: string, value: string) => {
        setSettings({ ...settings, parish: { ...settings.parish, [field]: value } });
    };

    const updateParson = (field: string, value: string) => {
        setSettings({ ...settings, parson: { ...settings.parson, [field]: value } });
    };

    const updateHistory = (field: string, value: string) => {
        setSettings({ ...settings, history: { ...settings.history, [field]: value } });
    };

    const addTimelineItem = () => {
        const newItem = { year: "", title: "", description: "", image: "" };
        setSettings({
            ...settings,
            history: {
                ...settings.history,
                timeline: [...settings.history.timeline, newItem]
            }
        });
    };

    const removeTimelineItem = (index: number) => {
        const newTimeline = [...settings.history.timeline];
        newTimeline.splice(index, 1);
        setSettings({
            ...settings,
            history: { ...settings.history, timeline: newTimeline }
        });
    };

    const updateTimelineItem = (index: number, field: string, value: string) => {
        const newTimeline = [...settings.history.timeline];
        newTimeline[index] = { ...newTimeline[index], [field]: value };
        setSettings({
            ...settings,
            history: { ...settings.history, timeline: newTimeline }
        });
    };

    const moveTimelineItem = (index: number, direction: 'up' | 'down') => {
        const newTimeline = [...settings.history.timeline];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newTimeline.length) return;

        [newTimeline[index], newTimeline[targetIndex]] = [newTimeline[targetIndex], newTimeline[index]];
        setSettings({
            ...settings,
            history: { ...settings.history, timeline: newTimeline }
        });
    };

    if (isLoading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="w-12 h-12 animate-spin mb-4 text-brand-gold" />
                <p className="font-bold italic">Carregando editor do Jubileu...</p>
            </div>
        );
    }

    if (!settings) return <div className="p-8 text-center text-red-500">Erro: Configurações não encontradas. Verifique o banco de dados.</div>;

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-brand-gold rounded-2xl text-white">
                        <Sparkles className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-brand-blue italic">Editor Jubileu de Ouro</h1>
                        <p className="text-gray-500">Gerencie o conteúdo especial dos 50 anos.</p>
                    </div>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-brand-blue text-white rounded-2xl h-14 px-8 shadow-lg hover:scale-105 transition-all"
                >
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 mr-2 text-brand-gold" />}
                    Salvar Alterações
                </Button>
            </div>

            <Tabs defaultValue="paroquia" className="space-y-6">
                <TabsList className="bg-white p-1 rounded-2xl h-14 shadow-sm border">
                    <TabsTrigger value="paroquia" className="rounded-xl px-8 data-[state=active]:bg-brand-blue data-[state=active]:text-white">A Paróquia</TabsTrigger>
                    <TabsTrigger value="paroco" className="rounded-xl px-8 data-[state=active]:bg-brand-blue data-[state=active]:text-white">O Pároco</TabsTrigger>
                    <TabsTrigger value="historia" className="rounded-xl px-8 data-[state=active]:bg-brand-blue data-[state=active]:text-white">Linha do Tempo</TabsTrigger>
                </TabsList>

                {/* Paróquia Section */}
                <TabsContent value="paroquia">
                    <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
                        <CardHeader className="bg-brand-blue p-10 text-white">
                            <CardTitle className="text-2xl font-bold italic">Informações da Paróquia</CardTitle>
                            <CardDescription className="text-blue-100">Atualize os dados sobre a Matriz Santo Antônio.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 space-y-6">
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Título da Seção</label>
                                    <Input
                                        value={settings.parish.title}
                                        onChange={(e) => updateParish('title', e.target.value)}
                                        className="rounded-xl h-12 bg-gray-50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Descrição</label>
                                    <Textarea
                                        value={settings.parish.description}
                                        onChange={(e) => updateParish('description', e.target.value)}
                                        className="rounded-xl min-h-[120px] bg-gray-50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">URL da Imagem</label>
                                    <div className="flex gap-4">
                                        <Input
                                            value={settings.parish.image_url}
                                            onChange={(e) => updateParish('image_url', e.target.value)}
                                            className="rounded-xl h-12 bg-gray-50"
                                        />
                                        <div className="w-20 h-12 rounded-xl border overflow-hidden shrink-0 bg-gray-100">
                                            <img src={settings.parish.image_url} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Pároco Section */}
                <TabsContent value="paroco">
                    <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
                        <CardHeader className="bg-brand-gold p-10 text-brand-blue">
                            <CardTitle className="text-2xl font-bold italic">Perfil do Pároco</CardTitle>
                            <CardDescription className="text-blue-900/60">Edite as informações e mensagem do pároco atual.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 space-y-6">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nome Completo</label>
                                        <Input
                                            value={settings.parson.name}
                                            onChange={(e) => updateParson('name', e.target.value)}
                                            className="rounded-xl h-12 bg-gray-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Título / Ordem</label>
                                        <Input
                                            value={settings.parson.title}
                                            onChange={(e) => updateParson('title', e.target.value)}
                                            className="rounded-xl h-12 bg-gray-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">URL da Foto</label>
                                        <div className="flex gap-4">
                                            <Input
                                                value={settings.parson.image_url}
                                                onChange={(e) => updateParson('image_url', e.target.value)}
                                                className="rounded-xl h-12 bg-gray-50"
                                            />
                                            <div className="w-12 h-12 rounded-full border overflow-hidden shrink-0">
                                                <img src={settings.parson.image_url} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Biografia / Apresentação</label>
                                        <Textarea
                                            value={settings.parson.bio}
                                            onChange={(e) => updateParson('bio', e.target.value)}
                                            className="rounded-xl min-h-[120px] bg-gray-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Frase / Mensagem</label>
                                        <Textarea
                                            value={settings.parson.quote}
                                            onChange={(e) => updateParson('quote', e.target.value)}
                                            className="rounded-xl min-h-[80px] bg-gray-50 italic"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* História / Timeline Section */}
                <TabsContent value="historia">
                    <div className="grid gap-8">
                        <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
                            <CardHeader className="bg-slate-100 p-10 text-brand-blue">
                                <CardTitle className="text-2xl font-bold italic">Página de História</CardTitle>
                                <CardDescription>Edite o cabeçalho da página de linhad do tempo.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-10 space-y-6">
                                <div className="grid gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Título Principal</label>
                                        <Input
                                            value={settings.history.title}
                                            onChange={(e) => updateHistory('title', e.target.value)}
                                            className="rounded-xl h-12 bg-gray-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Resumo</label>
                                        <Textarea
                                            value={settings.history.description}
                                            onChange={(e) => updateHistory('description', e.target.value)}
                                            className="rounded-xl bg-gray-50"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-brand-blue italic flex items-center gap-3">
                                <History className="w-6 h-6 text-brand-gold" />
                                Linha do Tempo (50 Anos)
                            </h3>
                            <Button onClick={addTimelineItem} className="bg-brand-blue text-white rounded-xl">
                                <Plus className="w-4 h-4 mr-2" /> Adicionar Marco
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {settings.history.timeline.map((item: any, index: number) => (
                                <Card key={index} className="rounded-3xl border shadow-sm group hover:border-brand-gold transition-colors">
                                    <CardContent className="p-8">
                                        <div className="flex flex-col lg:flex-row gap-8">
                                            <div className="lg:w-32 space-y-4 shrink-0">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ano</label>
                                                    <Input
                                                        value={item.year}
                                                        onChange={(e) => updateTimelineItem(index, 'year', e.target.value)}
                                                        className="text-center font-bold text-xl rounded-xl border-2 border-brand-blue/10 h-14"
                                                    />
                                                </div>
                                                <div className="flex justify-center gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => moveTimelineItem(index, 'up')} disabled={index === 0}>
                                                        <ChevronUp className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => moveTimelineItem(index, 'down')} disabled={index === settings.history.timeline.length - 1}>
                                                        <ChevronDown className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-6">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Título do Marco</label>
                                                            <Input
                                                                value={item.title}
                                                                onChange={(e) => updateTimelineItem(index, 'title', e.target.value)}
                                                                className="font-bold rounded-xl h-12"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Descrição detalhada</label>
                                                            <Textarea
                                                                value={item.description}
                                                                onChange={(e) => updateTimelineItem(index, 'description', e.target.value)}
                                                                className="rounded-xl min-h-[100px]"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">URL da Imagem Histórica</label>
                                                            <div className="flex gap-4">
                                                                <Input
                                                                    value={item.image}
                                                                    onChange={(e) => updateTimelineItem(index, 'image', e.target.value)}
                                                                    className="rounded-xl h-12 overflow-hidden"
                                                                />
                                                                <div className="w-20 h-12 rounded-xl border overflow-hidden shrink-0 bg-gray-50">
                                                                    <img src={item.image} className="w-full h-full object-cover" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end pt-8">
                                                            <Button
                                                                variant="ghost"
                                                                onClick={() => removeTimelineItem(index)}
                                                                className="text-rose-500 hover:bg-rose-50 rounded-xl"
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2" /> Remover este marco
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Button onClick={addTimelineItem} className="w-full h-20 bg-gray-50 border-2 border-dashed border-gray-200 text-gray-400 rounded-[2rem] hover:bg-gray-100 hover:border-brand-gold hover:text-brand-blue transition-all group">
                            <Plus className="w-6 h-6 mr-2 group-hover:scale-110" />
                            <span className="font-bold">Adicionar outro marco histórico na linha do tempo</span>
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
