"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Quem Somos", href: "/quem-somos" },
    { name: "Ministérios", href: "/ministerios" },
    { name: "Blog", href: "/blog" },
    { name: "Eventos", href: "/eventos" },
    { name: "Podcast", href: "/podcast" },
    { name: "Contato", href: "/contato" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-3">
                            <img
                                src="https://www.rccdesinop.com.br/wp-content/uploads/2025/06/Logo-RCC-Diocese-de-Sinop-PNG-150x150.png"
                                alt="RCC Diocese de Sinop Logo"
                                className="w-12 h-12 rounded-full object-cover shadow-sm border border-brand-blue/10"
                            />
                            <span className="text-xl font-bold text-brand-blue hidden md:block">
                                Diocese de Sinop
                            </span>
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-700 hover:text-brand-blue transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a href="https://wa.me/5566981365456" target="_blank" rel="noopener noreferrer">
                            <Button className="bg-[#25D366] hover:bg-[#20ba5a] text-white gap-2">
                                <MessageCircle className="w-4 h-4 fill-current" />
                                Fale agora conosco
                            </Button>
                        </a>
                    </div>

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
                <div className="lg:hidden bg-white border-t p-4 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-base font-medium text-gray-700 hover:text-brand-blue"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a href="https://wa.me/5566981365456" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="block">
                        <Button className="w-full bg-[#25D366] text-white gap-2">
                            <MessageCircle className="w-4 h-4 fill-current" />
                            Fale agora conosco
                        </Button>
                    </a>
                </div>
            )}
        </nav>
    );
}
