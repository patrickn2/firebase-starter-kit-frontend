import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import React from 'react';
import routesConfig, {
  RouterConfigData,
} from '../../../../../modules/routesConfig';
import HorizontalCollapse from './HorizontalCollapse';
import HorizontalGroup from './HorizontalGroup';
import HorizontalItem from './HorizontalItem';

const HorizontalNav = () => {
  return (
    <List className='navbarNav'>
      {routesConfig.map((item: RouterConfigData) => (
        <React.Fragment key={item.id}>
          {item.type === 'group' && (
            <HorizontalGroup item={item} nestedLevel={0} />
          )}

          {item.type === 'collapse' && (
            <HorizontalCollapse item={item} nestedLevel={0} />
          )}

          {item.type === 'item' && (
            <HorizontalItem item={item} nestedLevel={0} />
          )}

          {item.type === 'divider' && <Divider sx={{ my: 5 }} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default HorizontalNav;
