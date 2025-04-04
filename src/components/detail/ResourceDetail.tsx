import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ResourceDetail as ResourceDetailType, ResourceMetadata } from '../../types';
import { fetchWebsiteMetadata } from '../../utils/metadata';
import { formatDate } from '../../utils/metadata';

export const ResourceDetail: React.FC = () => {
  const { resource } = useLoaderData() as { resource: ResourceDetailType };
  const [metadata, setMetadata] = useState<ResourceMetadata | null>(null);

  useEffect(() => {
    const loadMetadata = async () => {
      const data = await fetchWebsiteMetadata(resource.url);
      setMetadata(data);
    };
    loadMetadata();
  }, [resource.url]);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={metadata?.icon || resource.icon}
            alt={resource.title}
            className="w-16 h-16 rounded-lg"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>
            <p className="text-gray-600">{resource.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">基本信息</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-gray-600">官方链接</dt>
            <dd>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {resource.url}
              </a>
            </dd>
          </div>
          {resource.publishDate && (
            <div>
              <dt className="text-gray-600">发布时间</dt>
              <dd>{formatDate(resource.publishDate)}</dd>
            </div>
          )}
          {resource.publishLocation && (
            <div>
              <dt className="text-gray-600">发布地点</dt>
              <dd>{resource.publishLocation}</dd>
            </div>
          )}
          {resource.version && (
            <div>
              <dt className="text-gray-600">版本</dt>
              <dd>{resource.version}</dd>
            </div>
          )}
          {resource.author && (
            <div>
              <dt className="text-gray-600">作者</dt>
              <dd>{resource.author}</dd>
            </div>
          )}
        </dl>
      </section>

      {resource.features && resource.features.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2">
            {resource.features.map((feature, index) => (
              <li key={index} className="text-gray-700">
                {feature}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">详细介绍</h2>
        <div className="prose max-w-none">{resource.content}</div>
      </section>

      {resource.screenshots && resource.screenshots.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">截图展示</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resource.screenshots.map((screenshot, index) => (
              <img
                key={index}
                src={screenshot}
                alt={`${resource.title} 截图 ${index + 1}`}
                className="rounded-lg shadow-md"
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}; 