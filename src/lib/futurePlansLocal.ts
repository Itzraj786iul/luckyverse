import type { DefaultPlanKey, UserPlan } from './futurePlansTypes';

const USER_KEY = 'luckyverse-future-user-plans-v1';
const DEFAULT_DONE_KEY = 'luckyverse-future-default-done-v1';

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function isUserPlan(x: unknown): x is UserPlan {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    typeof o.body === 'string' &&
    typeof o.tag === 'string' &&
    typeof o.completed === 'boolean' &&
    typeof o.createdAt === 'number'
  );
}

export function loadUserPlans(): UserPlan[] {
  const arr = safeParse<unknown[]>(localStorage.getItem(USER_KEY), []);
  if (!Array.isArray(arr)) return [];
  return arr.filter(isUserPlan).sort((a, b) => b.createdAt - a.createdAt);
}

export function saveUserPlans(plans: UserPlan[]) {
  localStorage.setItem(USER_KEY, JSON.stringify(plans));
}

export function loadDefaultDone(): Record<DefaultPlanKey, boolean> {
  const o = safeParse<Record<string, boolean>>(localStorage.getItem(DEFAULT_DONE_KEY), {});
  return typeof o === 'object' && o !== null ? o : {};
}

export function saveDefaultDone(done: Record<DefaultPlanKey, boolean>) {
  localStorage.setItem(DEFAULT_DONE_KEY, JSON.stringify(done));
}
