import { type LanguageCode } from './translations';

export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  isSubheader?: boolean;
};

export type MenuCategory = {
  name: string;
  description?: string;
  items: MenuItem[];
};

export type MenuCollection = {
  [key in LanguageCode]?: MenuCategory[];
};

// Cache for loaded menu data
const menuCache: Partial<MenuCollection> = {};

/**
 * Dynamically load menu data for a specific language
 * This reduces initial bundle size by only loading the required language
 */
export async function getMenuData(language: LanguageCode, retries = 3): Promise<MenuCategory[]> {
  // Return from cache if already loaded
  if (menuCache[language]) {
    return menuCache[language]!;
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      let menuData: MenuCategory[];

      switch (language) {
        case 'sk':
          menuData = (await import('../data/menu-sk.json')).default;
          break;
        case 'en':
          menuData = (await import('../data/menu-en.json')).default;
          break;
        case 'cs':
          menuData = (await import('../data/menu-cs.json')).default;
          break;
        case 'uk':
          menuData = (await import('../data/menu-uk.json')).default;
          break;
        case 'pl':
          menuData = (await import('../data/menu-pl.json')).default;
          break;
        case 'hu':
          menuData = (await import('../data/menu-hu.json')).default;
          break;
        default:
          // Fallback to Slovak if language not found
          menuData = (await import('../data/menu-sk.json')).default;
      }

      // Cache the loaded data
      menuCache[language] = menuData;
      return menuData;
    } catch (error) {
      lastError = error as Error;
      console.error(`Failed to load menu data for language: ${language} (attempt ${attempt + 1}/${retries})`, error);

      // Wait before retrying (exponential backoff)
      if (attempt < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  // All retries failed, fallback to Slovak menu
  console.error(`All retries failed for language: ${language}, falling back to Slovak menu`);
  if (!menuCache['sk']) {
    menuCache['sk'] = (await import('../data/menu-sk.json')).default;
  }
  return menuCache['sk']!;
}

// Legacy export for backward compatibility - loads default (Slovak) menu
// New code should use getMenuData() instead
export const menuData: MenuCollection = {
  // This will be populated on first access via dynamic import
};
