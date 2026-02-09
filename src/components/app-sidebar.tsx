"use client";

import * as React from "react";
import { Newspaper, Calendar, LayoutDashboard, Mail, LogOut, Settings, Heart, Image as ImageIcon, Monitor } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Notícias",
            url: "/admin/dashboard/noticias",
            icon: Newspaper,
        },
        {
            title: "Agenda",
            url: "/admin/dashboard/eventos",
            icon: Calendar,
        },
        {
            title: "Pedidos de Oração",
            url: "/admin/dashboard/pedidos",
            icon: Mail,
        },
        {
            title: "Banner Início",
            url: "/admin/dashboard/banners",
            icon: Monitor,
        },
    ],
    projects: [
        {
            title: "Ver Site Público",
            url: "/",
            icon: Heart,
        },
        {
            title: "Configurações",
            url: "/admin/dashboard/configuracoes",
            icon: Settings,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    return (
        <Sidebar collapsible="icon" {...props} className="border-r border-brand-blue/5">
            <SidebarHeader className="bg-brand-blue text-white py-6">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-3 px-3">
                            <img
                                src="https://yt3.googleusercontent.com/ytc/AIdro_nHlljA3Swn3XHKIA9PXmA-Qh0QQwgj2dEXAAuL_7Wmig=s900-c-k-c0x00ffffff-no-rj"
                                alt="Logo"
                                className="w-10 h-10 rounded-xl object-cover shadow-lg"
                            />
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-bold italic text-brand-gold">Rainha da Paz</span>
                                <span className="truncate text-[10px] uppercase tracking-widest text-blue-200">Painel Admin</span>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="p-4">
                <SidebarMenu className="space-y-1">
                    <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Principal</div>
                    {data.navMain.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title} asChild className="h-12 rounded-xl hover:bg-brand-blue/5 hover:text-brand-blue transition-all group">
                                <Link href={item.url}>
                                    <item.icon className="group-hover:text-brand-gold transition-colors" />
                                    <span className="font-medium">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                <SidebarMenu className="mt-8 space-y-1">
                    <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sistema</div>
                    {data.projects.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title} asChild className="h-12 rounded-xl hover:bg-brand-blue/5 hover:text-brand-blue transition-all group">
                                <Link href={item.url}>
                                    <item.icon className="group-hover:text-brand-gold transition-colors" />
                                    <span className="font-medium">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t border-gray-50">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Sair"
                            onClick={handleLogout}
                            className="h-12 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                            <LogOut />
                            <span className="font-bold">Sair do Painel</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
