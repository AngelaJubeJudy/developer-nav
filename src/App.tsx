import React, { useState, useEffect } from 'react';
import { Globe, Moon, Sun, Share2 } from 'lucide-react';
import { bookmarks } from './data/bookmarks';
import { Sidebar } from './components/Sidebar';
import { SearchBar } from './components/SearchBar';
import { BookmarkCard } from './components/BookmarkCard';
import { ShareButtons } from './components/common/ShareButtons';
import { BookmarkCategory, BookmarkItem } from './types';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Hero from './components/layout/Hero';
import Testimonials from './components/layout/Testimonials';
import FAQ from './components/layout/FAQ';
import Features from './components/layout/Features';
import Pricing from './components/layout/Pricing';
import HowItWorks from './components/layout/HowItWorks';
import Footer from './components/layout/Footer';
import BackToTop from './components/common/BackToTop';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'zh', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'fr', name: 'Français' },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' ||
        (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [showShareButtons, setShowShareButtons] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/resources/');
  const isSearchPage = location.pathname === '/search';
  const isSubmitPage = location.pathname === '/submit';
  const isSponsorPage = location.pathname === '/sponsor-us';
  const isContactPage = location.pathname === '/contact';
  const isSpecialPage = isDetailPage || isSearchPage || isSubmitPage || isSponsorPage || isContactPage;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const searchInItems = (items: BookmarkCategory[]) => {
    return items.filter((item) => {
      if (item.name?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
      if (item.items) {
        return item.items.some(
          (subItem) =>
            subItem.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subItem.url.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return item.url?.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  const filteredBookmarks = searchQuery
    ? Object.entries(bookmarks).reduce((acc, [category, items]) => {
        const filtered = searchInItems(items);
        if (filtered.length) acc[category] = filtered;
        return acc;
      }, {} as Record<string, BookmarkCategory[]>)
    : bookmarks;

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (isDetailPage) {
      navigate('/');
    }
  };

  const toggleShareButtons = () => {
    setShowShareButtons(!showShareButtons);
  };

  return (
    <div className="flex min-h-screen bg-[#F7F3F0] dark:bg-gray-900 transition-colors duration-200">
      <Sidebar
        bookmarks={bookmarks}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main 
        className={`flex-1 min-h-screen transition-all duration-300
          ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}
          ${!isSidebarOpen && 'ml-0'}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!isSpecialPage && (
            <>
              <Header 
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                currentLang={currentLang}
                setCurrentLang={setCurrentLang}
                languages={languages}
                showShareButtons={showShareButtons}
                toggleShareButtons={toggleShareButtons}
              />
              
              <Hero 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              <Features />
              
              <HowItWorks />
              
              <Testimonials />
              
              <Pricing />
              
              <FAQ />
            </>
          )}

          {isSpecialPage ? (
            <Outlet />
          ) : (
            <section>
              {Object.entries(filteredBookmarks).map(([category, items]) => (
                <div
                  key={category}
                  className={`mb-12 ${
                    selectedCategory === category ? 'block' : 'hidden'
                  }`}
                >
                  <h2 className="text-2xl font-semibold text-[#6B4F4F] dark:text-gray-200 mb-6">
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                      <BookmarkCard key={index} item={item as unknown as BookmarkItem} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          <Footer />
        </div>
      </main>
      
      <BackToTop />
    </div>
  );
}

export default App;