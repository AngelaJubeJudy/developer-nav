import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { bookmarks } from '../../data/bookmarks';
import { BookmarkItem } from '../../types';
import { ArrowLeft, ExternalLink, Share2 } from 'lucide-react';
import { ShareButtons } from '../common/ShareButtons';
import { addUtmSource } from '../../utils/url';
import { useTranslation } from 'react-i18next';

export const ResourceDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [resource, setResource] = useState<BookmarkItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShareButtons, setShowShareButtons] = useState(false);
  const { t } = useTranslation();

  // 获取来源页面
  const getBackPath = () => {
    // 从 location.state 中获取来源页面
    const from = location.state?.from;
    
    if (from) {
      return from;
    }
    
    // 如果没有来源信息，默认返回首页
    return '/';
  };

  useEffect(() => {
    // 解码 URL 参数
    const decodedId = decodeURIComponent(id || '');
    
    // 在所有书签中查找匹配的资源
    let foundResource: BookmarkItem | null = null;
    
    // 遍历所有分类
    Object.values(bookmarks).forEach(categoryItems => {
      categoryItems.forEach(item => {
        // 检查当前项
        if (item.name === decodedId) {
          foundResource = item;
        }
        
        // 检查子项
        if (item.items) {
          item.items.forEach(subItem => {
            if (subItem.name === decodedId) {
              foundResource = subItem;
            }
          });
        }
      });
    });
    
    setResource(foundResource);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6B4F4F]"></div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-[#6B4F4F] dark:text-gray-200 mb-4">
          {t('resourceDetail.resourceNotFound')}
        </h2>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-[#B4A7A7] text-white rounded-lg hover:bg-[#6B4F4F] transition-colors"
        >
          {t('resourceDetail.backToHome')}
        </button>
      </div>
    );
  }

  const toggleShareButtons = () => {
    setShowShareButtons(!showShareButtons);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(getBackPath())}
          className="flex items-center text-[#6B4F4F] dark:text-gray-300 hover:text-[#B4A7A7] dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          {t('resourceDetail.back')}
        </button>
        
        <button
          onClick={toggleShareButtons}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Share"
        >
          <Share2 className="text-[#6B4F4F] dark:text-gray-200" size={24} />
        </button>
      </div>
      
      {showShareButtons && (
        <div className="mb-6">
          <ShareButtons 
            url={window.location.href} 
            title={`${resource.name} - Developer Tools`} 
          />
        </div>
      )}
      
      <div className="flex items-start mb-6">
        {resource.icon && (
          <span className="text-4xl mr-4">{resource.icon}</span>
        )}
        <div>
          <h1 className="text-3xl font-bold text-[#6B4F4F] dark:text-gray-200 mb-2">
            {resource.name}
          </h1>
          {resource.description && (
            <p className="text-lg text-[#8B7E7E] dark:text-gray-400">
              {resource.description}
            </p>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <a
          href={addUtmSource(resource.url)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-[#B4A7A7] text-white rounded-lg hover:bg-[#6B4F4F] transition-colors"
        >
          <ExternalLink size={18} className="mr-2" />
          {t('resourceDetail.visitOfficialWebsite')}
        </a>
      </div>
      
      {resource.tags && resource.tags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#6B4F4F] dark:text-gray-200 mb-3">
            {t('resourceDetail.tags')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {resource.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#F7F3F0] dark:bg-gray-700 text-[#6B4F4F] dark:text-gray-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="prose max-w-none dark:prose-invert">
        <h2 className="text-xl font-semibold text-[#6B4F4F] dark:text-gray-200 mb-3">
          {t('resourceDetail.about')}
        </h2>
        <p className="text-[#8B7E7E] dark:text-gray-400">
          {resource.description || t('resourceDetail.defaultDescription')}
        </p>
      </div>
    </div>
  );
}; 