export interface BookmarkItem {
  name: string;
  url: string;
  description?: string;
  icon?: string;
  tags?: string[];
  items?: BookmarkItem[];
}

export interface BookmarkCategory extends BookmarkItem {
  name: string;
}

export interface BookmarkData {
  [category: string]: BookmarkItem[];
}

export interface ResourceBase {
  id: string;
  title: string;
  description: string;
  url: string;
  icon?: string;
  category: 'tool' | 'platform' | 'resource';
  tags: string[];
  publishDate?: string;
  publishLocation?: string;
  officialName?: string;
  officialDescription?: string;
  features?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ResourceDetail extends ResourceBase {
  content: string;
  screenshots?: string[];
  relatedResources?: string[];
  version?: string;
  author?: string;
  license?: string;
}

export interface ResourceMetadata {
  title: string;
  description: string;
  icon: string;
  ogImage?: string;
  keywords?: string[];
}

export type ResourceCategory = ResourceBase['category'];