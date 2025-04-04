import React from 'react';
import { SearchBar } from '../SearchBar';
import { useTranslation } from 'react-i18next';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ searchQuery, setSearchQuery }) => {
  const { t } = useTranslation();

  return (
    <section className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-[#6B4F4F] dark:text-gray-200 mb-4">
        {t('hero.title')}
      </h1>
      <p className="text-xl text-[#8B7E7E] dark:text-gray-400 mb-8">
        {t('hero.subtitle')}
      </p>
      <div className="max-w-2xl mx-auto">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="mt-8 text-sm text-[#8B7E7E] dark:text-gray-400">
        <p>{t('hero.description')}</p>
      </div>
    </section>
  );
};

export default Hero; 