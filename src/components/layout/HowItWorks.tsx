import React from 'react';
import { Search, Bookmark, Share2, Star } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: 'Search',
    description: 'Use our powerful search to find the tools you need'
  },
  {
    icon: <Bookmark className="w-8 h-8" />,
    title: 'Save',
    description: 'Bookmark your favorite tools for quick access'
  },
  {
    icon: <Share2 className="w-8 h-8" />,
    title: 'Share',
    description: 'Share useful tools with your team and network'
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: 'Rate',
    description: 'Rate and review tools to help others'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 mb-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative"
            >
              <div className="p-6 text-center rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                <div className="flex justify-center mb-4 text-[#6B4F4F] dark:text-gray-200">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#6B4F4F] dark:text-gray-200">
                  {step.title}
                </h3>
                <p className="text-[#8B7E7E] dark:text-gray-400">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-0.5 bg-gray-300 dark:bg-gray-600" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 