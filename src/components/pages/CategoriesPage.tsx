import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookmarkCard } from '../BookmarkCard';
import { bookmarks } from '../../data/bookmarks';
import { useTranslation } from 'react-i18next';

// 分类卡片组件
const CategoryCard: React.FC<{
  name: string;
  description: string;
  count: number;
  onClick: () => void;
  isActive: boolean;
}> = ({ name, description, count, onClick, isActive }) => {
  const { t } = useTranslation();
  
  return (
    <div 
      className={`p-6 rounded-lg shadow-sm cursor-pointer transition-all duration-300 flex flex-col h-full
        ${isActive 
          ? 'bg-[#B4A7A7] dark:bg-gray-700 text-white' 
          : 'bg-white dark:bg-gray-800 hover:shadow-md text-[#6B4F4F] dark:text-gray-200'}`}
      onClick={onClick}
    >
      <h3 className="text-xl font-bold mb-3">{t(`categories.${name}`)}</h3>
      <p className="text-center flex-grow text-sm mb-4">{description}</p>
      <div className="text-xs mt-auto">
        {count} {count === 1 ? t('common.tool') : t('common.tools')}
      </div>
    </div>
  );
};

export const CategoriesPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'ALL';
  const [expandedCategory, setExpandedCategory] = useState(category);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const contentRef = useRef<HTMLDivElement>(null);

  // 计算所有工具总数
  const totalToolsCount = Object.values(bookmarks).reduce((total, items) => total + items.length, 0);

  // 处理分类选择
  const handleCategorySelect = (newCategory: string) => {
    setExpandedCategory(newCategory);
    setSearchParams({ category: newCategory });
    
    // 滚动到对应分类区域
    setTimeout(() => {
      if (categoryRefs.current[newCategory]) {
        categoryRefs.current[newCategory]?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // 短暂延迟确保DOM已更新
  };

  // 分类卡片数据
  const categoryCards = [
    { name: 'all', description: t('categories.description', { count: totalToolsCount }), count: totalToolsCount },
    { name: 'keywords', description: t('categories.keywordsDescription'), count: bookmarks['keywords']?.length || 0 },
    { name: 'templates', description: t('categories.templatesDescription'), count: bookmarks['templates']?.length || 0 },
    { name: 'news', description: t('categories.newsDescription'), count: bookmarks['news']?.length || 0 },
    { name: 'tools', description: t('categories.toolsDescription'), count: bookmarks['tools']?.length || 0 },
    { name: 'buildYourTools', description: t('categories.buildYourToolsDescription'), count: bookmarks['buildYourTools']?.length || 0 },
  ].sort((a, b) => a.name.localeCompare(b.name));

  // 页面加载时滚动到当前分类
  useEffect(() => {
    if (categoryRefs.current[category]) {
      categoryRefs.current[category]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8" ref={contentRef}>
      {/* 页面标题和描述 */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-[#6B4F4F] dark:text-gray-200">{t('categories.title')}</h1>
        <p className="text-lg text-[#8B7E7E] dark:text-gray-400">{totalToolsCount} {t('common.tools')} {t('common.byFar')}</p>
      </div>

      {/* 分类卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categoryCards.map((card) => (
          <CategoryCard
            key={card.name}
            name={card.name}
            description={card.description}
            count={card.count}
            onClick={() => handleCategorySelect(card.name)}
            isActive={expandedCategory === card.name}
          />
        ))}
      </div>

      {/* 分类内容区域 */}
      {categoryCards.map((card) => (
        <div 
          key={card.name} 
          ref={el => categoryRefs.current[card.name] = el}
          className={`mb-12 transition-all duration-300 ${expandedCategory === card.name ? 'opacity-100 max-h-[5000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}
        >
          <h2 className="text-2xl font-bold mb-6 text-[#6B4F4F] dark:text-gray-200">
            {t(`categories.${card.name}`)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(bookmarks[card.name === 'all' ? 'ALL' : card.name] || []).map((item, index) => (
              <BookmarkCard
                key={index}
                item={item}
                onCategorySelect={handleCategorySelect}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}; 