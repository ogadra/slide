import { type SupportedLocale, normalizeLocale } from "./i18n";

export const detectLocaleFromBrowser = (): SupportedLocale => {
	const lang = navigator.language || navigator.languages?.[0];
	return normalizeLocale(lang);
};
