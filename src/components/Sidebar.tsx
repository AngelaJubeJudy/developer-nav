import React, { useState } from 'react';
import { BookmarkData } from '../types';
import { Menu, ChevronDown, ChevronRight, ChevronLeft, ChevronUp, Flame } from 'lucide-react';

interface SidebarProps {
  bookmarks: BookmarkData;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface CategoryItemProps {
  name: string;
  items?: any[];
  level?: number;
  isSelected: boolean;
  onSelect: (category: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  name,
  items,
  level = 0,
  isSelected,
  onSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasSubItems = items && items.length > 0;
  const paddingLeft = `${level * 1}rem`;

  return (
    <div>
      <button
        onClick={() => {
          onSelect(name);
          if (hasSubItems) {
            setIsExpanded(!isExpanded);
          }
        }}
        className={`w-full text-left p-3 rounded-lg mb-1 transition-colors flex items-center
          ${isSelected
            ? 'bg-[#B4A7A7] dark:bg-gray-700 text-white'
            : 'hover:bg-[#D5C6C6] dark:hover:bg-gray-700 text-[#6B4F4F] dark:text-gray-200'
          }`}
        style={{ paddingLeft: paddingLeft }}
      >
        {hasSubItems && (
          <span className="mr-2">
            {isExpanded ? (
              <ChevronDown size={16} className="inline" />
            ) : (
              <ChevronRight size={16} className="inline" />
            )}
          </span>
        )}
        <span className="flex-1">{name}</span>
      </button>
      {hasSubItems && isExpanded && (
        <div className="ml-4">
          {items.map((item, index) => (
            <CategoryItem
              key={index}
              name={item.name || `Item ${index + 1}`}
              items={item.items}
              level={level + 1}
              isSelected={isSelected}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FeaturedCategory: React.FC<{ title: string; icon?: React.ReactNode }> = ({
  title,
  icon,
}) => (
  <button className="w-full text-left p-3 rounded-lg mb-1 transition-colors flex items-center hover:bg-[#D5C6C6] dark:hover:bg-gray-700 text-[#6B4F4F] dark:text-gray-200">
    {icon}
    <span className="ml-2">{title}</span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({
  bookmarks,
  selectedCategory,
  onSelectCategory,
  isSidebarOpen,
  toggleSidebar,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#E8E1D9] dark:bg-gray-800 rounded-md"
        onClick={toggleSidebar}
      >
        <Menu size={24} className="text-[#6B4F4F] dark:text-gray-200" />
      </button>
      <div
        className={`fixed top-0 left-0 h-full bg-[#E8E1D9] dark:bg-gray-800 transform transition-all duration-300 ease-in-out z-40 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}
      >
        <div className="p-4 overflow-y-auto h-full relative">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute right-2 top-2 p-2 rounded-full hover:bg-[#D5C6C6] dark:hover:bg-gray-700 transition-colors"
          >
            {isSidebarCollapsed ? (
              <ChevronRight size={20} className="text-[#6B4F4F] dark:text-gray-200" />
            ) : (
              <ChevronLeft size={20} className="text-[#6B4F4F] dark:text-gray-200" />
            )}
          </button>

          {!isSidebarCollapsed && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4 text-[#6B4F4F] dark:text-gray-200">Featured</h2>
                <FeaturedCategory
                  title="🔥 Latest Weekly"
                  icon={<Flame size={16} className="text-orange-500" />}
                />
                <FeaturedCategory
                  title="🔥 Most Searched"
                  icon={<Flame size={16} className="text-orange-500" />}
                />
                <FeaturedCategory
                  title="🔥 Top By Regions"
                  icon={<Flame size={16} className="text-orange-500" />}
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#6B4F4F] dark:text-gray-200">Categories</h2>
                <nav className="space-y-1">
                  {Object.entries(bookmarks).map(([category, items]) => (
                    <CategoryItem
                      key={category}
                      name={category}
                      items={items}
                      isSelected={selectedCategory === category}
                      onSelect={onSelectCategory}
                    />
                  ))}
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};