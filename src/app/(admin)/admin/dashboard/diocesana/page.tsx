import { supabase } from "@/lib/supabase";
import { DioceseAdminClient } from "./DioceseAdminClient";

export const dynamic = "force-dynamic";

export default async function DioceseAdminPage() {
    const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "historia_diocese_content")
        .single();

    return <DioceseAdminClient initialData={data?.value} />;
}
