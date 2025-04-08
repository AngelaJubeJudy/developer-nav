import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookmarkCard } from '../BookmarkCard';
import { bookmarks } from '../../data/bookmarks';
import { useTranslation } from 'react-i18next';
import Header from '../layout/Header';
import Hero from '../layout/Hero';
import Testimonials from '../layout/Testimonials';
import FAQ from '../layout/FAQ';
import Features from '../layout/Features';
import Pricing from '../layout/Pricing';
import HowItWorks from '../layout/HowItWorks';
import Footer from '../layout/Footer';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'zh', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'fr', name: 'Français' },
];

export const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' ||
        (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [searchQuery, setSearchQuery] = useState('');
  const [showShareButtons, setShowShareButtons] = useState(false);

  const handleCategorySelect = (category: string) => {
    if (category === 'ALL') {
      navigate('/');
    } else {
      navigate(`/categories?category=${category}`);
    }
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        currentLang={currentLang}
        setCurrentLang={handleLanguageChange}
        languages={languages}
        showShareButtons={showShareButtons}
        toggleShareButtons={() => setShowShareButtons(!showShareButtons)}
      />
      <Hero 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {/* Featured Tools Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t('home.featuredTools')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookmarks['ALL'].slice(0, 8).map((item, index) => (
              <BookmarkCard
                key={index}
                item={item}
                onCategorySelect={handleCategorySelect}
              />
            ))}
          </div>
        </div>
      </section>

      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}; 