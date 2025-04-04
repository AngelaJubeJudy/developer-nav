import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { bookmarks } from '../../data/bookmarks';
import { Menu, X, ChevronDown } from 'lucide-react';
import { PageTitle } from '../common/PageTitle';
import { useTranslation } from 'react-i18next';

export const MainLayout: React.FC = () => {
  const categories = Object.keys(bookmarks).filter(key => key !== 'ALL');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useTranslation();
  
  // 根据当前路径生成页面标题
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return t('navigation.home');
    if (path.includes('/resources/resource/')) return t('navigation.resourceDetails');
    if (path === '/search') return t('navigation.search');
    if (path === '/submit') return t('navigation.submitTool');
    if (path === '/sponsor-us') return t('navigation.sponsor');
    if (path === '/contact') return t('navigation.contact');
    if (path.includes('/category/')) {
      const category = path.split('/').pop();
      return t(`navigation.${category?.toLowerCase().replace(/\s+/g, '')}`) || category || t('navigation.category');
    }
    return '';
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <PageTitle title={getPageTitle()} />
      
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <img src="/logo.svg" alt="Logo" className="w-8 h-8 transition-transform group-hover:scale-105" />
              <span className="text-xl font-bold text-gray-900">{t('common.siteName')}</span>
            </Link>
            
            {/* 桌面端导航 */}
            <nav className="hidden md:flex items-center space-x-6">
              {categories.map(category => {
                const subCategories = bookmarks[category] || [];
                const hasSubCategories = subCategories.length > 0;
                
                return (
                  <div key={category} className="relative group">
                    <button
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors py-2"
                      onClick={() => setActiveDropdown(activeDropdown === category ? null : category)}
                    >
                      <span>{t(`navigation.${category.toLowerCase().replace(/\s+/g, '')}`)}</span>
                      {hasSubCategories && <ChevronDown size={16} />}
                    </button>
                    
                    {hasSubCategories && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 hidden group-hover:block">
                        {subCategories.map((subCat, index) => (
                          <Link
                            key={index}
                            to={`/category/${category}/${subCat.name}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {t(`navigation.${subCat.name?.toLowerCase().replace(/\s+/g, '')}`) || subCat.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            
            {/* 移动端菜单按钮 */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={t('common.toggleMenu')}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* 移动端导航菜单 */}
          {isMobileMenuOpen && (
            <nav className="md:hidden py-4 border-t mt-3">
              <div className="flex flex-col space-y-3">
                {categories.map(category => {
                  const subCategories = bookmarks[category] || [];
                  const hasSubCategories = subCategories.length > 0;
                  
                  return (
                    <div key={category}>
                      <button
                        className="flex items-center justify-between w-full text-gray-600 hover:text-gray-900 py-2"
                        onClick={() => setActiveDropdown(activeDropdown === category ? null : category)}
                      >
                        <span>{t(`navigation.${category.toLowerCase().replace(/\s+/g, '')}`)}</span>
                        {hasSubCategories && <ChevronDown size={16} />}
                      </button>
                      
                      {hasSubCategories && activeDropdown === category && (
                        <div className="pl-4 mt-2 space-y-2">
                          {subCategories.map((subCat, index) => (
                            <Link
                              key={index}
                              to={`/category/${category}/${subCat.name}`}
                              className="block text-sm text-gray-600 hover:text-gray-900"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {t(`navigation.${subCat.name?.toLowerCase().replace(/\s+/g, '')}`) || subCat.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </nav>
          )}
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
              <span className="text-lg font-bold text-gray-900">{t('common.siteName')}</span>
            </div>
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} {t('common.siteName')}. {t('common.allRightsReserved')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}; 