-- Seed Terms of Use page
INSERT INTO public.custom_pages (title, slug, content, is_published)
VALUES (
    'Termos de Uso',
    'termos-de-uso',
    '<h2>1. Aceitação dos Termos</h2>
    <p>Ao acessar este site, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.</p>
    
    <h2>2. Uso de Licença</h2>
    <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site do Grupo Rainha da Paz, apenas para visualização transitória pessoal e não comercial.</p>
    
    <h2>3. Isenção de Responsabilidade</h2>
    <p>Os materiais no site do Grupo Rainha da Paz são fornecidos "como estão". O Grupo Rainha da Paz não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>
    
    <h2>4. Limitações</h2>
    <p>Em nenhum caso o Grupo Rainha da Paz ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais no site.</p>',
    true
)
ON CONFLICT (slug) DO UPDATE 
SET title = EXCLUDED.title, 
    content = EXCLUDED.content, 
    is_published = EXCLUDED.is_published,
    updated_at = NOW();
