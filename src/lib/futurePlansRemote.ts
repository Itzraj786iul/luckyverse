import type { UserPlan } from './futurePlansTypes';
import { getSupabaseClient } from './supabaseClient';

type Row = {
  id: string;
  title: string;
  body: string | null;
  tag: string | null;
  completed: boolean;
  created_at: string;
};

function rowToPlan(row: Row): UserPlan {
  return {
    id: row.id,
    title: row.title,
    body: row.body ?? '',
    tag: row.tag ?? '',
    completed: Boolean(row.completed),
    createdAt: new Date(row.created_at).getTime(),
  };
}

export function isRemoteEnabled(): boolean {
  return Boolean(getSupabaseClient());
}

export async function fetchPlans(): Promise<UserPlan[]> {
  const sb = getSupabaseClient();
  if (!sb) return [];
  const { data, error } = await sb
    .from('future_plans')
    .select('id,title,body,tag,completed,created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return ((data ?? []) as Row[]).map(rowToPlan);
}

export async function insertPlan(plan: UserPlan): Promise<void> {
  const sb = getSupabaseClient();
  if (!sb) return;
  const { error } = await sb.from('future_plans').insert({
    id: plan.id,
    title: plan.title,
    body: plan.body,
    tag: plan.tag,
    completed: plan.completed,
    created_at: new Date(plan.createdAt).toISOString(),
  });
  if (error) throw error;
}

export async function updatePlan(plan: UserPlan): Promise<void> {
  const sb = getSupabaseClient();
  if (!sb) return;
  const { error } = await sb
    .from('future_plans')
    .update({
      title: plan.title,
      body: plan.body,
      tag: plan.tag,
      completed: plan.completed,
    })
    .eq('id', plan.id);
  if (error) throw error;
}

export async function deletePlan(id: string): Promise<void> {
  const sb = getSupabaseClient();
  if (!sb) return;
  const { error } = await sb.from('future_plans').delete().eq('id', id);
  if (error) throw error;
}

export function subscribePlans(onChange: () => void): () => void {
  const sb = getSupabaseClient();
  if (!sb) return () => {};

  const channel = sb
    .channel('luckyverse_future_plans')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'future_plans' }, () => {
      onChange();
    })
    .subscribe();

  return () => {
    void sb.removeChannel(channel);
  };
}
