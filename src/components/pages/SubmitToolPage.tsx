import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Card {
  title: string;
  description: string;
  icon: string;
  path: string;
}

const cards: Card[] = [
  {
    title: 'Submit Tool',
    description: 'Submit your AI tool to our directory and get exposure to thousands of potential users.',
    icon: '🚀',
    path: '/submit-tool'
  },
  {
    title: 'Custom Campaign',
    description: 'Create a custom marketing campaign to promote your tool or service.',
    icon: '🎯',
    path: '/custom-campaign'
  },
  {
    title: 'Sponsorship',
    description: 'Sponsor our platform and reach our growing community of AI enthusiasts.',
    icon: '💎',
    path: '/sponsor-us'
  }
];

export const SubmitToolPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-12">
        Promote Your Tool
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-4">{card.icon}</div>
            <h2 className="text-2xl font-bold text-[#6B4F4F] dark:text-gray-200 mb-2">
              {card.title}
            </h2>
            <p className="text-[#8B7E7E] dark:text-gray-400">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}; 