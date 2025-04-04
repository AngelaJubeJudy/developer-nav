import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for individual developers',
    features: [
      'Access to all tools',
      'Basic search functionality',
      'Save up to 10 favorites',
      'Community support'
    ]
  },
  {
    name: 'Pro',
    price: '9.99',
    description: 'For professional developers',
    features: [
      'Everything in Free',
      'Advanced search filters',
      'Unlimited favorites',
      'Priority support',
      'Custom categories',
      'API access'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '29.99',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Custom branding',
      'Dedicated support',
      'Analytics dashboard',
      'SSO integration'
    ]
  }
];

const Pricing: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-center text-[#8B7E7E] dark:text-gray-400 mb-12">
          Choose the plan that best fits your needs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`p-6 rounded-lg ${
                plan.popular 
                  ? 'bg-[#6B4F4F] text-white' 
                  : 'bg-gray-50 dark:bg-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-semibold bg-white text-[#6B4F4F] rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-sm opacity-75">/month</span>
              </div>
              <p className={`mb-6 ${plan.popular ? 'text-white/80' : 'text-[#8B7E7E] dark:text-gray-400'}`}>
                {plan.description}
              </p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className={`w-5 h-5 mr-2 ${plan.popular ? 'text-white' : 'text-[#6B4F4F] dark:text-gray-200'}`} />
                    <span className={plan.popular ? 'text-white/90' : 'text-[#8B7E7E] dark:text-gray-400'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-white text-[#6B4F4F] hover:bg-gray-100'
                    : 'bg-[#6B4F4F] text-white hover:bg-[#5A3F3F]'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing; 