import { BookmarkData, ResourceBase } from '../types';
import { generateResourceId } from './metadata';

export function convertBookmarksToResources(bookmarks: BookmarkData): ResourceBase[] {
  const resources: ResourceBase[] = [];
  
  // 处理 ALL 分类下的所有书签
  if (bookmarks.ALL) {
    bookmarks.ALL.forEach(bookmark => {
      resources.push({
        id: generateResourceId(bookmark.name),
        title: bookmark.name,
        description: bookmark.description || '',
        url: bookmark.url,
        icon: bookmark.icon || '',
        category: 'resource',
        tags: bookmark.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    });
  }
  
  // 处理其他分类
  Object.entries(bookmarks).forEach(([category, items]) => {
    if (category !== 'ALL') {
      items.forEach(item => {
        // 处理单个书签
        if (item.url) {
          resources.push({
            id: generateResourceId(item.name),
            title: item.name,
            description: item.description || '',
            url: item.url,
            icon: item.icon || '',
            category: 'resource',
            tags: [category, ...(item.tags || [])],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        }
        
        // 处理包含多个子项的书签
        if (item.items) {
          item.items.forEach(subItem => {
            resources.push({
              id: generateResourceId(subItem.name || subItem.url),
              title: subItem.name || subItem.url,
              description: subItem.description || '',
              url: subItem.url,
              icon: subItem.icon || '',
              category: 'resource',
              tags: [category, item.name, ...(subItem.tags || [])],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
          });
        }
      });
    }
  });
  
  return resources;
} 