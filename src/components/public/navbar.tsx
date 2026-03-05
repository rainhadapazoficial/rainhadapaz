"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, ChevronDown, Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

type NavItem = {
    name: string;
    href?: string;
    children?: NavItem[];
};

const defaultNavLinks: NavItem[] = [
    {
        name: "Quem Somos",
        children: [
            { name: "Sobre Nós", href: "/quem-somos" },
            { name: "O Grupo", href: "/a-rcc" },
            { name: "Nossa História", href: "/historia-da-rcc" },
            { name: "Gestão", href: "/quem-somos/gestao" },
        ]
    },

    { name: "Ministérios", href: "/ministerios" },
    {
        name: "Formação",
        children: [
            { name: "Processo Formativo", href: "/formacao" },
            { name: "Seminário de Vida", href: "/formacao/seminario-de-vida" },
        ]
    },
    { name: "Blog", href: "/blog" },
    {
        name: "Eventos",
        children: [
            { name: "Calendário", href: "/calendario" },
        ]
    },
    {
        name: "Especiais",
        children: [
            { name: "Jubileu de Ouro", href: "/especiais/jubileu-de-ouro" },
        ]
    },
    { name: "Contato", href: "/contato" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
    const [navLinks, setNavLinks] = useState<NavItem[]>(defaultNavLinks);

    useEffect(() => {
        fetchDynamicPages();
    }, []);

    const fetchDynamicPages = async () => {
        const { data, error } = await supabase
            .from("custom_pages")
            .select("title, slug, parent_menu")
            .eq("is_published", true);

        if (!error && data) {
            const normalize = (str: string) =>
                str.toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "-");

            // Build a tree structure
            const buildTree = (items: any[], parentName: string): NavItem[] => {
                return items
                    .filter(p => normalize(p.parent_menu || "") === normalize(parentName))
                    .map(p => ({
                        name: p.title,
                        href: p.slug === 'festa-rei-jesus' ? '/festa-rei-jesus' : `/p/${p.slug}`,
                        children: buildTree(items, p.title) // Recursively find children for THIS page
                    }));
            };

            const updatedLinks = defaultNavLinks.map(link => {
                const dynamicChildren = buildTree(data, link.name);

                if (dynamicChildren.length > 0) {
                    return {
                        ...link,
                        children: [...(link.children || []), ...dynamicChildren]
                    };
                }
                return link;
            });
            setNavLinks(updatedLinks);
        }
    };

    const toggleMobileSubmenu = (name: string) => {
        setMobileSubmenu(mobileSubmenu === name ? null : name);
    };

    // Recursive desktop sub-menu renderer
    const renderSubMenu = (item: NavItem) => {
        if (item.children && item.children.length > 0) {
            return (
                <DropdownMenuSub key={item.name}>
                    <DropdownMenuSubTrigger className="w-full cursor-pointer hover:text-brand-blue hover:bg-slate-50 px-3 py-2 text-sm justify-between">
                        {item.name}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="bg-white">
                        {item.children.map(child => renderSubMenu(child))}
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
            );
        }
        return (
            <DropdownMenuItem key={item.name} asChild>
                <Link href={item.href || "#"} className="w-full cursor-pointer hover:text-brand-blue hover:bg-slate-50 px-3 py-2 text-sm">
                    {item.name}
                </Link>
            </DropdownMenuItem>
        );
    };

    // Recursive mobile sub-menu renderer
    const renderMobileSubMenu = (item: NavItem, depth = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isSelected = mobileSubmenu?.split('|').includes(item.name);

        return (
            <div key={item.name} className="space-y-1">
                {hasChildren ? (
                    <>
                        <button
                            onClick={() => toggleMobileSubmenu(item.name)}
                            className={`flex items-center justify-between w-full text-base font-medium py-2 ${depth > 0 ? 'text-gray-600 pl-4' : 'text-gray-700'}`}
                        >
                            {item.name}
                            <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenu === item.name ? "rotate-180" : ""}`} />
                        </button>
                        {mobileSubmenu === item.name && (
                            <div className={`border-l-2 border-brand-blue/10 ml-1 ${depth > 0 ? 'pl-4' : 'pl-4'}`}>
                                {item.children!.map(child => renderMobileSubMenu(child, depth + 1))}
                            </div>
                        )}
                    </>
                ) : (
                    <Link
                        href={item.href || "#"}
                        onClick={() => setIsOpen(false)}
                        className={`block text-base py-2 ${depth > 0 ? (depth > 1 ? 'text-gray-500 text-sm pl-8' : 'text-gray-600 pl-4') : 'text-gray-700 font-medium'}`}
                    >
                        {item.name}
                    </Link>
                )}
            </div>
        );
    };

    return (
        <nav className="bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-3">
                            <img
                                src="/logo-rainha.jpg"
                                alt="Grupo Rainha da Paz Logo"
                                className="h-16 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {navLinks.map((link) => {
                            if (link.children && link.children.length > 0) {
                                return (
                                    <DropdownMenu key={link.name}>
                                        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-brand-blue transition-colors outline-none">
                                            {link.name}
                                            <ChevronDown className="w-4 h-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-white">
                                            {link.children.map(child => renderSubMenu(child))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                );
                            }
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href!}
                                    className="text-sm font-medium text-gray-700 hover:text-brand-blue transition-colors"
                                >
                                    {link.name}
                                </Link>
                            );
                        })}

                        <div className="flex items-center gap-4 px-2 border-x border-gray-100">
                            <a href="https://www.instagram.com/rainhadapazsinop" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://www.facebook.com/rainhadapazsinop" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://www.youtube.com/@rainhadapazsinop" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>

                        <a href="https://wa.me/5566981365456" target="_blank" rel="noopener noreferrer">
                            <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white gap-2 rounded-full px-6">
                                <MessageCircle className="w-4 h-4 fill-current" />
                                Fale agora conosco
                            </Button>
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-brand-blue p-2"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t p-4 space-y-2 shadow-xl animate-in slide-in-from-top duration-300 max-h-[80vh] overflow-y-auto">
                    {navLinks.map((link) => renderMobileSubMenu(link))}

                    <div className="pt-4 border-t mt-2 space-y-4">
                        <div className="flex justify-center gap-8 py-2">
                            <a href="https://www.instagram.com/rainhadapazsinop" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="https://www.facebook.com/rainhadapazsinop" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors">
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="https://www.youtube.com/@rainhadapazsinop" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors">
                                <Youtube className="w-6 h-6" />
                            </a>
                        </div>
                        <a href="https://wa.me/5566981365456" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="block">
                            <Button className="w-full bg-brand-blue text-white gap-2 rounded-xl py-6 text-lg">
                                <MessageCircle className="w-5 h-5 fill-current" />
                                Fale agora conosco
                            </Button>
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
