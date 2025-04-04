import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookmarkCard } from '../BookmarkCard';
import { bookmarks } from '../../data/bookmarks';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    if (category === 'ALL') {
      navigate('/');
    } else {
      navigate(`/categories?category=${category}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bookmarks['ALL'].map((item, index) => (
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