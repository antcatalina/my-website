import { createContext, useContext, useState, ReactNode } from "react";
import { locales, LocaleKey } from "../locales";

/** Shape of the LocaleContext object. */
interface LocaleContextType {
  locale: LocaleKey;
  setLocale: (lang: LocaleKey) => void;
  strings: typeof locales[LocaleKey];
}

/** Props for the `LocaleProvider` component. */
interface LocaleProviderProps {
  children: ReactNode;
}

/** React context for locale management. */
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

/** Provides locale context to child components.*/
export const LocaleProvider = ({ children }: LocaleProviderProps) => {
  const [locale, setLocale] = useState<LocaleKey>("en");

  const value: LocaleContextType = {
    locale,
    setLocale,
    strings: locales[locale],
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

/** Hook to access the current locale, setter function, and localized strings. */
export const useLocale = (): LocaleContextType => {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
};
