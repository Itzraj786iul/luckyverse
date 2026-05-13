import { useCallback, useEffect, useState } from 'react';
import type { SpaceThought } from './spaceThoughtsRemote';
import { fetchSpaceThoughts, insertSpaceThought, subscribeSpaceThoughts } from './spaceThoughtsRemote';
import { isSupabaseConfigured } from './supabaseClient';
import { supabaseErrorMessage } from './supabaseErrors';

export function useSpaceThoughts() {
  const [thoughts, setThoughts] = useState<SpaceThought[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const configured = isSupabaseConfigured();

  const refresh = useCallback(async () => {
    if (!configured) {
      setThoughts([]);
      setLoading(false);
      return;
    }
    try {
      setError(null);
      const rows = await fetchSpaceThoughts();
      setThoughts(rows);
    } catch (e) {
      setError(supabaseErrorMessage(e) || 'Could not load messages');
    } finally {
      setLoading(false);
    }
  }, [configured]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!configured) return () => {};
    return subscribeSpaceThoughts(() => {
      void refresh();
    });
  }, [configured, refresh]);

  const sendThought = useCallback(
    async (body: string) => {
      const row = await insertSpaceThought(body);
      setThoughts((prev) => {
        if (prev.some((t) => t.id === row.id)) return prev;
        return [row, ...prev];
      });
      setError(null);
      try {
        await refresh();
      } catch {
        /* list already updated optimistically */
      }
    },
    [refresh],
  );

  return { thoughts, loading, error, configured, sendThought, refresh };
}
