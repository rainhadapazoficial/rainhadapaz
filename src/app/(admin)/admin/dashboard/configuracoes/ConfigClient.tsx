"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Eye, EyeOff, CheckCircle2 } from "lucide-react";

interface ConfigClientProps {
    mcpUrl: string;
    mcpToken: string;
}

export function ConfigClient({ mcpUrl, mcpToken }: ConfigClientProps) {
    const [showToken, setShowToken] = useState(false);
    const [copiedUrl, setCopiedUrl] = useState(false);
    const [copiedToken, setCopiedToken] = useState(false);

    const copyToClipboard = (text: string, setStatus: (val: boolean) => void) => {
        navigator.clipboard.writeText(text);
        setStatus(true);
        setTimeout(() => setStatus(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">URL do Servidor MCP</label>
                <div className="flex gap-2">
                    <div className="flex-1 bg-gray-50 p-4 rounded-xl border text-sm font-mono text-gray-600 truncate">
                        {mcpUrl}
                    </div>
                    <Button
                        variant="outline"
                        className="rounded-xl h-full px-4 border-brand-blue/20 hover:bg-brand-blue hover:text-white transition-all"
                        onClick={() => copyToClipboard(mcpUrl, setCopiedUrl)}
                    >
                        {copiedUrl ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Token de Autenticação (Bearer)</label>
                <div className="flex gap-2">
                    <div className="flex-1 bg-gray-50 p-4 rounded-xl border text-sm font-mono text-brand-blue flex items-center justify-between">
                        <span className="truncate max-w-[200px] md:max-w-md">
                            {showToken ? mcpToken : "••••••••••••••••••••••••••••••••"}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowToken(!showToken)}
                            className="h-6 w-6 p-0 hover:bg-transparent"
                        >
                            {showToken ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                        </Button>
                    </div>
                    <Button
                        variant="outline"
                        className="rounded-xl h-full px-4 border-brand-blue/20 hover:bg-brand-blue hover:text-white transition-all"
                        onClick={() => copyToClipboard(mcpToken, setCopiedToken)}
                    >
                        {copiedToken ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                </div>
            </div>

            <div className="p-6 bg-brand-gold/5 rounded-3xl border border-brand-gold/20">
                <h4 className="font-bold text-brand-blue mb-2 italic">Como usar no Antigravity:</h4>
                <ol className="text-xs text-gray-600 space-y-2 list-decimal ml-4">
                    <li>Copie a <strong>URL</strong> e o <strong>Token</strong> acima.</li>
                    <li>No menu da IA (MCP), adicione um novo servidor customizado.</li>
                    <li>Use o comando de transporte <strong>HTTP</strong> ou <strong>Curl</strong>.</li>
                    <li>Pronto! A IA passará a enxergar seus dados automaticamente.</li>
                </ol>
            </div>
        </div>
    );
}
