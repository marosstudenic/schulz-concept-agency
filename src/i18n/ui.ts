import { sk } from "./languages/sk";
import { en } from "./languages/en";
import { de } from "./languages/de";

export const showDefaultLang = false;

export const languages = {
  en: "English",
  sk: "Slovensky",
  de: "Deutsch",
};

export const defaultLang = "sk";

export const routes: { [key: string]: { [key: string]: string } } = {
  sk: {
    home: "",
    contact: "kontakt",
    "our-work": "nase-prace",
  },
  en: {
    home: "",
    contact: "contact",
    "our-work": "our-work",
  },

  de: {
    home: "",
    contact: "kontakt",
    "our-work": "unsere-arbeit",
  },
};

export const ui = {
  en: {
    ...en,
  },
  sk: {
    ...sk,
  },
  de: {
    ...de,
  },
} as const;
