import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ToolSubmission {
  name: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  icon?: string;
}

const initialFormData: ToolSubmission = {
  name: '',
  url: '',
  description: '',
  category: '',
  tags: [],
  icon: '',
};

const categories = [
  'AI Tools',
  'Development',
  'Design',
  'Productivity',
  'Marketing',
  'Other',
];

const pricingPlans = [
  {
    name: 'Website Only',
    price: '$99',
    features: [
      'Basic listing on our website',
      'Standard support',
      'Monthly analytics',
    ],
  },
  {
    name: 'Pro',
    price: '$299',
    features: [
      'Featured listing on our website',
      'Priority support',
      'Advanced analytics',
      'Social media promotion',
    ],
    recommended: true,
  },
  {
    name: 'Business Custom Plan',
    price: 'Custom',
    features: [
      'Custom placement',
      'Dedicated support',
      'Custom analytics',
      'Full marketing package',
    ],
  },
];

export const SubmitToolFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ToolSubmission>(initialFormData);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPricing, setShowPricing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 这里应该调用实际的API
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟API调用
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch {
      setSubmitError('Failed to submit tool. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-12">
        Get Guaranteed Traffic From 4M+ Monthly Fancy Tool Users
      </h1>

      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => scrollToSection('submit-form')}
          className="px-8 py-4 bg-[#6B4F4F] text-white rounded-lg font-semibold hover:bg-[#8B7E7E] transition-colors"
        >
          Submit Your Tool
        </button>
        <button
          onClick={() => setShowPricing(true)}
          className="px-8 py-4 bg-white text-[#6B4F4F] border-2 border-[#6B4F4F] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Pricing
        </button>
      </div>

      {showPricing && (
        <div id="pricing" className="mb-12">
          <h2 className="text-3xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-8">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.name}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative ${
                  plan.recommended ? 'border-2 border-[#6B4F4F]' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#6B4F4F] text-white px-4 py-1 rounded-full text-sm">
                    Recommended
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#6B4F4F] dark:text-gray-200 mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-[#6B4F4F] dark:text-gray-200 mb-4">{plan.price}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-[#8B7E7E] dark:text-gray-400">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollToSection('submit-form')}
                  className="w-full py-2 bg-[#6B4F4F] hover:bg-[#8B7E7E] text-white rounded-lg font-semibold transition-colors"
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div id="submit-form" className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-8">
          Submit Your Tool
        </h2>
        
        {submitSuccess ? (
          <div className="text-center text-green-600 dark:text-green-400">
            <h2 className="text-2xl font-bold mb-4">Thank you for your submission!</h2>
            <p>Your tool will be reviewed and added to our directory soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-[#6B4F4F] dark:text-gray-200 mb-2">
                Tool URL *
              </label>
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-[#D5C6C6] focus:ring-2 focus:ring-[#6B4F4F] focus:border-transparent"
              />
              <p className="mt-2 text-sm text-gray-500">
                The URL above will be used to populate your tool page. Edit access is provided upon email verification. All submissions are manually reviewed by our staff. We accept: AI tools, GPTs and AI influencers (non-human).
              </p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#6B4F4F] dark:text-gray-200 mb-2">
                Tool Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-[#D5C6C6] focus:ring-2 focus:ring-[#6B4F4F] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-[#6B4F4F] dark:text-gray-200 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-[#D5C6C6] focus:ring-2 focus:ring-[#6B4F4F] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-[#6B4F4F] dark:text-gray-200 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-[#D5C6C6] focus:ring-2 focus:ring-[#6B4F4F] focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-[#6B4F4F] dark:text-gray-200 mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagInput}
                placeholder="Press Enter to add tags"
                className="w-full px-4 py-2 rounded-lg border border-[#D5C6C6] focus:ring-2 focus:ring-[#6B4F4F] focus:border-transparent"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#D5C6C6] text-[#6B4F4F] rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-[#6B4F4F] hover:text-[#8B7E7E]"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {submitError && (
              <div className="text-red-600 dark:text-red-400 text-center">
                {submitError}
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 bg-[#6B4F4F] text-white rounded-lg font-semibold transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#8B7E7E]'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Pay & Submit Tool'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}; 