import clsx from 'clsx';
import React, { useMemo } from 'react';
import { RouterConfigData } from '../../../../../../modules/routesConfig';
import { useSidebarContext } from '../../../../../utility/AppContextProvider/SidebarContextProvider';
import { useAuthUser } from '../../../../../utility/AuthHooks';
import { checkPermission } from '../../../../../utility/helper/RouteHelper';
import IntlMessages from '../../../../../utility/IntlMessages';
import VerticalCollapse from '../VerticalCollapse';
import VerticalItem from '../VerticalItem';
import VerticalNavGroupItem from './VerticalNavGroupItem';

interface VerticalNavGroupProps {
  item?: RouterConfigData;
  level?: any;
}

const VerticalNavGroup: React.FC<VerticalNavGroupProps> = ({ item, level }) => {
  const { sidebarTextColor } = useSidebarContext();
  const { user } = useAuthUser();
  const hasPermission = useMemo(
    () => checkPermission(item?.url, user?.role),
    [item?.url, user?.role],
  );

  if (!hasPermission) {
    return null;
  }
  return (
    <>
      <VerticalNavGroupItem
        level={level}
        sidebarTextColor={sidebarTextColor}
        component='div'
        className={clsx('nav-item nav-item-header')}
      >
        {<IntlMessages id={item!.messageId} />}
      </VerticalNavGroupItem>

      {item!.children && (
        <>
          {item!.children.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === 'group' && (
                <NavVerticalGroup item={item} level={level} />
              )}

              {item.type === 'collapse' && (
                <VerticalCollapse item={item} level={level} />
              )}

              {item.type === 'item' && (
                <VerticalItem item={item} level={level} />
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};

const NavVerticalGroup = VerticalNavGroup;

export default NavVerticalGroup;
