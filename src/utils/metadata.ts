import { ResourceMetadata } from '../types';

export async function fetchWebsiteMetadata(url: string): Promise<ResourceMetadata> {
  try {
    const response = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch metadata');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      title: '',
      description: '',
      icon: '',
    };
  }
}

export function generateResourceId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
} 