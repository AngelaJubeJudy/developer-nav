import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      questionKey: 'faq.submitTool.question',
      answerKey: 'faq.submitTool.answer'
    },
    {
      questionKey: 'faq.toolCategories.question',
      answerKey: 'faq.toolCategories.answer'
    },
    {
      questionKey: 'faq.suggestions.question',
      answerKey: 'faq.suggestions.answer'
    },
    {
      questionKey: 'faq.updates.question',
      answerKey: 'faq.updates.answer'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 mb-16">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-12">
          {t('faq.title')}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-[#6B4F4F] dark:text-gray-200">
                  {t(faq.questionKey)}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-[#6B4F4F] dark:text-gray-200" />
                ) : (
                  <ChevronDown className="text-[#6B4F4F] dark:text-gray-200" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                  <p className="text-[#8B7E7E] dark:text-gray-400">
                    {t(faq.answerKey)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 