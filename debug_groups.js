const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const s = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log("Checking groups and history...");
    const { data: groups } = await s.from('groups').select('id, nome');
    const { data: history } = await s.from('group_coordinator_history').select('id, group_id, nome, gestao');

    console.log("\nGroups in DB:");
    console.table(groups);

    console.log("\nHistory in DB:");
    console.table(history);

    if (history && groups) {
        const groupIds = groups.map(g => g.id);
        const orphanHistory = history.filter(h => !groupIds.includes(h.group_id));
        if (orphanHistory.length > 0) {
            console.log("\n❌ FOUND ORPHAN HISTORY (No matching group_id):");
            console.table(orphanHistory);
        } else {
            console.log("\n✅ All history items have matching groups.");
        }
    }
}

check();
