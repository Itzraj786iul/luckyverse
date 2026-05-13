import { useCallback, useEffect, useState } from 'react';
import type { DefaultPlanKey, UserPlan } from './futurePlansTypes';
import * as local from './futurePlansLocal';
import * as remote from './futurePlansRemote';

export function useFuturePlans() {
  const useRemote = remote.isRemoteEnabled();
  const [userPlans, setUserPlans] = useState<UserPlan[]>([]);
  const [defaultDone, setDefaultDone] = useState<Record<DefaultPlanKey, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pull = useCallback(async () => {
    if (useRemote) {
      const rows = await remote.fetchPlans();
      setError(null);
      setUserPlans(rows);
      local.saveUserPlans(rows);
    } else {
      setUserPlans(local.loadUserPlans());
    }
  }, [useRemote]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        if (useRemote) {
          await pull();
        } else if (!cancelled) {
          setUserPlans(local.loadUserPlans());
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Could not load shared plans');
          setUserPlans(local.loadUserPlans());
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [useRemote, pull]);

  useEffect(() => {
    if (!useRemote) return;
    return remote.subscribePlans(() => {
      void pull().catch(() => {});
    });
  }, [useRemote, pull]);

  useEffect(() => {
    setDefaultDone(local.loadDefaultDone());
  }, []);

  const setDefaultDonePersist = useCallback((next: Record<DefaultPlanKey, boolean>) => {
    setDefaultDone(next);
    local.saveDefaultDone(next);
  }, []);

  const toggleDefaultDone = useCallback(
    (key: DefaultPlanKey) => {
      setDefaultDonePersist({ ...defaultDone, [key]: !defaultDone[key] });
    },
    [defaultDone, setDefaultDonePersist],
  );

  const addPlan = useCallback(
    async (fields: { title: string; body: string; tag: string }): Promise<boolean> => {
      const title = fields.title.trim();
      if (!title) return false;
      const plan: UserPlan = {
        id: crypto.randomUUID(),
        title,
        body: fields.body.trim(),
        tag: fields.tag.trim(),
        completed: false,
        createdAt: Date.now(),
      };
      try {
        if (useRemote) {
          await remote.insertPlan(plan);
          await pull();
        } else {
          const next = [plan, ...local.loadUserPlans()];
          local.saveUserPlans(next);
          setUserPlans(next);
        }
        setError(null);
        return true;
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not save plan');
        return false;
      }
    },
    [pull, useRemote],
  );

  const toggleUserComplete = useCallback(
    async (id: string) => {
      try {
        const current = useRemote ? await remote.fetchPlans() : local.loadUserPlans();
        const plan = current.find((p) => p.id === id);
        if (!plan) return;
        const updated = { ...plan, completed: !plan.completed };
        if (useRemote) {
          await remote.updatePlan(updated);
          await pull();
        } else {
          const next = current.map((p) => (p.id === id ? updated : p));
          local.saveUserPlans(next);
          setUserPlans(next);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not update plan');
      }
    },
    [pull, useRemote],
  );

  const deleteUserPlan = useCallback(
    async (id: string) => {
      try {
        if (useRemote) {
          await remote.deletePlan(id);
          await pull();
        } else {
          const next = local.loadUserPlans().filter((p) => p.id !== id);
          local.saveUserPlans(next);
          setUserPlans(next);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Could not delete plan');
      }
    },
    [pull, useRemote],
  );

  return {
    userPlans,
    defaultDone,
    toggleDefaultDone,
    addPlan,
    toggleUserComplete,
    deleteUserPlan,
    loading,
    error,
    useRemote,
    retry: pull,
  };
}
