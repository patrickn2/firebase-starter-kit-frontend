import List from '@mui/material/List';
import React from 'react';
import routesConfig, {
  RouterConfigData,
} from '../../../../../modules/routesConfig';
import VerticalCollapse from './VerticalCollapse';
import VerticalItem from './VerticalItem';
import NavVerticalGroup from './VerticalNavGroup';

const VerticalNav = () => {
  return (
    <List
      sx={{
        position: 'relative',
        padding: 0,
      }}
      component='div'
    >
      {routesConfig.map((item: RouterConfigData) => (
        <React.Fragment key={item.id}>
          {item.type === 'group' && <NavVerticalGroup item={item} level={0} />}

          {item.type === 'collapse' && (
            <VerticalCollapse item={item} level={0} />
          )}

          {item.type === 'item' && <VerticalItem item={item} level={0} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default VerticalNav;
