"use client";

import parse from "html-react-parser";
import { motion } from "framer-motion";

export default function PageClient({ page }: { page: any }) {
    return (
        <main className="min-h-screen bg-[#f8fafc] overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-brand-blue overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-24 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center"
                    >
                        <span className="inline-block px-4 py-1.5 bg-brand-gold/10 text-brand-gold text-xs font-black uppercase tracking-[0.3em] rounded-full mb-6 backdrop-blur-md border border-brand-gold/20">
                            Rainha da Paz • Portal
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                            {page.title}
                        </h1>
                        <div className="w-32 h-2 bg-gradient-to-r from-brand-gold to-brand-gold/0 mx-auto rounded-full" />
                    </motion.div>
                </div>
            </section>

            {/* Content Area */}
            <section className="relative pb-32 px-4 z-10">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="glass-card rounded-[2.5rem] p-8 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]"
                    >
                        <article className="premium-prose">
                            {parse(page.content)}
                        </article>
                    </motion.div>

                    {/* Footer Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gray-400 font-bold text-[10px] uppercase tracking-widest"
                    >
                        <div className="flex items-center gap-3 bg-white py-2 px-4 rounded-full border border-gray-100 shadow-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            Conteúdo Oficial
                        </div>
                        <div>Grupo de Oração Rainha da Paz</div>
                        <div>{new Date().getFullYear()}</div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
