import React, { useState, useEffect } from 'react';
import { SearchBar } from '../SearchBar';
import { bookmarks } from '../../data/bookmarks';
import { BookmarkItem } from '../../types';
import { BookmarkCard } from '../BookmarkCard';
import { useTranslation } from 'react-i18next';

export const SearchPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BookmarkItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [featuredTools, setFeaturedTools] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    // 提取所有分类
    const allCategories = Object.keys(bookmarks);
    setCategories(allCategories);
    
    // 设置精选工具（从每个分类中选择第一个工具作为精选）
    const featured = Object.values(bookmarks)
      .map(items => items[0])
      .filter(Boolean)
      .slice(0, 6);
    setFeaturedTools(featured);
  }, []);

  useEffect(() => {
    // 搜索逻辑
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    const results = Object.values(bookmarks)
      .flat()
      .filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    setSearchResults(results);
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-[#6B4F4F] dark:text-gray-200 mb-4">
          {t('navigation.search')}
        </h1>
        <p className="text-lg text-[#8B7E7E] dark:text-gray-400 mb-8">
          {t('hero.description')}
        </p>
      </div>
      
      <div className="w-full max-w-2xl mx-auto mb-12">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {!searchQuery && (
        <>
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#6B4F4F] dark:text-gray-200 mb-6 text-center">
              {t('sections.allTools')}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSearchQuery(category)}
                  className="px-6 py-2 rounded-full bg-[#F7F3F0] dark:bg-gray-700 text-[#6B4F4F] dark:text-gray-200 hover:bg-[#E8E0DD] dark:hover:bg-gray-600 transition-colors"
                >
                  {t(`navigation.${category.toLowerCase().replace(/\s+/g, '')}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#6B4F4F] dark:text-gray-200 mb-6 text-center">
              {t('sections.featuredTools')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.map((item, index) => (
                <BookmarkCard key={`${item.name}-${index}`} item={item} />
              ))}
            </div>
          </div>
        </>
      )}

      {searchQuery && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[#6B4F4F] dark:text-gray-200 mb-6 text-center">
            {t('search.searchResults')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((item, index) => (
              <BookmarkCard key={`${item.name}-${index}`} item={item} />
            ))}
          </div>
          {searchResults.length === 0 && (
            <div className="text-center text-[#8B7E7E] dark:text-gray-400 mt-8">
              {t('search.noResults', { query: searchQuery })}
            </div>
          )}
        </div>
      )}

      <div className="text-center text-[#8B7E7E] dark:text-gray-400 mt-12">
        <p className="text-lg font-medium mb-2">
          {t('search.beYourOwnSolopreneur', 'Be Your Own Solopreneur.')}
        </p>
      </div>
    </div>
  );
}; 