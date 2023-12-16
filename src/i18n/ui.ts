export const showDefaultLang = false;

export const languages = {
  en: 'English',
  sk: 'Slovensky',
};

export const defaultLang = 'sk';

export const routes: { [key : string] : { [key: string]: string}} = {
  sk: {
    'home': '',
    'contact': 'kontakt',
    'our-work': 'nase-prace',
  },
  en: {
    'home': '',
    'contact': 'contact',
    'our-work': 'our-work',
  },
}

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.twitter': 'Twitter',
  },
  sk: {
    'nav.home': 'Domov',
    'nav.about': 'O nás',
    'nav.twitter': 'Twitter',
  },
} as const;