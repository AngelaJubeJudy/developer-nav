import React, { useState, useEffect } from 'react';
import { Globe, Moon, Sun, Share2, ChevronDown } from 'lucide-react';
import { bookmarks } from './data/bookmarks';
import { Sidebar } from './components/Sidebar';
import { SearchBar } from './components/SearchBar';
import { BookmarkCard } from './components/BookmarkCard';
import { ShareButtons } from './components/common/ShareButtons';
import { BookmarkCategory, BookmarkItem } from './types';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/layout/Header';
import Hero from './components/layout/Hero';
import Testimonials from './components/layout/Testimonials';
import FAQ from './components/layout/FAQ';
import Features from './components/layout/Features';
import Pricing from './components/layout/Pricing';
import HowItWorks from './components/layout/HowItWorks';
import Footer from './components/layout/Footer';
import BackToTop from './components/common/BackToTop';
import { ToolCard } from './components/common/ToolCard';
import { FixedLayout } from './components/layout/FixedLayout';

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
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' ||
        (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [showShareButtons, setShowShareButtons] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  
  const navigate = useNavigate();
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/resources/');
  const isSearchPage = location.pathname === '/search';
  const isSubmitPage = location.pathname === '/submit';
  const isSubmitToolPage = location.pathname === '/submit-tool';
  const isCustomCampaignPage = location.pathname === '/custom-campaign';
  const isSponsorPage = location.pathname === '/sponsor-us';
  const isContactPage = location.pathname === '/contact';
  const isSpecialPage = isDetailPage || isSearchPage || isSubmitPage || isSubmitToolPage || isCustomCampaignPage || isSponsorPage || isContactPage;

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

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
  };

  const navigation = [
    { name: t('navigation.newTools'), href: '/?category=NEW' },
    { name: t('navigation.mostSearched'), href: '/?category=MOST_SEARCHED' },
    { name: t('navigation.hottest'), href: '/?category=HOTTEST' },
  ];

  return (
    <FixedLayout
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      currentLang={currentLang}
      setCurrentLang={handleLanguageChange}
      languages={languages}
      showShareButtons={showShareButtons}
      toggleShareButtons={toggleShareButtons}
      isSidebarOpen={isSidebarOpen}
      toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      selectedCategory={selectedCategory}
      onSelectCategory={handleCategorySelect}
      bookmarks={bookmarks}
    >
      <Outlet />
    </FixedLayout>
  );
}

export default App;