import { AuthActions } from './actions/Auth.actions';
import { ChatActions } from './actions/Chat.actions';
import { CommonActionTypes } from './actions/Common.action';
import { ContactActions } from './actions/Contact.actions';
import { DashboardActionTypes } from './actions/Dashboard.action';
import { MailActions } from './actions/Mail.action';
import { ScrumboardActions } from './actions/Scrumboard.actions';
import { SettingsActionTypes } from './actions/Settings.action';
import { TaskActions } from './actions/Todo.action';
import { UserListActions } from './actions/UserList.actions';
import { WalltActions } from './actions/Wall.actions';

export type AppActions =
  | CommonActionTypes
  | SettingsActionTypes
  | DashboardActionTypes
  | AuthActions
  | ChatActions
  | MailActions
  | TaskActions
  | WalltActions
  | ScrumboardActions
  | ContactActions
  | UserListActions;
