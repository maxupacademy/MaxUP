import React, { createContext, useContext, useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export type Language = 'th' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  tx: (th: string, en: string) => string;
}

const LANG_STORAGE_KEY = 'maxup_ui_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    return saved === 'en' ? 'en' : 'th';
  });

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Language) => {
    setLangState(next);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'th' ? 'en' : 'th'));
  };

  const tx = (th: string, en: string): string => {
    return lang === 'th' ? th : en;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, tx }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};

interface LanguageToggleProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  variant = 'light',
  className = '',
}) => {
  const { lang, setLang } = useLanguage();

  const isDark = variant === 'dark';

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-xl border text-[11px] font-bold select-none transition-colors ${
        isDark
          ? 'bg-slate-900/90 border-slate-700/80 text-slate-300'
          : 'bg-slate-100/90 border-slate-200/80 text-slate-600'
      } ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      <Globe
        className={`w-3 h-3 ml-1.5 mr-1 shrink-0 ${
          isDark ? 'text-amber-400' : 'text-blue-900'
        }`}
      />
      <button
        type="button"
        onClick={() => setLang('th')}
        className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
          lang === 'th'
            ? isDark
              ? 'bg-amber-500 text-slate-950 shadow-2xs'
              : 'bg-white text-slate-900 shadow-2xs'
            : isDark
            ? 'text-slate-400 hover:text-white'
            : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        TH
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
          lang === 'en'
            ? isDark
              ? 'bg-amber-500 text-slate-950 shadow-2xs'
              : 'bg-white text-slate-900 shadow-2xs'
            : isDark
            ? 'text-slate-400 hover:text-white'
            : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        EN
      </button>
    </div>
  );
};
