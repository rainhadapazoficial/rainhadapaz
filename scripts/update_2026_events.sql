-- COMPREHENSIVE UPDATE 2026 (FINAL COMPLETE LIST)
-- Run this in Supabase SQL Editor

-- 1. Ensure schema is correct
ALTER TABLE public.calendario_diocesano ADD COLUMN IF NOT EXISTS descricao TEXT;

-- 2. Clear current tables
TRUNCATE TABLE public.events;
TRUNCATE TABLE public.calendario_diocesano;

-- 3. Insert into Events (Public Agenda - Highlight Events)
INSERT INTO public.events (title, description, date, time, location, category) VALUES
('Início do Seminário de Vida Rainha da Paz', 'Início da nossa caminhada de 8 semanas de Seminário de Vida no Espírito Santo.', '2026-03-07', '19:30', 'Matriz da Paróquia Santo Antônio', 'Seminário'),
('Encontro Nacional de Formação (ENF 2026)', 'O maior encontro de formação da Renovação Carismática Católica do Brasil.', '2026-01-20', '08:00', 'Aparecida - SP', 'Nacional'),
('Encontro Estadual de Formação (EEF 2026)', 'Formação para todos os servos do estado de Mato Grosso.', '2026-04-17', '08:00', 'Sinop - MT', 'Estadual'),
('Congresso Diocesano Jovem', 'Pelo fogo do Teu amor! O despertar dos sentinelas da manhã.', '2026-07-15', '19:00', 'Sinop - MT', 'Diocesano'),
('Jesus no Pantanal', 'Missão de evangelização no estado do Mato Grosso.', '2026-09-04', '08:00', 'Pantanal - MT', 'Estadual'),
('Festa do Rei Jesus', 'Grande celebração do Grupo Rainha da Paz e RCC Sinop.', '2026-11-20', '19:00', 'Sinop - MT', 'Diocesano');

-- 4. Insert into Calendário Diocesano (Full Calendar View)
INSERT INTO public.calendario_diocesano (titulo, data_inicio, data_fim, mes, ano, categoria, descricao) VALUES
-- JANEIRO
('Escola Nacional de Formação Lid. e Min.', '2026-01-09', '2026-01-19', 1, 2026, 'nacional', 'Nacional'),
('Reunião do Conselho Nacional', '2026-01-16', '2026-01-20', 1, 2026, 'nacional', 'Nacional'),
('Escola Nacional de Música e Artes', '2026-01-18', '2026-01-20', 1, 2026, 'nacional', 'Nacional'),
('Encontro Nacional de Formação (ENF 2026)', '2026-01-20', '2026-01-24', 1, 2026, 'nacional', 'Nacional'),

-- FEVEREIRO
('Assembleia do Conselho Estadual', '2026-02-06', '2026-02-07', 2, 2026, 'estadual', 'Estadual'),
('Encontros e Retiros de Carnaval', '2026-02-13', '2026-02-16', 2, 2026, 'diocesano', 'Diocesano'),

-- MARÇO
('Acampamento para Músicos e Artistas', '2026-03-06', '2026-03-07', 3, 2026, 'diocesano', 'Diocesano'),
('Início do Seminário de Vida Rainha da Paz', '2026-03-07', NULL, 3, 2026, 'grupo', 'Grupo de Oração'),
('Reunião do Conselho Diocesano', '2026-03-27', '2026-03-28', 3, 2026, 'diocesano', 'Diocesano'),

-- ABRIL
('Sexta-Feira Santa', '2026-04-02', NULL, 4, 2026, 'diocesano', 'Diocesano'),
('Encontro Estadual de Formação (EEF 2026)', '2026-04-17', '2026-04-18', 4, 2026, 'estadual', 'Estadual'),
('Encerramento do Seminário de Vida Rainha da Paz', '2026-04-25', NULL, 4, 2026, 'grupo', 'Grupo de Oração'),

-- MAIO
('Experiência de Oração (Dia 1)', '2026-05-09', NULL, 5, 2026, 'grupo', 'Grupo de Oração'),
('Experiência de Oração (Dia 2)', '2026-05-10', NULL, 5, 2026, 'grupo', 'Grupo de Oração'),
('Encontros de Pentecostes', '2026-05-22', '2026-05-23', 5, 2026, 'diocesano', 'Diocesano'),
('Ministerialidade Orgânica', '2026-05-29', '2026-05-30', 5, 2026, 'diocesano', 'Diocesano'),

-- JULHO
('Congresso Diocesano Jovem', '2026-07-15', '2026-07-18', 7, 2026, 'diocesano', 'Diocesano'),
('Encontro Nacional Quarismático', '2026-07-22', '2026-07-25', 7, 2026, 'nacional', 'Nacional'),

-- AGOSTO
('Ministerialidade Orgânica', '2026-08-21', '2026-08-22', 8, 2026, 'diocesano', 'Diocesano'),

-- SETEMBRO
('Jesus no Pantanal', '2026-09-04', '2026-09-06', 9, 2026, 'estadual', 'Estadual'),
('Vigília pela Nação Brasileira', '2026-09-06', NULL, 9, 2026, 'diocesano', 'Diocesano'),
('Reunião do Conselho Nacional', '2026-09-22', '2026-09-26', 9, 2026, 'nacional', 'Nacional'),

-- OUTUBRO
('Encontro Católico Carismático Latino-Americano', '2026-10-07', '2026-10-10', 10, 2026, 'nacional', 'Nacional'),
('Assembleia Eletiva do Conselho Estadual', '2026-10-16', '2026-10-17', 10, 2026, 'estadual', 'Estadual'),
('Assembleia Eletiva do Conselho Diocesano', '2026-10-30', '2026-10-31', 10, 2026, 'diocesano', 'Diocesano'),

-- NOVEMBRO
('Festa do Rei Jesus', '2026-11-20', '2026-11-21', 11, 2026, 'diocesano', 'Diocesano'),

-- DEZEMBRO
('Início do Recesso 2026', '2026-12-16', NULL, 12, 2026, 'grupo', 'Grupo de Oração');
