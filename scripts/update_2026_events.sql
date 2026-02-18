-- COMPREHENSIVE UPDATE 2026 (AGENDA + CALENDAR)
-- Run this in Supabase SQL Editor

-- 1. Clear current tables
TRUNCATE TABLE public.events;
TRUNCATE TABLE public.calendario_diocesano;

-- 2. Insert into Events (Public Agenda)
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

-- 3. Insert into Calendário Diocesano (Calendar Page)
INSERT INTO public.calendario_diocesano (titulo, data_inicio, mes, ano, categoria, descricao) VALUES
('Início do Seminário de Vida Rainha da Paz', '2026-03-07', 3, 2026, 'grupo', 'Início da nossa caminhada de 8 semanas.'),
('Encerramento do Seminário de Vida Rainha da Paz', '2026-04-25', 4, 2026, 'grupo', 'Grande encerramento do Seminário.'),
('Experiência de Oração (Dia 1)', '2026-05-09', 5, 2026, 'grupo', 'Imersão e oração.'),
('Experiência de Oração (Dia 2)', '2026-05-10', 5, 2026, 'grupo', 'Continuação da Experiência.'),
('Formação Básica: Apostila 1 (Sáb)', '2026-06-13', 6, 2026, 'grupo', 'Módulo Básico RCC.'),
('Formação Básica: Apostila 1 (Dom)', '2026-06-14', 6, 2026, 'grupo', 'Módulo Básico RCC.'),
('Formação Básica: Apostila 2 (Sáb)', '2026-06-27', 6, 2026, 'grupo', 'Continuação Módulo Básico.'),
('Formação Básica: Apostila 2 (Dom)', '2026-06-28', 6, 2026, 'grupo', 'Continuação Módulo Básico.'),
('Formação Básica: Apostila 3 (Sáb)', '2026-07-11', 7, 2026, 'grupo', 'Identidade RCC.'),
('Formação Básica: Apostila 3 (Dom)', '2026-07-12', 7, 2026, 'grupo', 'Identidade RCC.'),
('Formação Básica: Apostila 4 (Sáb)', '2026-08-01', 8, 2026, 'grupo', 'Formação para servos.'),
('Formação Básica: Apostila 4 (Dom)', '2026-08-02', 8, 2026, 'grupo', 'Formação para servos.'),
('Formação Básica: Apostila 5 (Sáb)', '2026-09-19', 9, 2026, 'grupo', 'Estudos bíblicos.'),
('Formação Básica: Apostila 5 (Dom)', '2026-09-20', 9, 2026, 'grupo', 'Estudos bíblicos.'),
('Formação Básica: Apostila 6 (Sáb)', '2026-10-24', 10, 2026, 'grupo', 'Liderança.'),
('Formação Básica: Apostila 6 (Dom)', '2026-10-25', 10, 2026, 'grupo', 'Liderança.'),
('Formação Básica: Apostila 7 (Sáb)', '2026-11-07', 11, 2026, 'grupo', 'Missão.'),
('Formação Básica: Apostila 7 (Dom)', '2026-11-08', 11, 2026, 'grupo', 'Missão.'),
('Formação Básica: Apostila 8 (Sáb)', '2026-12-05', 12, 2026, 'grupo', 'Encerramento.'),
('Formação Básica: Apostila 8 (Dom)', '2026-12-06', 12, 2026, 'grupo', 'Encerramento.'),
('Início do Recesso 2026', '2026-12-16', 12, 2026, 'grupo', 'Encerramento anual.');
