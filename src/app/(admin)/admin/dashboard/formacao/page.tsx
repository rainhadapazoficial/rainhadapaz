import { supabase } from "@/lib/supabase";
import { FormacaoAdminClient } from "./FormacaoAdminClient";

export const dynamic = "force-dynamic";

export default async function FormacaoAdminPage() {
    const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "formacao_content")
        .single();

    return <FormacaoAdminClient initialData={data?.value} />;
}
