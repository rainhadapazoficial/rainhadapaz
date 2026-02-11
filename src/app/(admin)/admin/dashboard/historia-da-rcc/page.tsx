import { supabase } from "@/lib/supabase";
import { HistoriaRCCAdminClient } from "./HistoriaRCCAdminClient";

export const dynamic = "force-dynamic";

export default async function HistoriaRCCAdminPage() {
    const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "historia_rcc_content")
        .single();

    return <HistoriaRCCAdminClient initialData={data?.value} />;
}
