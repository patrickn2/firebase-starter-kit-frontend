import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import AppLocale from 'shared/localization';
import { IntlGlobalProvider } from '../../@crema/utility/helper/Utils';
import { useLocaleContext } from '../AppContextProvider/LocaleContextProvide';

interface AppLocaleProviderProps {
  children: ReactNode;
}

const AppLocaleProvider: React.FC<AppLocaleProviderProps> = (props) => {
  const { locale } = useLocaleContext();
  const currentAppLocale = AppLocale[locale.locale];

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <IntlGlobalProvider>{props.children}</IntlGlobalProvider>
    </IntlProvider>
  );
};

export default AppLocaleProvider;
