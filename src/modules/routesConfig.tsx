import { ReactNode } from 'react';
import { BiAlignLeft } from 'react-icons/bi';

export interface RouterConfigData {
  id: string;
  title: string;
  messageId: string;
  icon?: string | ReactNode;
  type: 'item' | 'group' | 'collapse' | 'divider';
  children?: RouterConfigData[];
  collections?: CollectionList | CollectionList[];
  color?: string;
  url?: RouteList;
  exact?: boolean;
  count?: number;
  as?: string;
}

const routesConfig: RouterConfigData[] = [
  {
    id: 'dashboard',
    title: 'dashboard.dashboard',
    messageId: 'dashboard.dashboard',
    type: 'item',
    icon: <BiAlignLeft />,
    url: '/admin',
    collections: ['users'],
  },
  {
    id: 'app',
    title: 'dashboard.admin',
    messageId: 'dashboard.admin',
    type: 'collapse',
    children: [
      {
        id: 'users',
        title: 'dashboard.users',
        messageId: 'dashboard.users',
        type: 'item',
        icon: <BiAlignLeft />,
        collections: 'users',
        url: '/admin/users',
      },
      {
        id: 'roles',
        title: 'dashboard.roles',
        messageId: 'dashboard.roles',
        type: 'item',
        collections: ['roles', 'users'],
        icon: <BiAlignLeft />,
        url: '/admin/roles',
      },
    ],
  },
];

export default routesConfig;
