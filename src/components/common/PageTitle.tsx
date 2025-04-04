import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTitleProps {
  title?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const location = useLocation();
  const siteName = '开发者导航';
  
  useEffect(() => {
    // 设置页面标题
    document.title = title ? `${title} | ${siteName}` : siteName;
    
    // 更新favicon
    const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (favicon) {
      favicon.href = '/logo.svg';
    }
  }, [title, location]);
  
  return null;
}; 