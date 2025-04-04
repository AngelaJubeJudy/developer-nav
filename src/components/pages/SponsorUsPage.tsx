import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SponsorCard {
  title: string;
  description: string;
  clicks: string;
}

const sponsorCards: SponsorCard[] = [
  {
    title: "Custom Campaigns",
    description: "Create a custom marketing campaign tailored to your needs",
    clicks: "~100,000 clicks/month"
  },
  {
    title: "Main Sponsor - Newsletter",
    description: "Get featured in our weekly newsletter to 50,000+ subscribers",
    clicks: "~50,000 clicks/month"
  },
  {
    title: "#1 Spot in Featured Tools",
    description: "Get the top spot in our featured tools section",
    clicks: "~200,000 clicks/month"
  },
  {
    title: "Ad in Coming in Hot",
    description: "Promote your tool in our weekly 'Coming in Hot' section",
    clicks: "~75,000 clicks/month"
  },
  {
    title: "Classified Ad",
    description: "Place a classified ad in our directory",
    clicks: "~25,000 clicks/month"
  },
  {
    title: "Deep Sponsorship",
    description: "Comprehensive sponsorship package with maximum exposure",
    clicks: "~500,000 clicks/month"
  }
];

export const SponsorUsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBookNow = (title: string) => {
    // 跳转到邮件发送页面，并设置邮件主题
    const encodedTitle = title.replace(/ /g, '+');
    navigate(`/sponsor-us/${encodedTitle}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-12">
        Sponsorship Options
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
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 