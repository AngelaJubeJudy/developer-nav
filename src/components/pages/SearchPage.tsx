import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { SearchBar } from '../SearchBar';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'zh', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'fr', name: 'Français' },
];

export const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLang, setCurrentLang] = useState('en');

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-3xl font-bold text-[#6B4F4F] dark:text-gray-200 mb-8">
        Search Tools
      </h1>
      
      <div className="w-full max-w-2xl mb-12">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      
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
    </div>
  );
}; 