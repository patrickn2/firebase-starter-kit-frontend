import { NavStyle } from 'shared/constants/AppEnums';
import BitBucket from './BitBucket';
import Default from './DefaultLayout';
import DrawerLayout from './DrawerLayout';
import HorDarkLayout from './HorDarkLayout';
import HorDefault from './HorDefault';
import HorHeaderFixed from './HorHeaderFixed';
import MiniSidebar from './MiniSidebar';
import MiniSidebarToggle from './MiniSidebarToggle';
import Standard from './Standard';
import HeaderUserLayout from './UserHeader';
import HeaderUserMiniLayout from './UserMiniHeader';

const Layouts = {
  [NavStyle.DEFAULT]: Default,
  [NavStyle.BIT_BUCKET]: BitBucket,
  [NavStyle.STANDARD]: Standard,
  [NavStyle.DRAWER]: DrawerLayout,
  [NavStyle.MINI]: MiniSidebar,
  [NavStyle.MINI_SIDEBAR_TOGGLE]: MiniSidebarToggle,
  [NavStyle.HEADER_USER]: HeaderUserLayout,
  [NavStyle.HEADER_USER_MINI]: HeaderUserMiniLayout,
  [NavStyle.H_DEFAULT]: HorDefault,
  [NavStyle.HOR_HEADER_FIXED]: HorHeaderFixed,
  [NavStyle.HOR_DARK_LAYOUT]: HorDarkLayout,
};
export default Layouts;
