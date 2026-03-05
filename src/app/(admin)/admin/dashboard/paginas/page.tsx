"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2, Globe, Eye } from "lucide-react";
import Link from "next/link";

export default function PaginasAdminPage() {
    const [pages, setPages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPages();
    }, []);

    async function fetchPages() {
        const { data, error } = await supabase
            .from("custom_pages")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            setPages(data);
        }
        setIsLoading(false);
    }

    async function deletePage(id: number) {
        if (!confirm("Tem certeza que deseja excluir esta página?")) return;

        const { error } = await supabase
            .from("custom_pages")
            .delete()
            .eq("id", id);

        if (!error) {
            fetchPages();
        }
    }

    const roots = [
        { id: "quem-somos", label: "Quem Somos" },
        { id: "formacao", label: "Formação" },
        { id: "eventos", label: "Eventos" },
        { id: "especiais", label: "Especiais" },
        { id: "nenhum", label: "Páginas Isoladas" }
    ];

    const renderPageCard = (page: any, depth = 0) => (
        <Card key={page.id} className={`rounded-3xl border-none shadow-sm hover:shadow-md transition-all ${depth > 0 ? 'ml-8 md:ml-12 mt-2 bg-gray-50/50' : 'bg-white'}`}>
            <CardContent className="p-4 md:p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {depth > 0 && <div className="w-4 h-px bg-gray-300 shrink-0" />}
                    <div className="space-y-1">
                        <h3 className={`font-bold text-gray-900 ${depth > 0 ? 'text-lg' : 'text-xl'}`}>{page.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-[10px] md:text-xs text-gray-400">
                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-bold uppercase">/{page.slug}</span>
                            <span className={page.is_published ? "text-blue-500 font-bold" : "text-amber-500 font-bold"}>
                                {page.is_published ? "Publicado" : "Rascunho"}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                    <Link href={`/p/${page.slug}`} target="_blank">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-brand-blue h-8 w-8">
                            <Eye className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Link href={`/admin/dashboard/paginas/${page.id}`}>
                        <Button variant="outline" size="icon" className="rounded-xl border-gray-100 text-brand-blue hover:bg-brand-blue hover:text-white transition-all h-8 w-8 md:h-10 md:w-10">
                            <Edit2 className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deletePage(page.id)}
                        className="rounded-xl border-gray-100 text-red-500 hover:bg-red-50 transition-all h-8 w-8 md:h-10 md:w-10"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    const buildTree = (rootId: string) => {
        // Direct children of the root menu
        const rootChildren = pages.filter(p => p.parent_menu === rootId);

        return rootChildren.map(parentPage => {
            // Children of this page
            const subPages = pages.filter(p => p.parent_menu === parentPage.title);

            return (
                <div key={parentPage.id} className="space-y-2">
                    {renderPageCard(parentPage)}
                    {subPages.map(subPage => renderPageCard(subPage, 1))}
                </div>
            );
        });
    };

    return (
        <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-brand-blue italic flex items-center gap-3">
                        <Globe className="w-8 h-8 text-brand-gold" />
                        Gerenciar Páginas Dinâmicas
                    </h1>
                    <p className="text-gray-500 text-sm">Organize a estrutura de menus e submenus do site.</p>
                </div>
                <Link href="/admin/dashboard/paginas/novo">
                    <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl px-8 h-12 shadow-lg shadow-brand-blue/20">
                        <Plus className="w-4 h-4 mr-2 text-brand-gold" />
                        Criar Nova Página
                    </Button>
                </Link>
            </div>

            <div className="space-y-12">
                {isLoading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="w-8 h-8 border-4 border-brand-blue border-t-brand-gold rounded-full animate-spin" />
                    </div>
                ) : pages.length > 0 ? (
                    roots.map(root => {
                        const trees = buildTree(root.id);
                        if (trees.length === 0) return null;

                        return (
                            <div key={root.id} className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 whitespace-nowrap pl-2">{root.label}</h2>
                                    <div className="h-px bg-gray-100 w-full" />
                                </div>
                                <div className="space-y-4">
                                    {trees}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-24 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                        <Globe className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-400 italic font-medium">Nenhuma página dinâmica criada ainda.</p>
                        <Link href="/admin/dashboard/paginas/novo" className="mt-4 inline-block">
                            <Button variant="link" className="text-brand-blue font-bold">Começar a criar agora</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
