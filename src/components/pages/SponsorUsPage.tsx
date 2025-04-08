import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SponsorCard {
  title: string;
  description: string;
  clicks: string;
}

export const SponsorUsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const sponsorCards: SponsorCard[] = [
    {
      title: t('sponsorUs.cards.customCampaigns.title'),
      description: t('sponsorUs.cards.customCampaigns.description'),
      clicks: t('sponsorUs.cards.customCampaigns.clicks')
    },
    {
      title: t('sponsorUs.cards.mainSponsor.title'),
      description: t('sponsorUs.cards.mainSponsor.description'),
      clicks: t('sponsorUs.cards.mainSponsor.clicks')
    },
    {
      title: t('sponsorUs.cards.featuredTools.title'),
      description: t('sponsorUs.cards.featuredTools.description'),
      clicks: t('sponsorUs.cards.featuredTools.clicks')
    },
    {
      title: t('sponsorUs.cards.comingInHot.title'),
      description: t('sponsorUs.cards.comingInHot.description'),
      clicks: t('sponsorUs.cards.comingInHot.clicks')
    },
    {
      title: t('sponsorUs.cards.classifiedAd.title'),
      description: t('sponsorUs.cards.classifiedAd.description'),
      clicks: t('sponsorUs.cards.classifiedAd.clicks')
    },
    {
      title: t('sponsorUs.cards.deepSponsorship.title'),
      description: t('sponsorUs.cards.deepSponsorship.description'),
      clicks: t('sponsorUs.cards.deepSponsorship.clicks')
    }
  ];

  const handleBookNow = (title: string) => {
    // 跳转到邮件发送页面，并设置邮件主题
    const encodedTitle = title.replace(/ /g, '+');
    navigate(`/sponsor-us/${encodedTitle}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-12">
        {t('sponsorUs.title')}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsorCards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col"
          >
            <h3 className="text-xl font-bold text-[#6B4F4F] dark:text-gray-200 mb-3">
              {card.title}
            </h3>
            <p className="text-[#8B7E7E] dark:text-gray-400 mb-4 text-center flex-grow">
              {card.description}
            </p>
            <div className="flex justify-between items-center mt-auto">
              <p className="text-sm text-[#8B7E7E] dark:text-gray-400">
                {card.clicks}
              </p>
              <button
                onClick={() => handleBookNow(card.title)}
                className="px-4 py-2 bg-[#6B4F4F] hover:bg-[#8B7E7E] text-white rounded-lg font-semibold transition-colors"
              >
                {t('sponsorUs.bookNow')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 