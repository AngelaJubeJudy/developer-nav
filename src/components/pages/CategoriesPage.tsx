import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BookmarkCard } from '../BookmarkCard';
import { bookmarks } from '../../data/bookmarks';
import { useTranslation } from 'react-i18next';

export const CategoriesPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'ALL';

  const handleCategorySelect = (newCategory: string) => {
    if (newCategory === 'ALL') {
      navigate('/');
    } else {
      navigate(`/categories?category=${newCategory}`);
    }
  };

  const currentBookmarks = bookmarks[category] || bookmarks['ALL'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t(`categories.${category.toLowerCase()}`)}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentBookmarks.map((item, index) => (
          <BookmarkCard
            key={index}
            item={item}
            onCategorySelect={handleCategorySelect}
          />
        ))}
      </div>
    </div>
  );
}; 