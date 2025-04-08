import React from 'react';
import { BookmarkItem } from '../types';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { addUtmSource } from '../utils/url';

interface BookmarkCardProps {
  item: BookmarkItem;
  onCategorySelect?: (category: string) => void;
}

const getHostname = (url: string): string => {
  try {
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
    return new URL(urlWithProtocol).hostname;
  } catch {
    return url;
  }
};

export const BookmarkCard: React.FC<BookmarkCardProps> = ({ item, onCategorySelect }) => {
  if (item.items) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-[#6B4F4F] dark:text-gray-200 mb-4">{item.name}</h3>
        <div className="space-y-3">
          {item.items.map((subItem, index) => (
            <Link
              key={index}
              to={`/resources/resource/${encodeURIComponent(subItem.name || getHostname(subItem.url))}`}
              className="flex items-center text-sm text-[#8B7E7E] dark:text-gray-400 hover:text-[#6B4F4F] dark:hover:text-gray-200 transition-colors"
            >
              <ExternalLink size={14} className="mr-2" />
              <span className="truncate">
                {subItem.name || getHostname(subItem.url)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      to={`/resources/resource/${encodeURIComponent(item.name || getHostname(item.url))}`}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
    >
      <div className="flex items-start mb-3">
        {item.icon && (
          <span className="text-2xl mr-3">{item.icon}</span>
        )}
        <div>
          <h3 className="text-lg font-medium text-[#6B4F4F] dark:text-gray-200 mb-1">
            {item.name || getHostname(item.url)}
          </h3>
          {item.description && (
            <p className="text-sm text-[#8B7E7E] dark:text-gray-400 mb-2">{item.description}</p>
          )}
        </div>
      </div>
      
      {item.tags && item.tags.length > 0 && (
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 5).map((tag, index) => (
              <span 
                key={index} 
                className="text-xs bg-[#F7F3F0] dark:bg-gray-700 text-[#6B4F4F] dark:text-gray-300 px-2 py-1 rounded-full cursor-pointer hover:bg-[#E8E0DD] dark:hover:bg-gray-600"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCategorySelect?.(tag);
                }}
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 5 && (
              <span className="text-xs text-[#8B7E7E] dark:text-gray-400">
                +{item.tags.length - 5}
              </span>
            )}
          </div>
        </div>
      )}
    </Link>
  );
};