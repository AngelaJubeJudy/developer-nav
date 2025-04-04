import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { SearchBar } from '../SearchBar';
import { bookmarks } from '../../data/bookmarks';
import { BookmarkItem } from '../../types';
import { BookmarkCard } from '../BookmarkCard';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'zh', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'fr', name: 'Français' },
];

export const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLang, setCurrentLang] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchResults, setSearchResults] = useState<BookmarkItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // 提取所有分类
    const allCategories = ['ALL', ...Object.keys(bookmarks)];
    setCategories(allCategories);
  }, []);

  useEffect(() => {
    // 搜索逻辑
    const results = Object.entries(bookmarks).flatMap(([category, items]) => 
      items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
    setSearchResults(results);
  }, [searchQuery]);

  const filteredResults = selectedCategory === 'ALL' 
    ? searchResults 
    : searchResults.filter(item => bookmarks[selectedCategory]?.includes(item));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#6B4F4F] dark:text-gray-200 mb-8 text-center">
        Search Tools
      </h1>
      
      <div className="w-full max-w-2xl mx-auto mb-8">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-[#6B4F4F] text-white'
                : 'bg-[#D5C6C6] text-[#6B4F4F] hover:bg-[#B4A7A7]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResults.map((item, index) => (
          <BookmarkCard key={`${item.name}-${index}`} item={item} />
        ))}
      </div>

      {filteredResults.length === 0 && (
        <div className="text-center text-[#8B7E7E] dark:text-gray-400 mt-8">
          No results found for "{searchQuery}"
        </div>
      )}
      
      <div className="flex items-center justify-center gap-4 text-sm text-[#8B7E7E] dark:text-gray-400 mt-8">
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
  );
}; 