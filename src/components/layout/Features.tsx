import React from 'react';
import { Search, Globe, Bookmark, Share2 } from 'lucide-react';

const features = [
  {
    icon: <Search className="w-8 h-8" />,
    title: 'Smart Search',
    description: 'Quickly find the tools you need with our intelligent search system'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Global Community',
    description: 'Connect with developers worldwide and discover trending tools'
  },
  {
    icon: <Bookmark className="w-8 h-8" />,
    title: 'Save Favorites',
    description: 'Bookmark your favorite tools and access them anytime'
  },
  {
    icon: <Share2 className="w-8 h-8" />,
    title: 'Easy Sharing',
    description: 'Share useful tools with your team and network'
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-12">
          Why Choose Our Platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 text-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex justify-center mb-4 text-[#6B4F4F] dark:text-gray-200">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#6B4F4F] dark:text-gray-200">
                {feature.title}
              </h3>
              <p className="text-[#8B7E7E] dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 