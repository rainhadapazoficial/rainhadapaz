"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
    Users, MapPin, Calendar, Clock, Phone, Globe,
    Facebook, Instagram, Search, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function GruposPublicPage() {
    const [groups, setGroups] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageSettings, setPageSettings] = useState<any>({
        title: "Grupos de Oração",
        subtitle: "Encontre um Grupo de Oração da Renovação Carismática Católica mais próximo de você e venha vivenciar Pentecostes!",
        image_url: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop"
    });

    useEffect(() => {
        fetchGroups();
        fetchPageSettings();
    }, []);

    async function fetchPageSettings() {
        const { data, error } = await supabase
            .from("site_settings")
            .select("value")
            .eq("key", "groups_page")
            .single();

        if (data) setPageSettings(data.value);
    }

    async function fetchGroups() {
        setIsLoading(true);
        const { data, error } = await supabase
            .from("groups")
            .select("*")
            .order("nome", { ascending: true });

        if (error) console.error("Error fetching groups:", error);
        else setGroups(data || []);
        setIsLoading(false);
    }

    const filteredGroups = groups.filter(g =>
        g.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.cidade.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Hero Section */}
            <div
                className="relative text-white py-24 px-4 overflow-hidden bg-brand-blue"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 77, 44, 0.8), rgba(0, 77, 44, 0.9)), url(${pageSettings.image_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="max-w-7xl mx-auto text-center space-y-6 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold italic tracking-tight">
                        {pageSettings.title.split(' ').map((word: string, i: number) =>
                            word.toLowerCase() === 'oração' ? <span key={i} className="text-brand-gold"> {word}</span> : i === 0 ? word : ` ${word}`
                        )}
                    </h1>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                        {pageSettings.subtitle}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 -mt-10">
                {/* Search Bar */}
                <div className="bg-white p-6 rounded-[2.5rem] shadow-xl mb-12 flex flex-col md:flex-row gap-4 items-center border border-brand-blue/5">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            placeholder="Buscar por nome do grupo ou cidade..."
                            className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Groups Grid */}
                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                        <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="font-bold italic">Carregando grupos...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredGroups.length > 0 ? (
                            filteredGroups.map((group) => (
                                <Card key={group.id} className="group overflow-hidden rounded-[3rem] border-none shadow-sm hover:shadow-2xl transition-all duration-500 bg-white flex flex-col">
                                    <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-brand-blue/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-blue transition-colors duration-500">
                                                <Users className="w-8 h-8 text-brand-blue group-hover:text-white transition-colors duration-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-brand-blue italic line-clamp-1">{group.nome}</h3>
                                                <p className="text-brand-gold font-bold flex items-center gap-1 uppercase tracking-widest text-[10px]">
                                                    <MapPin className="w-3 h-3" /> {group.cidade}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 text-gray-600">
                                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                                                <Clock className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold text-gray-400">Quando acontece</p>
                                                    <p className="font-medium">{group.dia}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                                                <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold text-gray-400">Localização</p>
                                                    <p className="font-medium">{group.local}</p>
                                                </div>
                                            </div>
                                            {group.coordenador && (
                                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                                                    <Users className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="text-[10px] uppercase font-bold text-gray-400">Coordenação</p>
                                                        <p className="font-medium">{group.coordenador}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="pt-6 mt-auto space-y-4">
                                            <div className="flex gap-2 justify-center">
                                                {group.whatsapp && (
                                                    <a href={group.whatsapp} target="_blank" rel="noopener noreferrer" className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all transform hover:scale-110">
                                                        <MessageCircle className="w-5 h-5 fill-current" />
                                                    </a>
                                                )}
                                                {group.instagram && (
                                                    <a href={group.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-600 hover:text-white transition-all transform hover:scale-110">
                                                        <Instagram className="w-5 h-5" />
                                                    </a>
                                                )}
                                                {group.facebook && (
                                                    <a href={group.facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110">
                                                        <Facebook className="w-5 h-5" />
                                                    </a>
                                                )}
                                                {group.site && (
                                                    <a href={group.site} target="_blank" rel="noopener noreferrer" className="p-3 bg-brand-blue/5 text-brand-blue rounded-xl hover:bg-brand-blue hover:text-white transition-all transform hover:scale-110">
                                                        <Globe className="w-5 h-5" />
                                                    </a>
                                                )}
                                            </div>

                                            {group.geolocalizacao && (
                                                <a href={group.geolocalizacao} target="_blank" rel="noopener noreferrer" className="block">
                                                    <Button variant="outline" className="w-full h-12 rounded-xl border-brand-blue/10 hover:border-brand-blue hover:bg-brand-blue hover:text-white transition-all gap-2">
                                                        <MapPin className="w-4 h-4" />
                                                        Como Chegar
                                                    </Button>
                                                </a>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed rounded-[3rem] bg-white">
                                <Search className="w-16 h-16 mb-4 opacity-10" />
                                <p className="text-xl font-bold italic text-brand-blue">Nenhum grupo encontrado.</p>
                                <p className="text-sm">Tente buscar por outro nome ou cidade.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
