import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Card {
  title: string;
  description: string;
  icon: string;
  path: string;
}

const cards: Card[] = [
  {
    title: 'navigation.submitTool',
    description: 'faq.submitTool.answer',
    icon: '🚀',
    path: '/submit-tool'
  },
  {
    title: 'navigation.customCampaign',
    description: 'faq.customCampaign.answer',
    icon: '🎯',
    path: '/custom-campaign'
  },
  {
    title: 'navigation.sponsor',
    description: 'faq.sponsor.answer',
    icon: '💎',
    path: '/sponsor-us'
  }
];

export const SubmitToolPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-12">
        {t('navigation.submitTool')}
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
              {t(card.title)}
            </h2>
            <p className="text-[#8B7E7E] dark:text-gray-400">
              {t(card.description)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}; 