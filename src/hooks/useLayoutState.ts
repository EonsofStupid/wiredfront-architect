
import { useAtom } from 'jotai';
import { leftSidebarCollapsedAtom, rightSidebarVisibleAtom } from '@/atoms';

export function useLayoutState() {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useAtom(leftSidebarCollapsedAtom);
  const [rightSidebarVisible, setRightSidebarVisible] = useAtom(rightSidebarVisibleAtom);

  const toggleLeftSidebar = () => {
    setLeftSidebarCollapsed(!leftSidebarCollapsed);
  };

  const toggleRightSidebar = () => {
    setRightSidebarVisible(!rightSidebarVisible);
  };

  return {
    leftSidebarCollapsed,
    rightSidebarVisible,
    toggleLeftSidebar,
    toggleRightSidebar,
  };
}
