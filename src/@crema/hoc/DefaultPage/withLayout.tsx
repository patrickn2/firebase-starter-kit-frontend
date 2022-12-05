import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useLayoutActionsContext } from '../../../providers/AppContextProvider/LayoutContextProvider';
import { useSidebarActionsContext } from '../../../providers/AppContextProvider/SidebarContextProvider';
import AuthLayout from './AuthLayout';

const withLayout = (ComposedComponent) => (props) => {
  const { updateNavStyle } = useLayoutActionsContext();
  const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
  const router = useRouter();

  useEffect(() => {
    if (router.query.layout) updateNavStyle(router.query.layout as string);
    if (router.query.menuStyle)
      updateMenuStyle(router.query.menuStyle as string);
    if (router.query.sidebarImage) setSidebarBgImage(true);
  }, []);
  return (
    <AuthLayout>
      <ComposedComponent {...props} />
    </AuthLayout>
  );
};

export default withLayout;
