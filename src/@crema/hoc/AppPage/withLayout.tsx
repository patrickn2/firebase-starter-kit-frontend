import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {
  useLayoutActionsContext,
  useLayoutContext,
} from '../../../providers/AppContextProvider/LayoutContextProvider';
import { useSidebarActionsContext } from '../../../providers/AppContextProvider/SidebarContextProvider';
import Layouts from '../../core/AppLayout/Layouts';

const withLayout = (ComposedComponent) => (props) => {
  const { navStyle } = useLayoutContext();
  const AppLayout = Layouts[navStyle];

  const { updateNavStyle } = useLayoutActionsContext();
  const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
  const router = useRouter();

  useEffect(() => {
    if (router.query.layout) updateNavStyle(router.query.layout as string);
    if (router.query.menuStyle)
      updateMenuStyle(router.query.menuStyle as string);
    if (router.query.sidebarImage) setSidebarBgImage(true);
  }, [setSidebarBgImage, updateNavStyle, updateMenuStyle]);

  return (
    <AppLayout>
      <ComposedComponent {...props} />
    </AppLayout>
  );
};

export default withLayout;
