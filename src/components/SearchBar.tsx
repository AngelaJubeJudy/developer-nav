import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative max-w-2xl w-full">
      <input
        type="text"
        placeholder="Search developer tools..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-3 pl-12 rounded-lg bg-white dark:bg-gray-800 border border-[#D5C6C6] dark:border-gray-700 focus:outline-none focus:border-[#B4A7A7] dark:focus:border-gray-600 text-[#6B4F4F] dark:text-gray-200 placeholder-[#B4A7A7] dark:placeholder-gray-500"
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#B4A7A7] dark:text-gray-500" size={20} />
    </div>
  );
};