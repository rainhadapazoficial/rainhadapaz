"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    Plus, Search, Trash2, Edit, Loader2,
    CheckCircle2, XCircle, Calendar,
    MapPin, ImageIcon, AlertCircle
} from "lucide-react";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
    DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FestaReiJesusAdminPage() {
    const [editions, setEditions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingEdition, setEditingEdition] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchEditions();
    }, []);

    async function fetchEditions() {
        setIsLoading(true);
        const { data, error } = await supabase
            .from("festa_rei_jesus_editions")
            .select("*")
            .order("ano", { ascending: false });

        if (error) console.error("Error fetching editions:", error);
        else setEditions(data || []);
        setIsLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        const formValues = new FormData(e.currentTarget);
        const editionData = {
            ano: parseInt(formValues.get("ano") as string),
            tema: formValues.get("tema"),
            local: formValues.get("local"),
            descricao: formData.descricao,
            imagem_url: formData.imagem_url,
        };

        let result;
        if (editingEdition) {
            result = await supabase
                .from("festa_rei_jesus_editions")
                .update(editionData)
                .eq("id", editingEdition.id);
        } else {
            result = await supabase
                .from("festa_rei_jesus_editions")
                .insert([editionData]);
        }

        if (result.error) {
            alert("Erro ao salvar edição: " + result.error.message);
        } else {
            setIsDialogOpen(false);
            setEditingEdition(null);
            setFormData({});
            fetchEditions();
        }
        setIsSubmitting(false);
    }

    async function deleteEdition(id: number) {
        if (!confirm("Confirmar exclusão desta edição?")) return;
        const { error } = await supabase.from("festa_rei_jesus_editions").delete().eq("id", id);
        if (error) alert("Erro ao deletar: " + error.message);
        else fetchEditions();
    }

    const openEdit = (edition: any) => {
        setEditingEdition(edition);
        setFormData(edition);
        setIsDialogOpen(true);
    };

    const openNew = () => {
        setEditingEdition(null);
        setFormData({});
        setIsDialogOpen(true);
    };

    const filteredEditions = editions.filter(e =>
        e.tema.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.ano.toString().includes(searchTerm)
    );

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-brand-blue italic flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-brand-gold" />
                        Histórico Festa do Rei Jesus
                    </h1>
                    <p className="text-gray-500">Gerencie as edições passadas do evento.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Buscar por tema ou ano..."
                            className="pl-10 rounded-xl w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) {
                            setEditingEdition(null);
                            setFormData({});
                        }
                    }}>
                        <DialogTrigger asChild>
                            <Button onClick={openNew} className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-xl h-12">
                                <Plus className="w-5 h-5 mr-2" />
                                Nova Edição
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl rounded-[2rem]">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-bold italic text-brand-blue">
                                        {editingEdition ? "Editar Edição" : "Nova Edição"}
                                    </DialogTitle>
                                </DialogHeader>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="ano">Ano</Label>
                                        <Input
                                            name="ano"
                                            type="number"
                                            value={formData.ano || ""}
                                            onChange={(e) => setFormData({ ...formData, ano: e.target.value })}
                                            placeholder="Ex: 2023"
                                            required
                                            className="rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="local">Local</Label>
                                        <Input
                                            name="local"
                                            value={formData.local || ""}
                                            onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                                            placeholder="Ex: Ginásio Olímpico"
                                            required
                                            className="rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <Label htmlFor="tema">Tema</Label>
                                        <Input
                                            name="tema"
                                            value={formData.tema || ""}
                                            onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
                                            placeholder="Ex: O Amor de Deus foi derramado..."
                                            required
                                            className="rounded-xl"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="imagem_url">URL da Imagem (Opcional)</Label>
                                    <Input
                                        id="imagem_url"
                                        placeholder="https://exemplo.com/foto.jpg"
                                        value={formData.imagem_url || ""}
                                        onChange={(e) => setFormData({ ...formData, imagem_url: e.target.value })}
                                    />
                                    {formData.imagem_url && (
                                        <div className="mt-2 relative h-40 w-full rounded-md overflow-hidden bg-slate-100 border">
                                            <img src={formData.imagem_url} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = "https://placehold.co/600x400?text=Erro+Imagem")} />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="descricao">Descrição / Memória</Label>
                                    <Textarea
                                        id="descricao"
                                        className="min-h-[100px]"
                                        placeholder="Conte um pouco sobre como foi essa edição..."
                                        value={formData.descricao || ""}
                                        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                    />
                                </div>

                                <DialogFooter>
                                    <Button type="submit" className="bg-brand-blue text-white w-full rounded-xl" disabled={isSubmitting}>
                                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar Edição"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400">
                        <Loader2 className="w-12 h-12 animate-spin mb-4 text-brand-gold" />
                        <p className="font-bold italic">Carregando histórico...</p>
                    </div>
                ) : filteredEditions.length === 0 ? (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed rounded-[3rem]">
                        <XCircle className="w-16 h-16 mb-4 opacity-20" />
                        <p className="text-xl font-bold italic text-brand-blue">Nenhuma edição encontrada.</p>
                    </div>
                ) : (
                    filteredEditions.map((edition) => (
                        <Card key={edition.id} className="group overflow-hidden rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all bg-white p-6">
                            <CardContent className="p-0 space-y-4">
                                <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-gray-100 mb-4">
                                    {edition.imagem_url ? (
                                        <img src={edition.imagem_url} alt={edition.tema} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-brand-blue/5 text-brand-blue/20">
                                            <ImageIcon className="w-12 h-12" />
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 bg-brand-gold text-brand-blue font-bold px-3 py-1 rounded-full text-xs shadow-md">
                                        {edition.ano}
                                    </div>
                                </div>

                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold text-brand-blue italic line-clamp-1">{edition.tema}</h3>
                                        <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                                            <MapPin className="w-3 h-3" /> {edition.local}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => openEdit(edition)} className="text-gray-400 hover:text-brand-blue rounded-xl h-8 w-8">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => deleteEdition(edition.id)} className="text-gray-400 hover:text-red-500 rounded-xl h-8 w-8">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {edition.descricao && (
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {edition.descricao}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
