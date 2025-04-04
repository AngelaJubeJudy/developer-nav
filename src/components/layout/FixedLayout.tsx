import React from 'react';
import { Globe, Moon, Sun, Share2 } from 'lucide-react';
import { ShareButtons } from '../common/ShareButtons';
import { useTranslation } from 'react-i18next';
import { Sidebar } from '../Sidebar';
import { BookmarkCategory } from '../../types';
import BackToTop from '../common/BackToTop';

interface FixedLayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  languages: Array<{ code: string; name: string }>;
  showShareButtons: boolean;
  toggleShareButtons: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  bookmarks: Record<string, BookmarkCategory[]>;
}

export const FixedLayout: React.FC<FixedLayoutProps> = ({
  children,
  isDarkMode,
  setIsDarkMode,
  currentLang,
  setCurrentLang,
  languages,
  showShareButtons,
  toggleShareButtons,
  isSidebarOpen,
  toggleSidebar,
  selectedCategory,
  onSelectCategory,
  bookmarks,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen bg-[#F7F3F0] dark:bg-gray-900 transition-colors duration-200">
      {/* 固定左侧导航 */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <Sidebar
          bookmarks={bookmarks}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* 主内容区域 */}
      <div className={`flex-1 min-h-screen transition-all duration-300
        ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}
        ${!isSidebarOpen && 'ml-0'}`}>
        
        {/* 固定顶部栏 */}
        <div className="fixed top-0 right-0 left-0 z-40 bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex justify-end items-center space-x-4">
              {/* 分享按钮 */}
              <button
                onClick={toggleShareButtons}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={t('features.easySharing.title')}
              >
                <Share2 className="text-[#6B4F4F] dark:text-gray-200" size={24} />
              </button>

              {/* 日夜模式切换 */}
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

              {/* 语言切换 */}
              <div className="flex items-center space-x-2 text-sm text-[#8B7E7E] dark:text-gray-400">
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
          </div>
        </div>

        {/* 分享按钮弹出层 */}
        {showShareButtons && (
          <div className="fixed top-20 right-4 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <ShareButtons 
              url={window.location.href} 
              title={t('common.shareTitle')} 
            />
          </div>
        )}

        {/* 主要内容区域 */}
        <div className="pt-16">
          {children}
        </div>

        {/* 返回顶部按钮 */}
        <BackToTop />
      </div>
    </div>
  );
}; 