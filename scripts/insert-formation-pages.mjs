
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function insertPages() {
    console.log('Inserting pages...')

    // Insert Módulo Básico
    const { data: p1, error: e1 } = await supabase
        .from('custom_pages')
        .upsert({
            title: 'Módulo Básico de Formação',
            slug: 'modulo-basico',
            content: `<div class="space-y-6">
        <p class="text-lg">Compreende 8 apostilas que oferecem uma base sólida doutrinária, espiritual, humana e comunitária.</p>
        <div class="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h4 class="text-xl font-bold text-brand-blue mb-4 italic">As 8 Apostilas (Fase Catequética):</h4>
            <ol class="grid md:grid-cols-2 gap-4 list-none p-0">
                <li class="flex gap-3 items-center"><span class="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">01</span> Vida Cristã 1</li>
                <li class="flex gap-3 items-center"><span class="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">02</span> Identidade</li>
                <li class="flex gap-3 items-center"><span class="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">03</span> Jesus, Senhor e Mestre e Vida no Espírito</li>
                <li class="flex gap-3 items-center"><span class="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">04</span> Grupo de Oração</li>
                <li class="flex gap-3 items-center"><span class="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">05</span> Vida de Oração</li>
                <li class="flex gap-3 items-center"><span class="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">06</span> Carismas: Dons do Espírito</li>
                <li class="flex gap-3 items-center"><span class="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">07</span> Igreja</li>
                <li class="flex gap-3 items-center"><span class="w-8 h-8 bg-brand-gold text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">08</span> Vida Cristã 2</li>
            </ol>
        </div>
    </div>`,
            parent_menu: 'formacao',
            is_published: true,
            image_url: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000'
        }, { onConflict: 'slug' })

    if (e1) console.error('Error inserting Modulo Basico:', e1)
    else console.log('Modulo Basico inserted successfully')

    // Insert Formação Específica
    const { data: p2, error: e2 } = await supabase
        .from('custom_pages')
        .upsert({
            title: 'Formação Específica',
            slug: 'formacao-especifica',
            content: `<div class="space-y-8">
        <p class="text-xl leading-relaxed text-gray-700">A Formação Específica na RCC é a terceira fase do processo formativo, focada em capacitar líderes e servos para ministérios específicos após o Querigma e o Módulo Básico.</p>
        
        <div class="bg-brand-blue text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            <h4 class="text-2xl font-bold mb-6 italic flex items-center gap-3">
                <span class="w-2 h-8 bg-brand-gold rounded-full" />
                Objetivo do Ministério
            </h4>
            <p class="text-lg leading-relaxed opacity-90">
                Preparar servos para atuar com eficácia no Grupo de Oração e na evangelização, conforme o chamado pessoal. Visa o serviço pastoral e missionário, garantindo a identidade carismática e o aprofundamento na vivência do Batismo no Espírito Santo.
            </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 items-start">
            <div class="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <h4 class="text-2xl font-bold text-brand-blue mb-6 italic">Foco Ministerial:</h4>
                <div class="grid grid-cols-1 gap-3">
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-brand-gold/5 transition-colors">
                        <span class="w-2 h-2 bg-brand-gold rounded-full" />
                        <span class="font-bold text-gray-700">Música e Artes</span>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-brand-gold/5 transition-colors">
                        <span class="w-2 h-2 bg-brand-gold rounded-full" />
                        <span class="font-bold text-gray-700">Pregação</span>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-brand-gold/5 transition-colors">
                        <span class="w-2 h-2 bg-brand-gold rounded-full" />
                        <span class="font-bold text-gray-700">Intercessão</span>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-brand-gold/5 transition-colors">
                        <span class="w-2 h-2 bg-brand-gold rounded-full" />
                        <span class="font-bold text-gray-700">Fé e Política</span>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-brand-gold/5 transition-colors">
                        <span class="w-2 h-2 bg-brand-gold rounded-full" />
                        <span class="font-bold text-gray-700">Formação</span>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-brand-gold/5 transition-colors">
                        <span class="w-2 h-2 bg-brand-gold rounded-full" />
                        <span class="font-bold text-gray-700">Jovem e Universitários</span>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-brand-gold/5 transition-colors">
                        <span class="w-2 h-2 bg-brand-gold rounded-full" />
                        <span class="font-bold text-gray-700">Crianças e Adolescentes</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-gray-900 text-white p-12 rounded-[2.5rem] h-full flex flex-col justify-center relative overflow-hidden">
                <div class="absolute inset-0 bg-brand-blue/20" />
                <p class="text-2xl font-bold italic mb-6 relative z-10 leading-relaxed text-brand-gold">
                    "Treinamento técnico e espiritual para que cada servo floresça em seu ministério conforme o chamado pessoal."
                </p>
                <div class="w-16 h-1 bg-brand-gold rounded-full relative z-10" />
            </div>
        </div>
    </div>`,
            parent_menu: 'formacao',
            is_published: true,
            image_url: 'https://images.unsplash.com/photo-1510915228340-29c85a43dbfe?q=80&w=1000'
        }, { onConflict: 'slug' })

    if (e2) console.error('Error inserting Formacao Especifica:', e2)
    else console.log('Formacao Especifica inserted successfully')
}

insertPages()
