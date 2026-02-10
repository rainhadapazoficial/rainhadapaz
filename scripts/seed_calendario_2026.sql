-- Seed: Calendário Diocesano RCC Sinop 2026
-- Categorias: diocesano (azul), estadual (vermelho), nacional (cinza)

INSERT INTO public.calendario_diocesano (titulo, data_inicio, data_fim, mes, ano, categoria) VALUES

-- JANEIRO
('Escola Nacional de Formação Lid. e Min.', '2026-01-10', '2026-01-20', 1, 2026, 'nacional'),
('Reunião do Conselho Nacional', '2026-01-17', '2026-01-21', 1, 2026, 'nacional'),
('Escola Nacional de Música e Artes', '2026-01-19', '2026-01-21', 1, 2026, 'nacional'),
('Encontro Nacional de Formação (ENF 2026)', '2026-01-21', '2026-01-25', 1, 2026, 'nacional'),

-- FEVEREIRO
('Assembleia do Conselho Estadual', '2026-02-07', '2026-02-08', 2, 2026, 'estadual'),
('Encontros e Retiros de Carnaval', '2026-02-14', '2026-02-17', 2, 2026, 'diocesano'),

-- MARÇO
('Acampamento para Músicos e Artistas', '2026-03-07', '2026-03-08', 3, 2026, 'diocesano'),
('Reunião do Conselho Diocesano', '2026-03-28', '2026-03-29', 3, 2026, 'diocesano'),

-- ABRIL
('Sexta-Feira Santa', '2026-04-03', NULL, 4, 2026, 'diocesano'),
('Encontro Estadual de Formação (EEF 2026)', '2026-04-18', '2026-04-19', 4, 2026, 'estadual'),

-- MAIO
('Encontros de Pentecostes', '2026-05-23', '2026-05-24', 5, 2026, 'diocesano'),
('Ministerialidade Orgânica', '2026-05-30', '2026-05-31', 5, 2026, 'diocesano'),

-- JULHO
('Congresso Diocesano Jovem', '2026-07-16', '2026-07-19', 7, 2026, 'diocesano'),
('Encontro Nacional Quarismático', '2026-07-23', '2026-07-26', 7, 2026, 'nacional'),

-- AGOSTO
('Ministerialidade Orgânica', '2026-08-22', '2026-08-23', 8, 2026, 'diocesano'),

-- SETEMBRO
('Jesus no Pantanal', '2026-09-05', '2026-09-07', 9, 2026, 'estadual'),
('Vigília pela Nação Brasileira', '2026-09-07', NULL, 9, 2026, 'diocesano'),
('Reunião do Conselho Nacional', '2026-09-23', '2026-09-27', 9, 2026, 'nacional'),

-- OUTUBRO
('Encontro Católico Carismático Latino-Americano', '2026-10-08', '2026-10-11', 10, 2026, 'nacional'),
('Assembleia Eletiva do Conselho Estadual', '2026-10-17', '2026-10-18', 10, 2026, 'estadual'),
('Assembleia Eletiva do Conselho Diocesano', '2026-10-31', '2026-11-01', 10, 2026, 'diocesano'),

-- NOVEMBRO
('Festa do Rei Jesus', '2026-11-21', '2026-11-22', 11, 2026, 'diocesano');
