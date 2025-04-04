import React from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Pricing: React.FC = () => {
  const { t } = useTranslation();

  const plans = [
    {
      nameKey: 'pricing.free.name',
      descriptionKey: 'pricing.free.description',
      price: '0',
      featuresKey: 'pricing.free.features'
    },
    {
      nameKey: 'pricing.pro.name',
      descriptionKey: 'pricing.pro.description',
      price: '9.99',
      featuresKey: 'pricing.pro.features',
      popular: true
    },
    {
      nameKey: 'pricing.enterprise.name',
      descriptionKey: 'pricing.enterprise.description',
      price: '29.99',
      featuresKey: 'pricing.enterprise.features'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-12">
          {t('pricing.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg ${
                plan.popular
                  ? 'bg-[#6B4F4F] text-white'
                  : 'bg-gray-50 dark:bg-gray-700'
              }`}
            >
              <h3 className={`text-2xl font-bold mb-2 ${
                plan.popular ? 'text-white' : 'text-[#6B4F4F] dark:text-gray-200'
              }`}>
                {t(plan.nameKey)}
              </h3>
              <p className={`mb-6 ${
                plan.popular ? 'text-gray-200' : 'text-[#8B7E7E] dark:text-gray-400'
              }`}>
                {t(plan.descriptionKey)}
              </p>
              <div className={`text-4xl font-bold mb-8 ${
                plan.popular ? 'text-white' : 'text-[#6B4F4F] dark:text-gray-200'
              }`}>
                ${plan.price}
                <span className={`text-base font-normal ${
                  plan.popular ? 'text-gray-200' : 'text-[#8B7E7E] dark:text-gray-400'
                }`}>
                  /mo
                </span>
              </div>
              <ul className="space-y-4">
                {(t(plan.featuresKey, { returnObjects: true }) as string[]).map((feature: string, featureIndex: number) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className={`w-5 h-5 mr-2 ${
                      plan.popular ? 'text-white' : 'text-[#6B4F4F] dark:text-gray-200'
                    }`} />
                    <span className={
                      plan.popular ? 'text-gray-200' : 'text-[#8B7E7E] dark:text-gray-400'
                    }>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold mt-8 transition-colors ${
                  plan.popular
                    ? 'bg-white text-[#6B4F4F] hover:bg-gray-100'
                    : 'bg-[#6B4F4F] text-white hover:bg-[#8B7E7E]'
                }`}
              >
                {t('pricing.selectPlan')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing; 