import React from 'react';
import { BookmarkItem } from '../types';
import { ExternalLink } from 'lucide-react';

interface BookmarkCardProps {
  item: BookmarkItem;
}

const getHostname = (url: string): string => {
  try {
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
    return new URL(urlWithProtocol).hostname;
  } catch (error) {
    return url;
  }
};

export const BookmarkCard: React.FC<BookmarkCardProps> = ({ item }) => {
  if (item.items) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-[#6B4F4F] dark:text-gray-200 mb-4">{item.name}</h3>
        <div className="space-y-3">
          {item.items.map((subItem, index) => (
            <a
              key={index}
              href={subItem.url.startsWith('http') ? subItem.url : `https://${subItem.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-[#8B7E7E] dark:text-gray-400 hover:text-[#6B4F4F] dark:hover:text-gray-200 transition-colors"
            >
              <ExternalLink size={14} className="mr-2" />
              <span className="truncate">
                {subItem.name || getHostname(subItem.url)}
              </span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <a
      href={item.url.startsWith('http') ? item.url : `https://${item.url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <h3 className="text-lg font-medium text-[#6B4F4F] dark:text-gray-200 mb-2">
        {item.name || getHostname(item.url)}
      </h3>
      <p className="text-sm text-[#8B7E7E] dark:text-gray-400 truncate">{item.url}</p>
    </a>
  );
};