"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
    Plus, Search, Trash2, Edit, Loader2,
    CheckCircle2, XCircle, Flame, History,
    Users, Info, Palette, UserPlus
} from "lucide-react";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
    DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { ImageUpload } from "@/components/admin/ImageUpload";

export default function MinisteriosAdminPage() {
    const [ministerios, setMinisterios] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingMinistry, setEditingMinistry] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});
    const [searchTerm, setSearchTerm] = useState("");

    // Member State
    const [membros, setMembros] = useState<any[]>([]);
    const [isMemberLoading, setIsMemberLoading] = useState(false);

    // History State (Read-only)
    const [autoHistory, setAutoHistory] = useState<any[]>([]);

    useEffect(() => {
        fetchMinisterios();
    }, []);

    async function fetchMinisterios() {
        setIsLoading(true);
        const { data: minData, error: minError } = await supabase
            .from("ministerios")
            .select("*")
            .order("ordem", { ascending: true });

        if (minError) {
            console.error("Error fetching ministerios:", minError);
            setIsLoading(false);
            return;
        }

        // Fetch current active mandate to identify coordinators
        const { data: activeMandate } = await supabase
            .from("conselho_mandatos")
            .select("id")
            .eq("ativo", true)
            .single();

        let coordinators: Record<number, string> = {};
        if (activeMandate) {
            const { data: members } = await supabase
                .from("conselho_membros")
                .select("nome, ministerio_id")
                .eq("mandato_id", activeMandate.id)
                .not("ministerio_id", "is", null);

            (members || []).forEach(m => {
                if (m.ministerio_id) coordinators[m.ministerio_id] = m.nome;
            });
        }

        setMinisterios((minData || []).map(m => ({
            ...m,
            currentCoordinator: coordinators[m.id]
        })));
        setIsLoading(false);
    }

    async function fetchMinistryData(ministryId: number) {
        setIsMemberLoading(true);

        // Fetch Members
        const { data: membersData } = await supabase
            .from("ministerio_membros")
            .select("*")
            .eq("ministerio_id", ministryId)
            .order("nome", { ascending: true });

        setMembros(membersData || []);

        // Fetch Automatic History from Management
        const { data: historyData } = await supabase
            .from("conselho_membros")
            .select(`
                cargo,
                nome,
                conselho_mandatos (
                    titulo,
                    ano_inicio,
                    ano_fim,
                    ativo
                )
            `)
            .eq("ministerio_id", ministryId)
            .order("conselho_mandatos(ano_inicio)", { ascending: false });

        setAutoHistory(historyData || []);
        setIsMemberLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        const formValues = new FormData(e.currentTarget);
        const ministryData = {
            nome: formValues.get("nome"),
            descricao: formData.descricao,
            cor: formValues.get("cor") || 'bg-blue-100 text-blue-600',
            ordem: parseInt(formValues.get("ordem") as string) || 0,
            imagem_url: formData.imagem_url,
        };

        if (editingMinistry) {
            const result = await supabase.from("ministerios").update(ministryData).eq("id", editingMinistry.id);
            if (result.error) {
                alert("Erro ao salvar ministério: " + result.error.message);
                setIsSubmitting(false);
                return;
            }
            setIsDialogOpen(false);
            setEditingMinistry(null);
        } else {
            const { data, error } = await supabase
                .from("ministerios")
                .insert([ministryData])
                .select()
                .single();

            if (error) {
                alert("Erro ao salvar ministério: " + error.message);
                setIsSubmitting(false);
                return;
            }

            // After creating a new ministry, keep the dialog open but switch to edit mode
            // This allows the user to immediately add members
            setEditingMinistry(data);
            setFormData(data);
            fetchMinistryData(data.id);
            // We don't close the dialog here
        }

        fetchMinisterios();
        setIsSubmitting(false);
    }

    // Member CRUD
    async function addMember() {
        if (!editingMinistry) return;
        const nome = prompt("Nome do membro:");
        if (!nome) return;

        const { error } = await supabase.from("ministerio_membros").insert([{
            ministerio_id: editingMinistry.id,
            nome
        }]);

        if (error) alert("Erro ao adicionar membro: " + error.message);
        else fetchMinistryData(editingMinistry.id);
    }

    async function deleteMember(id: number) {
        if (!confirm("Excluir este membro?")) return;
        const { error } = await supabase.from("ministerio_membros").delete().eq("id", id);
        if (error) alert("Erro ao excluir: " + error.message);
        else if (editingMinistry) fetchMinistryData(editingMinistry.id);
    }

    async function deleteMinistry(id: number) {
        if (!confirm("Confirmar exclusão deste ministério?")) return;
        const { error } = await supabase.from("ministerios").delete().eq("id", id);
        if (error) alert("Erro ao deletar: " + error.message);
        else fetchMinisterios();
    }

    const openEdit = async (ministry: any) => {
        setEditingMinistry(ministry);
        setFormData(ministry);
        setIsDialogOpen(true);
        fetchMinistryData(ministry.id);
    };

    const openNew = () => {
        setEditingMinistry(null);
        setFormData({});
        setMembros([]);
        setAutoHistory([]);
        setIsDialogOpen(true);
    };

    const filteredMinisterios = ministerios.filter(m =>
        m.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentCoordinator = autoHistory.find(h => h.conselho_mandatos?.ativo);

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-brand-blue italic flex items-center gap-3">
                        <Flame className="w-8 h-8 text-brand-gold" />
                        Ministérios
                    </h1>
                    <p className="text-gray-500">Gerencie os ministérios, membros e visualize o histórico de gestão.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Buscar ministério..."
                            className="pl-10 rounded-xl w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) {
                            setEditingMinistry(null);
                            setFormData({});
                        }
                    }}>
                        <DialogTrigger asChild>
                            <Button onClick={openNew} className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-xl h-12">
                                <Plus className="w-5 h-5 mr-2" />
                                Novo Ministério
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl rounded-[2rem] max-h-[90vh] overflow-y-auto">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-bold italic text-brand-blue">
                                        {editingMinistry ? "Editar Ministério" : "Novo Ministério"}
                                    </DialogTitle>
                                </DialogHeader>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Left Column: Basic Info */}
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-bold text-brand-blue uppercase tracking-widest border-b pb-2 flex items-center gap-2">
                                                <Info className="w-4 h-4" /> Informações Básicas
                                            </h4>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nome do Ministério</label>
                                                <Input
                                                    name="nome"
                                                    value={formData.nome || ""}
                                                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                                    placeholder="Ex: Ministério de Pregação"
                                                    required
                                                    className="rounded-xl"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="descricao">Descrição / Missão</Label>
                                                <textarea
                                                    id="descricao"
                                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    placeholder="Fale sobre o objetivo deste ministério..."
                                                    value={formData.descricao || ""}
                                                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Estilo Visual</label>
                                                    <Input name="cor" value={formData.cor || "bg-blue-100 text-blue-600"} onChange={e => setFormData({ ...formData, cor: e.target.value })} className="rounded-xl" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ordem</label>
                                                    <Input name="ordem" type="number" value={formData.ordem || 0} onChange={e => setFormData({ ...formData, ordem: e.target.value })} required className="rounded-xl" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-sm font-bold text-brand-blue uppercase tracking-widest border-b pb-2 flex items-center gap-2">
                                                <Palette className="w-4 h-4" /> Imagem / Foto
                                            </h4>
                                            <ImageUpload
                                                value={formData.imagem_url || ""}
                                                onChange={(url) => setFormData({ ...formData, imagem_url: url })}
                                                onRemove={() => setFormData({ ...formData, imagem_url: "" })}
                                                bucket="media"
                                                folder="ministerios"
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column: Members & History */}
                                    <div className="space-y-8">
                                        {/* Members Section */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between border-b pb-2">
                                                <h4 className="text-sm font-bold text-brand-blue uppercase tracking-widest flex items-center gap-2">
                                                    <Users className="w-4 h-4" /> Membros do Ministério
                                                </h4>
                                                {editingMinistry && (
                                                    <Button type="button" variant="ghost" size="sm" onClick={addMember} className="h-6 text-brand-blue hover:text-brand-blue hover:bg-brand-blue/10">
                                                        <UserPlus className="w-4 h-4 mr-1" /> Add
                                                    </Button>
                                                )}
                                            </div>

                                            {!editingMinistry ? (
                                                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl">
                                                    <p className="text-[11px] text-amber-800 leading-tight">
                                                        <strong>Nota:</strong> Salve as informações básicas primeiro para liberar o cadastro de membros.
                                                    </p>
                                                </div>
                                            ) : isMemberLoading ? (
                                                <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 animate-spin text-brand-blue" /></div>
                                            ) : membros.length === 0 ? (
                                                <p className="text-xs text-gray-400 italic">Nenhum membro cadastrado.</p>
                                            ) : (
                                                <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto pr-2">
                                                    {membros.map((m) => (
                                                        <div key={m.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 text-sm group">
                                                            <span>{m.nome}</span>
                                                            <Button type="button" variant="ghost" size="icon" onClick={() => deleteMember(m.id)} className="w-6 h-6 text-gray-300 hover:text-red-500">
                                                                <Trash2 className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Auto History Section */}
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-bold text-brand-blue uppercase tracking-widest border-b pb-2 flex items-center gap-2">
                                                <History className="w-4 h-4" /> Coordenador & Histórico
                                            </h4>

                                            <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl mb-4">
                                                <p className="text-[11px] text-blue-800 leading-tight">
                                                    <strong>Gestão Centralizada:</strong> O coordenador e o biênio são definidos na aba <span className="font-bold">GESTÃO</span> do painel, selecionando um dos membros cadastrados acima.
                                                </p>
                                            </div>

                                            {!editingMinistry ? (
                                                <p className="text-xs text-gray-400 italic">O coordenador aparecerá aqui após ser vinculado na Gestão.</p>
                                            ) : isMemberLoading ? (
                                                <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 animate-spin text-brand-blue" /></div>
                                            ) : autoHistory.length === 0 ? (
                                                <p className="text-xs text-gray-400 italic">Nenhum vínculo na Gestão encontrado.</p>
                                            ) : (
                                                <div className="space-y-3">
                                                    {autoHistory.map((h, i) => (
                                                        <div key={i} className={`p-3 rounded-xl border flex justify-between items-center ${h.conselho_mandatos?.ativo ? "bg-brand-blue/5 border-brand-blue/20" : "bg-white"}`}>
                                                            <div>
                                                                <p className="text-sm font-bold text-gray-900">{h.nome}</p>
                                                                <p className="text-[10px] text-brand-blue font-bold uppercase">{h.cargo}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-[10px] font-bold text-gray-500 uppercase">{h.conselho_mandatos?.titulo}</p>
                                                                {h.conselho_mandatos?.ativo && (
                                                                    <span className="text-[9px] bg-brand-gold text-brand-blue px-1.5 py-0.5 rounded-md font-bold uppercase">Atual</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <DialogFooter className="sticky bottom-0 bg-white pt-4 border-t gap-2">
                                    {editingMinistry && (
                                        <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); setEditingMinistry(null); }} className="rounded-xl h-12 px-8">
                                            Fechar
                                        </Button>
                                    )}
                                    <Button type="submit" className="bg-brand-blue text-white flex-1 rounded-xl h-12 text-lg font-bold" disabled={isSubmitting}>
                                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : editingMinistry ? "Salvar Alterações" : "Criar Ministério e Adicionar Membros"}
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
                        <p className="font-bold italic">Carregando ministérios...</p>
                    </div>
                ) : filteredMinisterios.length === 0 ? (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed rounded-[3rem]">
                        <XCircle className="w-16 h-16 mb-4 opacity-20" />
                        <p className="text-xl font-bold italic text-brand-blue">Nenhum ministério encontrado.</p>
                    </div>
                ) : (
                    filteredMinisterios.map((ministry) => (
                        <Card key={ministry.id} className="group overflow-hidden rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all bg-white p-6">
                            <CardContent className="p-0 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className={`p-3 rounded-2xl ${ministry.cor || "bg-brand-blue/5 text-brand-blue"}`}>
                                        <Flame className="w-6 h-6" />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => openEdit(ministry)} className="text-gray-400 hover:text-brand-blue rounded-xl">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => deleteMinistry(ministry.id)} className="text-gray-400 hover:text-red-500 rounded-xl">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-brand-blue italic leading-tight">{ministry.nome}</h3>
                                    <p className="text-gray-500 text-xs line-clamp-1 italic">
                                        {ministry.descricao || "Sem descrição."}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-2xl flex items-center gap-3">
                                    <Users className="w-4 h-4 text-brand-blue opacity-50" />
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Coordenador Atual</p>
                                        <p className="text-xs font-bold text-brand-blue truncate">
                                            {ministry.currentCoordinator || "Não definido na Gestão"}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-2 border-t flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    <span>Ordem: {ministry.ordem}</span>
                                    <button onClick={() => openEdit(ministry)} className="flex items-center gap-1 hover:text-brand-blue transition-colors">
                                        <Info className="w-3 h-3" /> Gerenciar
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
