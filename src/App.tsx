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

// 模拟数据 - 实际应用中这些数据应该从后端获取
const latestTools = [
  {
    name: "New Tool 1",
    description: "Latest AI tool for developers",
    url: "https://example.com/new-tool-1",
    icon: "/icons/new-tool-1.png",
    addedDate: "2024-03-20"
  },
  {
    name: "New Tool 2",
    description: "New development utility",
    url: "https://example.com/new-tool-2",
    icon: "/icons/new-tool-2.png",
    addedDate: "2024-03-19"
  }
];

const mostSearchedTools = [
  {
    name: "Popular Tool 1",
    description: "Most searched development tool",
    url: "https://example.com/popular-1",
    icon: "/icons/popular-1.png",
    searchCount: 1500
  },
  {
    name: "Popular Tool 2",
    description: "Frequently used utility",
    url: "https://example.com/popular-2",
    icon: "/icons/popular-2.png",
    searchCount: 1200
  }
];

const hottestTools = [
  {
    name: "Hot Tool 1",
    description: "Trending development tool",
    url: "https://example.com/hot-1",
    icon: "/icons/hot-1.png",
    trendScore: 95
  },
  {
    name: "Hot Tool 2",
    description: "Rising star in dev tools",
    url: "https://example.com/hot-2",
    icon: "/icons/hot-2.png",
    trendScore: 88
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

  // 使用 requestAnimationFrame 确保在下一帧渲染时滚动到顶部
  const scrollToTop = () => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  // 页面加载时滚动到顶部
  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  // 监听路由变化和分类变化，自动滚动到顶部
  useEffect(() => {
    scrollToTop();
  }, [location.pathname, selectedCategory]);

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
    // 切换分类时滚动到顶部
    scrollToTop();
  };

  // 获取当前分类的工具列表
  const getCurrentCategoryTools = () => {
    switch (selectedCategory) {
      case "NEW":
        return latestTools;
      case "MOST_SEARCHED":
        return mostSearchedTools;
      case "HOTTEST":
        return hottestTools;
      case "ALL":
        return Object.values(filteredBookmarks).flat();
      default:
        return filteredBookmarks[selectedCategory] || [];
    }
  };

  const toggleShareButtons = () => {
    setShowShareButtons(!showShareButtons);
  };

  const isCategoriesPage = selectedCategory !== "ALL" && 
    selectedCategory !== "NEW" && 
    selectedCategory !== "MOST_SEARCHED" && 
    selectedCategory !== "HOTTEST";

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
                {/* 新增的三个选项 */}
                <button
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors py-2"
                  onClick={() => handleCategorySelect("NEW")}
                >
                  <span>New/Latest Tools</span>
                </button>
                <button
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors py-2"
                  onClick={() => handleCategorySelect("MOST_SEARCHED")}
                >
                  <span>Most Searched</span>
                </button>
                <button
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors py-2"
                  onClick={() => handleCategorySelect("HOTTEST")}
                >
                  <span>Hottest</span>
                </button>
                
                {/* 分隔线 */}
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>
                
                {/* 原有的分类导航 */}
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

              {/* 根据页面类型显示不同内容 */}
              {!isCategoriesPage ? (
                <>
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
                      {selectedCategory === "ALL" ? "全部工具" : 
                       selectedCategory === "NEW" ? "最新工具" :
                       selectedCategory === "MOST_SEARCHED" ? "最多搜索" :
                       selectedCategory === "HOTTEST" ? "最热门" :
                       selectedCategory}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCurrentCategoryTools().map((item, index) => (
                        <BookmarkCard key={index} item={item as unknown as BookmarkItem} />
                      ))}
                    </div>
                  </section>

                  <Features />
                  <HowItWorks />
                  <Testimonials />
                  <Pricing />
                  <FAQ />
                </>
              ) : (
                /* Categories页面布局 */
                <section>
                  <h2 className="text-2xl font-semibold text-[#6B4F4F] dark:text-gray-200 mb-6">
                    {selectedCategory}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getCurrentCategoryTools().map((item, index) => (
                      <BookmarkCard key={index} item={item as unknown as BookmarkItem} />
                    ))}
                  </div>
                </section>
              )}
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