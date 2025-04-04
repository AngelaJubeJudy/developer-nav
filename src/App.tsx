import React, { useState, useEffect } from 'react';
import { Globe, Moon, Sun, Share2, ChevronDown } from 'lucide-react';
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

// 精选工具数据
const featuredTools = [
  {
    name: "ChatGPT",
    description: "OpenAI's powerful language model for natural conversations",
    url: "https://chat.openai.com",
    icon: "/icons/chatgpt.png"
  },
  {
    name: "GitHub Copilot",
    description: "AI pair programmer that helps you write better code",
    url: "https://github.com/features/copilot",
    icon: "/icons/github-copilot.png"
  },
  {
    name: "Midjourney",
    description: "Create stunning artwork with AI",
    url: "https://www.midjourney.com",
    icon: "/icons/midjourney.png"
  },
  {
    name: "Notion AI",
    description: "AI-powered workspace for your notes and tasks",
    url: "https://www.notion.so",
    icon: "/icons/notion.png"
  },
  {
    name: "Figma",
    description: "Collaborative interface design tool",
    url: "https://www.figma.com",
    icon: "/icons/figma.png"
  }
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
              
              {/* 顶部导航栏 */}
              <nav className="hidden md:flex items-center justify-center space-x-8 mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                {Object.keys(bookmarks).filter(key => key !== 'ALL').map(category => {
                  const subCategories = bookmarks[category] || [];
                  const hasSubCategories = subCategories.length > 0;
                  
                  return (
                    <div key={category} className="relative group">
                      <button
                        className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors py-2"
                        onClick={() => handleCategorySelect(category)}
                      >
                        <span>{category}</span>
                        {hasSubCategories && <ChevronDown size={16} />}
                      </button>
                      
                      {hasSubCategories && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 hidden group-hover:block z-50">
                          {subCategories.map((subCat, index) => (
                            <button
                              key={index}
                              onClick={() => handleCategorySelect(subCat.name || '')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              {subCat.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
              
              <Hero 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              {/* 精选工具区域 */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#6B4F4F] dark:text-gray-200 mb-6">
                  精选工具
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredTools.map((tool, index) => (
                    <BookmarkCard key={index} item={tool as unknown as BookmarkItem} />
                  ))}
                </div>
              </section>

              {/* 分类工具区域 */}
              <section>
                <h2 className="text-2xl font-semibold text-[#6B4F4F] dark:text-gray-200 mb-6">
                  {selectedCategory === "ALL" ? "全部工具" : selectedCategory}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(filteredBookmarks).map(([category, items]) => (
                    <React.Fragment key={category}>
                      {selectedCategory === "ALL" || selectedCategory === category ? (
                        items.map((item, index) => (
                          <BookmarkCard key={index} item={item as unknown as BookmarkItem} />
                        ))
                      ) : null}
                    </React.Fragment>
                  ))}
                </div>
              </section>

              <Features />
              <HowItWorks />
              <Testimonials />
              <Pricing />
              <FAQ />
            </>
          )}

          {isSpecialPage ? (
            <Outlet />
          ) : null}

          <Footer />
        </div>
      </main>
      
      <BackToTop />
    </div>
  );
}

export default App;