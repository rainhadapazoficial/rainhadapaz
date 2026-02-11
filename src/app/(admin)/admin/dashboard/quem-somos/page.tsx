import { supabase } from "@/lib/supabase";
import { QuemSomosAdminClient } from "./QuemSomosAdminClient";

export const dynamic = "force-dynamic";

export default async function QuemSomosAdminPage() {
    const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "quem_somos_content")
        .single();

    return <QuemSomosAdminClient initialData={data?.value} />;
}
