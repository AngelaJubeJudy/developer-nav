import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SponsorCard {
  title: string;
  description: string;
  clicks: string;
}

const sponsorCards: SponsorCard[] = [
  {
    title: "Banner Ad",
    description: "Promote your tool with a banner ad on our homepage",
    clicks: "~50,000 clicks/month"
  },
  {
    title: "Category Spotlight",
    description: "Get featured in a specific category page",
    clicks: "~20,000 clicks/month"
  },
  {
    title: "Email Newsletter",
    description: "Reach our subscribers directly via email",
    clicks: "~10,000 clicks/month"
  },
  {
    title: "Featured Tool",
    description: "Get your tool featured at the top of our homepage",
    clicks: "~100,000 clicks/month"
  },
  {
    title: "Social Media",
    description: "Promote your tool on our social media channels",
    clicks: "~30,000 clicks/month"
  },
  {
    title: "Tool Review",
    description: "Get a detailed review of your tool on our blog",
    clicks: "~15,000 clicks/month"
  },
  {
    title: "Video Showcase",
    description: "Showcase your tool with a video on our platform",
    clicks: "~25,000 clicks/month"
  }
];

export const SponsorUsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBookNow = (title: string) => {
    // 跳转到邮件发送页面，并设置邮件主题
    navigate('/contact', { state: { subject: `Sponsorship: ${title}` } });
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
            <p className="text-sm text-[#8B7E7E] dark:text-gray-400 mb-4 text-center">
              {card.clicks}
            </p>
            <button
              onClick={() => handleBookNow(card.title)}
              className="w-full py-2 bg-[#6B4F4F] hover:bg-[#8B7E7E] text-white rounded-lg font-semibold transition-colors"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}; 