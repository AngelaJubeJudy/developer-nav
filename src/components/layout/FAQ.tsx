import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How do I submit a new tool?',
    answer: 'You can submit a new tool by clicking the "Submit" button in the navigation menu. Fill out the required information about the tool, including its name, description, and URL. Our team will review your submission and add it to the platform if it meets our criteria.'
  },
  {
    question: 'How are tools categorized?',
    answer: 'Tools are categorized based on their primary function and target audience. We use a combination of automated classification and manual review to ensure accurate categorization. If you find a tool in the wrong category, please let us know.'
  },
  {
    question: 'Can I suggest improvements to the platform?',
    answer: 'Absolutely! We welcome feedback and suggestions from our users. You can submit your ideas through the contact form or by reaching out to us directly. We regularly review user feedback to improve the platform.'
  },
  {
    question: 'How often is the tool database updated?',
    answer: 'Our tool database is updated daily. New tools are added as they are submitted and approved, and existing entries are regularly reviewed for accuracy and relevance.'
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 mb-16">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-12">
          Frequently Asked Questions
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
                  {faq.question}
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
                    {faq.answer}
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