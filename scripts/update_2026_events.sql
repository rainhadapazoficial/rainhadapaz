-- UPDATE 2026 EVENTS AGENDA
-- Run this in Supabase SQL Editor

-- 1. Clear current events
TRUNCATE TABLE public.events;

-- 2. Insert new 2026 events
INSERT INTO public.events (title, description, date, time, location, category) VALUES
('Início do Seminário de Vida Rainha da Paz', 'Início da nossa caminhada de 8 semanas de Seminário de Vida no Espírito Santo.', '2026-03-07', '19:30', 'Matriz da Paróquia Santo Antônio', 'Seminário'),
('Encerramento do Seminário de Vida Rainha da Paz', 'Grande encerramento do Seminário de Vida no Espírito Santo.', '2026-04-25', '19:30', 'Matriz da Paróquia Santo Antônio', 'Seminário'),
('Experiência de Oração Rainha da Paz (Dia 1)', 'Um final de semana de profunda imersão e oração.', '2026-05-09', '13:30', 'Matriz da Paróquia Santo Antônio', 'Retiro'),
('Experiência de Oração Rainha da Paz (Dia 2)', 'Continuação da nossa Experiência de Oração.', '2026-05-10', '07:30', 'Matriz da Paróquia Santo Antônio', 'Retiro'),
('Formação Básica: Apostila 1 (Sáb)', 'Módulo Básico de Formação da RCC.', '2026-06-13', '13:30', 'Matriz da Paróquia Santo Antônio', 'Formação'),
('Formação Básica: Apostila 1 (Dom)', 'Módulo Básico de Formação da RCC.', '2026-06-14', '07:30', 'Matriz da Paróquia Santo Antônio', 'Formação'),
('Formação Básica: Apostila 2 (Sáb)', 'Continuação dos estudos do Módulo Básico.', '2026-06-27', '13:30', 'Matriz da Paróquia Santo Antônio', 'Formação'),
('Formação Básica: Apostila 2 (Dom)', 'Continuação dos estudos do Módulo Básico.', '2026-06-28', '07:30', 'Matriz da Paróquia Santo Antônio', 'Formação'),
('Formação Básica: Apostila 3 (Sáb)', 'Aprofundamento na doutrina e identidade da RCC.', '2026-07-11', '13:30', 'Matriz da Paróquia Santo Antônio', 'Formação'),
('Formação Básica: Apostila 3 (Dom)', 'Aprofundamento na doutrina e identidade da RCC.', '2026-07-12', '07:30', 'Matriz da Paróquia Santo Antônio', 'Formação'),
('Formação Básica: Apostila 4 (Sáb)', 'Formação para servos e ministérios.', '2026-08-01', '13:30', 'Matriz da Paróquia Santo Antônio', 'Formação'),
('Formação Básica: Apostila 4 (Dom)', 'Formação para servos e ministérios.', '2026-08-02', '07:30', 'Matriz da Paróquia Santo Antônio', 'Formação'),
('Formação Básica: Apostila 5 (Sáb)', 'Estudos bíblicos e carismas.', '2026-09-19', '13:30', 'Matriz da Paróquia Santo Antônio', 'Formação'),
('Formação Básica: Apostila 5 (Dom)', 'Estudos bíblicos e carismas.', '2026-09-20', '07:30', 'Matriz da Paróquia Santo Antônio', 'Formação'),
('Formação Básica: Apostila 6 (Sáb)', 'Liderança e serviço na Igreja.', '2026-10-24', '13:30', 'Matriz da Paróquia Santo Antônio', 'Formação'),
('Formação Básica: Apostila 6 (Dom)', 'Liderança e serviço na Igreja.', '2026-10-25', '07:30', 'Matriz da Paróquia Santo Antônio', 'Formação'),
('Formação Básica: Apostila 7 (Sáb)', 'Vida comunitária e missão.', '2026-11-07', '13:30', 'Matriz da Paróquia Santo Antônio', 'Formação'),
('Formação Básica: Apostila 7 (Dom)', 'Vida comunitária e missão.', '2026-11-08', '07:30', 'Matriz da Paróquia Santo Antônio', 'Formação'),
('Formação Básica: Apostila 8 (Sáb)', 'Encerramento do Módulo Básico.', '2026-12-05', '13:30', 'Matriz da Paróquia Santo Antônio', 'Formação'),
('Formação Básica: Apostila 8 (Dom)', 'Encerramento do Módulo Básico.', '2026-12-06', '07:30', 'Matriz da Paróquia Santo Antônio', 'Formação'),
('Início do Recesso 2026', 'Encerramento das atividades anuais do Grupo de Oração.', '2026-12-16', '19:30', 'Matriz da Paróquia Santo Antônio', 'Aviso');
