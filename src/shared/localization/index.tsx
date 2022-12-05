import { Localization } from '@mui/material/locale';
import enLang from './entries/en-US';
import esLang from './entries/es_ES';
import frLang from './entries/fr_FR';
import itLang from './entries/it_IT';
import zhLang from './entries/zh-Hans-CN';

export type AppLocale = {
  [key in string]: {
    locale: string;
    muiLocale: Localization;
    messages: { [key in string]: string };
  };
};

const AppLocale: AppLocale = {
  en: enLang,
  zh: zhLang,
  it: itLang,
  es: esLang,
  fr: frLang,
};

export default AppLocale;
