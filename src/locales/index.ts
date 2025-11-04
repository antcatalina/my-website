import en from './i18n-EN.json';
import fr from './i18n-FR.json';
import it from './i18n-IT.json';
import es from './i18n-ES.json';
import de from './i18n-DE.json';
import nl from './i18n-NL.json';
import pl from './i18n-PL.json';
import ja from './i18n-JA.json';
import ko from './i18n-KO.json';
import pt from './i18n-PT.json';
import ru from './i18n-RU.json';
import uk from './i18n-UK.json';
import da from './i18n-DA.json';
import fi from './i18n-FI.json';
import sv from './i18n-SV.json';
import hi from './i18n-HI.json';
import ar from './i18n-AR.json';
import tr from './i18n-TR.json';
import vi from './i18n-VI.json';
import th from './i18n-TH.json';
import id from './i18n-ID.json';
import bn from './i18n-BN.json';
import ro from './i18n-RO.json';
import hu from './i18n-HU.json';
import cs from './i18n-CS.json';
import no from './i18n-NO.json';
import el from './i18n-EL.json';
import zh from './i18n-ZH.json';

/**
 * Map of ISO language codes to their JSON translation objects.
 */
export const locales = {
  en,
  fr,
  it,
  es,
  de,
  nl,
  pl,
  ja,
  ko,
  pt,
  ru,
  uk,
  da,
  fi,
  sv,
  hi,
  ar,
  tr,
  vi,
  th,
  id,
  bn,
  ro,
  hu,
  cs,
  no,
  el,
  zh,
} as const;

/** Type representing all supported language codes for dropdowns, etc. */
export type LocaleCode = keyof typeof TARGET_LANGUAGES;

/** Type representing all available locale keys in `locales`. */
export type LocaleKey = keyof typeof locales;

/** Map of ISO language codes to human-readable language names, prioritized for US/EU web audience */
export const TARGET_LANGUAGES = {
  en: 'English', // Default
  es: 'Spanish', // Spain, US Hispanic users
  de: 'German', // Germany, Austria, Switzerland
  fr: 'French', // France, Belgium, Switzerland
  it: 'Italian', // Italy, Switzerland
  nl: 'Dutch', // Netherlands, Belgium
  sv: 'Swedish', // Sweden
  no: 'Norwegian', // Norway
  da: 'Danish', // Denmark
  fi: 'Finnish', // Finland
  pl: 'Polish', // Poland, EU
  ru: 'Russian', // Eastern Europe, EU immigrant communities
  uk: 'Ukrainian', // Eastern Europe, EU immigrant communities
  pt: 'Portuguese', // Portugal
  el: 'Greek', // Greece, Cyprus
  hi: 'Hindi', // Indian diaspora
  ar: 'Arabic', // Middle East & North Africa diaspora
  tr: 'Turkish', // Turkish diaspora
  zh: 'Chinese', // Chinese diaspora
  ja: 'Japanese', // Japan, less common in EU/US
  ko: 'Korean', // Korea, less common
  vi: 'Vietnamese', // Vietnamese diaspora
  th: 'Thai', // Thai diaspora
  id: 'Indonesian', // Indonesian diaspora
  bn: 'Bengali', // Bengali diaspora
  ro: 'Romanian', // Romania, EU
  hu: 'Hungarian', // Hungary, EU
  cs: 'Czech', // Czech Republic, EU
} as const;
