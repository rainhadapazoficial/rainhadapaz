import { supabase } from "@/lib/supabase";
import { BannerClient } from "./BannerClient";

export default async function BannersPage() {
    const { data } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', 'home_banner')
        .single();

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-brand-blue italic">Gerenciar Banner</h1>
                <p className="text-gray-500">Configure o banner principal da página inicial.</p>
            </div>

            <BannerClient initialData={data?.value || {}} />
        </div>
    );
}
