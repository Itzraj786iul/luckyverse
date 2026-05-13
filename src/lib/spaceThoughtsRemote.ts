import { getSupabaseClient } from './supabaseClient';

export type SpaceThought = {
  id: string;
  body: string;
  created_at: string;
};

const MAX_LEN = 8000;

export async function fetchSpaceThoughts(): Promise<SpaceThought[]> {
  const sb = getSupabaseClient();
  if (!sb) return [];
  const { data, error } = await sb
    .from('space_thoughts')
    .select('id,body,created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as SpaceThought[];
}

export async function insertSpaceThought(body: string): Promise<void> {
  const sb = getSupabaseClient();
  if (!sb) throw new Error('Supabase is not configured');
  const trimmed = body.trim();
  if (!trimmed) throw new Error('Message is empty');
  if (trimmed.length > MAX_LEN) throw new Error(`Message must be ${MAX_LEN} characters or less`);
  const { error } = await sb.from('space_thoughts').insert({ body: trimmed });
  if (error) throw error;
}

export function subscribeSpaceThoughts(onChange: () => void): () => void {
  const sb = getSupabaseClient();
  if (!sb) return () => {};

  const channel = sb
    .channel('luckyverse_space_thoughts')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'space_thoughts' }, () => {
      onChange();
    })
    .subscribe();

  return () => {
    void sb.removeChannel(channel);
  };
}
