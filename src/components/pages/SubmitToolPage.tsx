import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SubmitToolPage: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-12">
        Get Guaranteed Traffic From 4M+ Monthly Fancy Tool Users
      </h1>
      
      <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
        <button
          onClick={() => scrollToSection('submit-tool')}
          className="px-8 py-4 bg-[#6B4F4F] hover:bg-[#8B7E7E] text-white rounded-lg font-semibold transition-colors"
        >
          Submit Your Tool
        </button>
        
        <button
          onClick={() => scrollToSection('pricing')}
          className="px-8 py-4 bg-[#D5C6C6] hover:bg-[#B4A7A7] text-[#6B4F4F] rounded-lg font-semibold transition-colors"
        >
          Pricing
        </button>
      </div>
      
      <div id="submit-tool" className="mb-16">
        <h2 className="text-2xl font-bold text-[#6B4F4F] dark:text-gray-200 mb-6">
          Submit Your Tool
        </h2>
        <p className="text-[#8B7E7E] dark:text-gray-400 mb-6">
          Submit your tool to our directory and get exposure to thousands of potential users.
        </p>
        {/* 这里可以添加表单组件 */}
      </div>
      
      <div id="pricing" className="mb-16">
        <h2 className="text-2xl font-bold text-[#6B4F4F] dark:text-gray-200 mb-6">
          Pricing
        </h2>
        <p className="text-[#8B7E7E] dark:text-gray-400 mb-6">
          Choose the best plan for your tool promotion needs.
        </p>
        {/* 这里可以添加价格表组件 */}
      </div>
    </div>
  );
}; 