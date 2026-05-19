import { useState, useCallback } from 'react';

interface Child {
  id: number;
  name: string;
  age: number;
  gender: 'male' | 'female';
  avatar: string;
  lastAssessment?: string;
  assessmentProgress?: number;
  favoriteActivity?: string;
}

interface UseChildrenOptions {
  initialChildren?: Child[];
}

export function useChildren(options: UseChildrenOptions = {}) {
  const [children, setChildren] = useState<Child[]>(options.initialChildren ?? []);
  const [selectedChild, setSelectedChild] = useState<Child | null>(
    options.initialChildren?.[0] ?? null
  );

  const addChild = useCallback((child: Omit<Child, 'id'>) => {
    setChildren((prev) => [
      ...prev,
      {
        ...child,
        id: prev.length > 0 ? Math.max(...prev.map((c) => c.id)) + 1 : 1,
      },
    ]);
  }, []);

  const updateChild = useCallback((id: number, updates: Partial<Omit<Child, 'id'>>) => {
    setChildren((prev) =>
      prev.map((child) => (child.id === id ? { ...child, ...updates } : child))
    );
  }, []);

  const removeChild = useCallback((id: number) => {
    setChildren((prev) => {
      const filtered = prev.filter((child) => child.id !== id);
      if (selectedChild?.id === id && filtered.length > 0) {
        setSelectedChild(filtered[0]);
      } else if (filtered.length === 0) {
        setSelectedChild(null);
      }
      return filtered;
    });
  }, [selectedChild?.id]);

  const selectChild = useCallback(
    (id: number) => {
      const child = children.find((c) => c.id === id);
      if (child) {
        setSelectedChild(child);
      }
    },
    [children]
  );

  return {
    children,
    setChildren,
    selectedChild,
    setSelectedChild,
    addChild,
    updateChild,
    removeChild,
    selectChild,
  };
}

export default useChildren;
export type { Child };
