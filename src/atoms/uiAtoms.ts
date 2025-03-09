
import { atom } from 'jotai';

// UI state atoms
export const leftSidebarCollapsedAtom = atom<boolean>(false);
export const rightSidebarVisibleAtom = atom<boolean>(true);
export const globalLoadingAtom = atom<boolean>(false);
export const modalOpenAtom = atom<boolean>(false);
export const modalContentAtom = atom<React.ReactNode | null>(null);

// Derived atoms
export const sidebarStateAtom = atom(
  (get) => ({
    leftCollapsed: get(leftSidebarCollapsedAtom),
    rightVisible: get(rightSidebarVisibleAtom)
  })
);
