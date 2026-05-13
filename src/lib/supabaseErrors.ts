/** Turn Supabase / PostgREST errors into readable UI text. */
export function supabaseErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (err && typeof err === 'object') {
    const o = err as Record<string, unknown>;
    const msg = typeof o.message === 'string' ? o.message : '';
    const details = typeof o.details === 'string' ? o.details : '';
    const hint = typeof o.hint === 'string' ? o.hint : '';
    const code = typeof o.code === 'string' ? o.code : '';
    const parts = [msg, details, hint].filter(Boolean);
    if (parts.length) {
      let s = parts.join(' — ');
      if (code) s += ` [${code}]`;
      return s;
    }
  }
  return typeof err === 'string' ? err : 'Something went wrong';
}
