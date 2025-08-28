'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Answers = Record<string /*question_id*/, string>;
type Polished = Record<string /*gri_index*/, string>;

type GriState = {
  sessionKey: string | null;
  selectedCategoryId: number | null;
  selectedItemId: number | null;
  answers: Answers;
  polishedByIndex: Polished;
  lastSavedAt?: string;

  setSessionKey: (k: string) => void;
  setSelected: (catId: number|null, itemId: number|null) => void;
  setAnswer: (qid: string, val: string) => void;
  setBulkAnswers: (a: Answers) => void;
  setPolished: (indexNo: string, text: string) => void;
  resetItemAnswers: (itemId?: number|null) => void;
  resetAll: () => void;
};

export const useGriStore = create<GriState>()(
  persist(
    (set, get) => ({
      sessionKey: null,
      selectedCategoryId: null,
      selectedItemId: null,
      answers: {},
      polishedByIndex: {},

      setSessionKey: (k) => set({ sessionKey: k }),
      setSelected: (catId, itemId) => set({ selectedCategoryId: catId, selectedItemId: itemId }),
      setAnswer: (qid, val) => set({ answers: { ...get().answers, [qid]: val } }),
      setBulkAnswers: (a) => set({ answers: { ...get().answers, ...a } }),
      setPolished: (idx, text) => set({ polishedByIndex: { ...get().polishedByIndex, [idx]: text } }),
      resetItemAnswers: () => set({ answers: {} }),
      resetAll: () => set({ sessionKey: null, selectedCategoryId: null, selectedItemId: null, answers: {}, polishedByIndex: {} }),
    }),
    {
      name: 'gri-store-v1',
      version: 1,
      partialize: (s) => ({
        sessionKey: s.sessionKey,
        selectedCategoryId: s.selectedCategoryId,
        selectedItemId: s.selectedItemId,
        answers: s.answers,
        polishedByIndex: s.polishedByIndex,
        lastSavedAt: s.lastSavedAt,
      }),
    }
  )
);
