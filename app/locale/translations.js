import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';

const translations = {
  en: {
    WELCOME: 'Welcome to React',
    CHANGE_LANGUAGE: 'Change Language',
    LANGUAGE_SETTINGS: 'Change Language',
    BACK: 'Back',
  },
  np: {
    WELCOME: 'स्वागतम्',
    CHANGE_LANGUAGE: 'भाषा परिवर्तन गर्नुहोस्',
    LANGUAGE_SETTINGS: 'भाषा परिवर्तन गर्नुहोस्',
    BACK: 'पछाडि',
  },
};

export default new LocalizedStrings(translations);
