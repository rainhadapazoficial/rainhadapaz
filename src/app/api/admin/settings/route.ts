import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.from('system_settings').select('*');

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Transform array to object for easier use
    const settings = data.reduce((acc: any, curr: any) => {
        acc[curr.settings_key] = curr.settings_value;
        return acc;
    }, {});

    return NextResponse.json(settings);
}

export async function POST(req: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const { key, value } = await req.json();

    if (!key) return NextResponse.json({ error: 'Chave não informada' }, { status: 400 });

    const { error } = await supabase
        .from('system_settings')
        .upsert({
            settings_key: key,
            settings_value: value,
            updated_at: new Date().toISOString()
        }, { onConflict: 'settings_key' });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
}
