import { supabase } from "@/lib/supabase";
import { SeminarioVidaAdminClient } from "./SeminarioVidaAdminClient";

export const dynamic = "force-dynamic";

export default async function SeminarioVidaAdminPage() {
    const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "seminario_vida_content")
        .single();

    return <SeminarioVidaAdminClient initialData={data?.value} />;
}
