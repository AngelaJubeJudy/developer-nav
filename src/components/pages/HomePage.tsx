import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookmarkCard } from '../BookmarkCard';
import { bookmarks } from '../../data/bookmarks';
import { useTranslation } from 'react-i18next';
import Hero from '../layout/Hero';
import Testimonials from '../layout/Testimonials';
import FAQ from '../layout/FAQ';
import Features from '../layout/Features';
import Pricing from '../layout/Pricing';
import HowItWorks from '../layout/HowItWorks';
import Footer from '../layout/Footer';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategorySelect = (category: string) => {
    if (category === 'ALL') {
      navigate('/');
    } else {
      navigate(`/categories?category=${category}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {/* Featured Tools Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t('sections.featuredTools')}
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
      
      {/* Slogan Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {t('hero.subtitle')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('footer.description')}
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}; 