import React, { useState } from 'react';
import { BookmarkData, BookmarkItem } from '../types';
import { 
  Menu, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft, 
  Home, 
  Search, 
  FolderTree, 
  Upload, 
  Mail,
  X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  bookmarks: BookmarkData;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  onClick,
  isActive = false,
  isCollapsed,
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-3 rounded-lg mb-1 transition-colors flex items-center
      ${isActive
        ? 'bg-[#B4A7A7] dark:bg-gray-700 text-white'
        : 'hover:bg-[#D5C6C6] dark:hover:bg-gray-700 text-[#6B4F4F] dark:text-gray-200'
      }`}
    title={isCollapsed ? label : undefined}
  >
    <span className="flex items-center justify-center w-6 h-6">
      {icon}
    </span>
    {!isCollapsed && <span className="ml-3">{label}</span>}
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
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate('/');
    onSelectCategory("ALL");
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleSubmitClick = () => {
    navigate('/submit');
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleCategoriesClick = () => {
    navigate('/');
    onSelectCategory("ALL");
  };

  const isHomeActive = location.pathname === '/';
  const isSearchActive = location.pathname === '/search';
  const isSubmitActive = location.pathname === '/submit';
  const isContactActive = location.pathname === '/contact';

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 hover:bg-[#D5C6C6] dark:hover:bg-gray-700 rounded-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <X size={24} className="text-[#6B4F4F] dark:text-gray-200" />
        ) : (
          <Menu size={24} className="text-[#6B4F4F] dark:text-gray-200" />
        )}
      </button>
      <aside
        className={`fixed lg:relative top-0 left-0 h-screen flex-shrink-0 transform transition-all duration-300 ease-in-out z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}
      >
        <div className="h-full relative border-r border-[#D5C6C6] dark:border-gray-700 bg-white dark:bg-gray-900">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-[#D5C6C6] dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-900 shadow-md"
          >
            {isSidebarCollapsed ? (
              <ChevronRight size={20} className="text-[#6B4F4F] dark:text-gray-200" />
            ) : (
              <ChevronLeft size={20} className="text-[#6B4F4F] dark:text-gray-200" />
            )}
          </button>

          <div className="h-full p-4 overflow-y-auto">
            <div className="mb-6">
              <NavItem
                icon={<Home size={20} />}
                label="Home"
                onClick={handleHomeClick}
                isActive={isHomeActive}
                isCollapsed={isSidebarCollapsed}
              />
              <NavItem
                icon={<Search size={20} />}
                label="Search"
                onClick={handleSearchClick}
                isActive={isSearchActive}
                isCollapsed={isSidebarCollapsed}
              />
              <NavItem
                icon={<FolderTree size={20} />}
                label="Categories"
                onClick={handleCategoriesClick}
                isActive={!isHomeActive && !isSearchActive && !isSubmitActive && !isContactActive}
                isCollapsed={isSidebarCollapsed}
              />
              <NavItem
                icon={<Upload size={20} />}
                label="Submit Your Tools"
                onClick={handleSubmitClick}
                isActive={isSubmitActive}
                isCollapsed={isSidebarCollapsed}
              />
              <NavItem
                icon={<Mail size={20} />}
                label="Contact Us"
                onClick={handleContactClick}
                isActive={isContactActive}
                isCollapsed={isSidebarCollapsed}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};