import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { bookmarks } from '../../data/bookmarks';
import { Menu, X } from 'lucide-react';
import { PageTitle } from '../common/PageTitle';

export const MainLayout: React.FC = () => {
  const categories = Object.keys(bookmarks).filter(key => key !== 'ALL');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // 根据当前路径生成页面标题
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return '首页';
    if (path.includes('/resources/resource/')) return '资源详情';
    if (path === '/search') return '搜索';
    if (path === '/submit') return '提交工具';
    if (path === '/sponsor-us') return '赞助我们';
    if (path === '/contact') return '联系我们';
    if (path.includes('/category/')) {
      const category = path.split('/').pop();
      return category || '分类';
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
              <span className="text-xl font-bold text-gray-900">开发者导航</span>
            </Link>
            
            {/* 桌面端导航 */}
            <nav className="hidden md:flex space-x-8">
              {categories.map(category => (
                <Link
                  key={category}
                  to={`/category/${category}`}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </nav>
            
            {/* 移动端菜单按钮 */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* 移动端导航菜单 */}
          {isMobileMenuOpen && (
            <nav className="md:hidden py-4 border-t mt-3">
              <div className="flex flex-col space-y-3">
                {categories.map(category => (
                  <Link
                    key={category}
                    to={`/category/${category}`}
                    className="text-gray-600 hover:text-gray-900 transition-colors py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
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
              <span className="text-lg font-bold text-gray-900">开发者导航</span>
            </div>
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} 开发者导航. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}; 