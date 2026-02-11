import { supabase } from "@/lib/supabase";
import { ARCCAdminClient } from "./ARCCAdminClient";

export const metadata = {
    title: "Gestão A RCC | Admin",
    description: "Gerencie o conteúdo da página A RCC",
};

export default async function ARCCAdminPage() {
    const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "a_rcc_content")
        .single();

    return (
        <div className="p-6">
            <ARCCAdminClient initialData={data?.value} />
        </div>
    );
}
