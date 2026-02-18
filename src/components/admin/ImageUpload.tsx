"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, X, Loader2, UploadCloud } from "lucide-react";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    onRemove: () => void;
    bucket?: string;
    folder?: string;
}

export function ImageUpload({ value, onChange, onRemove, bucket = "media", folder = "noticias" }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${folder}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) {
                alert("Erro no upload: " + uploadError.message);
                return;
            }

            const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
            onChange(data.publicUrl);
        } catch (error: any) {
            alert("Erro inesperado: " + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            {value ? (
                <div className="relative group rounded-2xl overflow-hidden border aspect-video bg-gray-50 flex items-center justify-center">
                    <img src={value} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={onRemove}
                            className="rounded-full"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="relative border-2 border-dashed rounded-2xl p-8 hover:border-brand-blue/50 transition-colors flex flex-col items-center justify-center gap-2 bg-gray-50/50">
                    <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
                        {isUploading ? (
                            <Loader2 className="w-6 h-6 text-brand-blue animate-spin" />
                        ) : (
                            <UploadCloud className="w-6 h-6 text-brand-blue" />
                        )}
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-gray-700">Clique para fazer upload</p>
                        <p className="text-xs text-gray-500">PNG, JPG ou WEBP (Max 2MB)</p>
                    </div>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={isUploading}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
            )}

            <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ou use um link externo</p>
                <div className="flex gap-2">
                    <Input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="https://exemplo.com/imagem.jpg"
                        className="rounded-xl"
                    />
                    {value && (
                        <Button type="button" variant="outline" onClick={onRemove} className="rounded-xl">
                            Limpar
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
