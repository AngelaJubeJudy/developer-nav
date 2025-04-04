import React from 'react';
import { Globe, Moon, Sun, Share2 } from 'lucide-react';
import { ShareButtons } from '../common/ShareButtons';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  languages: Array<{ code: string; name: string }>;
  showShareButtons: boolean;
  toggleShareButtons: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  setIsDarkMode,
  currentLang,
  setCurrentLang,
  languages,
  showShareButtons,
  toggleShareButtons,
}) => {
  const { t } = useTranslation();

  return (
    <header className="text-center mb-12">
      <div className="flex justify-end mb-4">
        <div className="flex space-x-2">
          <button
            onClick={toggleShareButtons}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={t('features.easySharing.title')}
          >
            <Share2 className="text-[#6B4F4F] dark:text-gray-200" size={24} />
          </button>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={isDarkMode ? t('common.lightMode') : t('common.darkMode')}
          >
            {isDarkMode ? (
              <Sun className="text-yellow-500" size={24} />
            ) : (
              <Moon className="text-gray-600" size={24} />
            )}
          </button>
        </div>
      </div>
      
      {showShareButtons && (
        <div className="mb-6">
          <ShareButtons 
            url={window.location.href} 
            title={t('common.shareTitle')} 
          />
        </div>
      )}
      
      <div className="flex items-center justify-center gap-4 text-sm text-[#8B7E7E] dark:text-gray-400">
        <Globe size={16} />
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setCurrentLang(lang.code)}
            className={`hover:text-[#6B4F4F] dark:hover:text-gray-200 transition-colors ${
              currentLang === lang.code ? 'text-[#6B4F4F] dark:text-gray-200 font-semibold' : ''
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header; 