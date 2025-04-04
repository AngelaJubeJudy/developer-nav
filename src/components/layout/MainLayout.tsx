import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { bookmarks } from '../../data/bookmarks';

export const MainLayout: React.FC = () => {
  const categories = Object.keys(bookmarks).filter(key => key !== 'ALL');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              开发者导航
            </Link>
            <nav className="hidden md:flex space-x-8">
              {categories.map(category => (
                <Link
                  key={category}
                  to={`/category/${category}`}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {category}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} 开发者导航. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}; 