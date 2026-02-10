-- Add description and image columns to groups table
ALTER TABLE public.groups 
ADD COLUMN IF NOT EXISTS descricao TEXT,
ADD COLUMN IF NOT EXISTS imagem TEXT;

-- Notify user of success
DO $$
BEGIN
    RAISE NOTICE 'Columns descricao and imagem added successfully to groups table.';
END $$;
