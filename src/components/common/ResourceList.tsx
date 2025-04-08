import React from 'react';
import { ResourceBase } from '../../types';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
import { bookmarks } from '../../data/bookmarks';

interface ResourceListProps {
  resources: ResourceBase[];
  category?: string;
}

export const ResourceList: React.FC<ResourceListProps> = ({
  resources,
}) => {
  const loaderData = useLoaderData() as { category?: string } | undefined;
  const category = loaderData?.category;
  const location = useLocation();
  
  // 获取当前路径作为来源页面
  const getFromPath = () => {
    return location.pathname;
  };
  
  const filteredResources = category
    ? resources.filter((resource) => resource.tags.includes(category))
    : resources;
    
  const categories = Object.keys(bookmarks).filter(key => key !== 'ALL');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {category ? `${category} 资源` : '全部资源'}
        </h1>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/"
            className={`px-3 py-1 rounded-full text-sm ${
              !category
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            全部
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className={`px-3 py-1 rounded-full text-sm ${
                category === cat
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Link
            key={resource.id}
            to={`/resources/${resource.category}/${resource.id}`}
            state={{ from: getFromPath() }}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={resource.icon}
                alt={resource.title}
                className="w-12 h-12 rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold mb-1">{resource.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {resource.description}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {resource.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
              {resource.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                  +{resource.tags.length - 3}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}; 