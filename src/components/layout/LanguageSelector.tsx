import React, { useState } from 'react';
import { Globe } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

interface LanguageSelectorProps {
  variant?: 'header' | 'footer';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'header' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    // Here you would typically update the app's language context/state
    // and persist the selection
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 rounded-lg transition-colors ${
          variant === 'header'
            ? 'hover:bg-gray-100 px-3 py-2'
            : 'text-white hover:text-gray-200'
        }`}
      >
        <Globe className={`h-5 w-5 ${variant === 'footer' ? 'text-white' : ''}`} />
        <span className="text-sm">{selectedLanguage.flag}</span>
        <span className="text-sm">{selectedLanguage.name}</span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                  selectedLanguage.code === language.code ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
                }`}
                role="menuitem"
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 