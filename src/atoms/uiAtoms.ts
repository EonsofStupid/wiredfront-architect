
import { atom } from 'jotai';

// UI state atoms
export const leftSidebarCollapsedAtom = atom<boolean>(false);
export const rightSidebarVisibleAtom = atom<boolean>(true);
export const globalLoadingAtom = atom<boolean>(false);
export const modalOpenAtom = atom<boolean>(false);
export const modalContentAtom = atom<React.ReactNode | null>(null);

// UI Theme atoms
export const glassMorphismLevelAtom = atom<'default' | 'enhanced' | 'cyber'>('default');
export const sidebarStyleAtom = atom<'glass' | 'solid' | 'circuit' | 'matrix'>('glass');
export const neonColorAtom = atom<'blue' | 'purple' | 'green' | 'pink' | 'yellow'>('blue');
export const accentColorAtom = atom<'cyberpunk' | 'toxic' | 'neon'>('cyberpunk');

// Derived atoms
export const sidebarStateAtom = atom(
  (get) => ({
    leftCollapsed: get(leftSidebarCollapsedAtom),
    rightVisible: get(rightSidebarVisibleAtom)
  })
);

export const themeConfigAtom = atom(
  (get) => ({
    glassMorphismLevel: get(glassMorphismLevelAtom),
    sidebarStyle: get(sidebarStyleAtom),
    neonColor: get(neonColorAtom),
    accentColor: get(accentColorAtom)
  })
);
