-- First, let's check if the tables exist and fix the foreign key relationship
-- Add the missing foreign key constraint for transaction_items
ALTER TABLE public.transaction_items 
ADD CONSTRAINT fk_transaction_items_transaction_id 
FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON DELETE CASCADE;

-- Also add foreign key for waste_type_id if not exists
ALTER TABLE public.transaction_items 
ADD CONSTRAINT fk_transaction_items_waste_type_id 
FOREIGN KEY (waste_type_id) REFERENCES public.waste_types(id);

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_transaction_items_transaction_id ON public.transaction_items(transaction_id);
CREATE INDEX IF NOT EXISTS idx_transaction_items_waste_type_id ON public.transaction_items(waste_type_id);