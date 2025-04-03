export interface BookmarkItem {
  name?: string;
  url: string;
  items?: BookmarkItem[];
}

export interface BookmarkCategory {
  name: string;
  url?: string;
  items?: BookmarkItem[];
}

export interface BookmarkData {
  [category: string]: BookmarkCategory[];
}