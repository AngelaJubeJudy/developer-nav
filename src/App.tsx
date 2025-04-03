import React, { useState, useEffect } from 'react';
import { Globe, Moon, Sun } from 'lucide-react';
import { bookmarks } from './data/bookmarks';
import { Sidebar } from './components/Sidebar';
import { SearchBar } from './components/SearchBar';
import { BookmarkCard } from './components/BookmarkCard';
import { BookmarkCategory } from './types';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'zh', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'fr', name: 'Français' },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(bookmarks)[0]);
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

  return (
    <div className="min-h-screen bg-[#F7F3F0] dark:bg-gray-900 transition-colors duration-200">
      <Sidebar
        bookmarks={bookmarks}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} p-8`}>
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="text-yellow-500" size={24} />
                ) : (
                  <Moon className="text-gray-600" size={24} />
                )}
              </button>
            </div>
            <h1 className="text-4xl font-bold text-[#6B4F4F] dark:text-gray-200 mb-4">
              Developer Tools
            </h1>
            <p className="text-xl text-[#8B7E7E] dark:text-gray-400 mb-6">
              Discover Latest Products Quickly As A Developer
            </p>
            <div className="flex justify-center mb-8">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-[#8B7E7E] dark:text-gray-400">
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
          </header>

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
                    <BookmarkCard key={index} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </section>

          <footer className="text-center mt-16 pb-8 text-[#8B7E7E] dark:text-gray-400">
            <p className="mb-2">Never lose a tool you love all over the world.</p>
            <p>Be Your Own Solopreneur.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;