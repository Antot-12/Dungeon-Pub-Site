export const languages = {
  en: 'English',
  sk: 'Slovensky',
  cs: 'Česky',
  uk: 'Українська',
  pl: 'Polski',
  hu: 'Magyar',
};

export type LanguageCode = keyof typeof languages;

export const defaultLang: LanguageCode = 'sk';

export type Translations = Record<string, string>;

// Cache for loaded translations
const translationsCache: Partial<Record<LanguageCode, Translations>> = {};

/**
 * Dynamically load translations for a specific language
 * This reduces initial bundle size by only loading the required language
 */
export async function getTranslations(language: LanguageCode, retries = 3): Promise<Translations> {
  // Return from cache if already loaded
  if (translationsCache[language]) {
    return translationsCache[language]!;
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      let translations: Translations;

      switch (language) {
        case 'en':
          translations = (await import('../data/translations-en.json')).default;
          break;
        case 'sk':
          translations = (await import('../data/translations-sk.json')).default;
          break;
        case 'cs':
          translations = (await import('../data/translations-cs.json')).default;
          break;
        case 'uk':
          translations = (await import('../data/translations-uk.json')).default;
          break;
        case 'pl':
          translations = (await import('../data/translations-pl.json')).default;
          break;
        case 'hu':
          translations = (await import('../data/translations-hu.json')).default;
          break;
        default:
          // Fallback to Slovak
          translations = (await import('../data/translations-sk.json')).default;
      }

      // Cache the loaded translations
      translationsCache[language] = translations;
      return translations;
    } catch (error) {
      lastError = error as Error;
      console.error(`Failed to load translations for language: ${language} (attempt ${attempt + 1}/${retries})`, error);

      // Wait before retrying (exponential backoff)
      if (attempt < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  // All retries failed, fallback to Slovak translations
  console.error(`All retries failed for language: ${language}, falling back to Slovak`);
  if (!translationsCache['sk']) {
    translationsCache['sk'] = (await import('../data/translations-sk.json')).default;
  }
  return translationsCache['sk']!;
}

// Legacy export for backward compatibility
// New code should use getTranslations() instead
export const ui: Record<LanguageCode, Translations> = {} as Record<LanguageCode, Translations>;
