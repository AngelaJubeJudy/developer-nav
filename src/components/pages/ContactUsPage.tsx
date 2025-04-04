import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ContactFormData {
  email: string;
  firstName: string;
  lastName: string;
  reason: string;
  message: string;
}

const initialFormData: ContactFormData = {
  email: '',
  firstName: '',
  lastName: '',
  reason: 'Custom Campaign',
  message: '',
};

const reasonOptions = [
  'Custom Campaign',
  'Sales',
  'Feedback',
  'Support',
  'Partnership',
  'Others',
];

export const ContactUsPage: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isHuman, setIsHuman] = useState(false);

  useEffect(() => {
    // 从URL参数中获取赞助类型
    if (params.sponsorType) {
      const decodedSponsorType = decodeURIComponent(params.sponsorType.replace(/\+/g, ' '));
      setFormData(prev => ({
        ...prev,
        reason: 'Sponsorship',
        message: `I am interested in the ${decodedSponsorType} sponsorship package.`
      }));
    }
    // 从location state中获取预填充数据
    else if (location.state) {
      const { subject, reason } = location.state as { subject?: string; reason?: string };
      if (subject) {
        setFormData(prev => ({
          ...prev,
          reason: reason || 'Custom Campaign',
          message: `Regarding: ${subject}\n\n`
        }));
      }
    }
  }, [location.state, params.sponsorType]);

  // 模拟Cloudflare检测
  useEffect(() => {
    const checkIfHuman = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsHuman(true);
    };
    
    checkIfHuman();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHuman) {
      setSubmitError(t('contact.form.error'));
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 这里应该调用实际的API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData(initialFormData);
    } catch {
      setSubmitError(t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-12">
        {t('contact.title')}
      </h1>

      {submitSuccess ? (
        <div className="text-center text-green-600 dark:text-green-400">
          <h2 className="text-2xl font-bold mb-4">{t('contact.form.success')}</h2>
          <p>{t('common.thankYou')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[#6B4F4F] dark:text-gray-200 mb-2">
                {t('contact.form.firstName')} *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-[#D5C6C6] focus:ring-2 focus:ring-[#6B4F4F] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-[#6B4F4F] dark:text-gray-200 mb-2">
                {t('contact.form.lastName')} *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-[#D5C6C6] focus:ring-2 focus:ring-[#6B4F4F] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#6B4F4F] dark:text-gray-200 mb-2">
              {t('contact.form.email')} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-[#D5C6C6] focus:ring-2 focus:ring-[#6B4F4F] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-[#6B4F4F] dark:text-gray-200 mb-2">
              {t('contact.form.reason')} *
            </label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-[#D5C6C6] focus:ring-2 focus:ring-[#6B4F4F] focus:border-transparent"
            >
              {reasonOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#6B4F4F] dark:text-gray-200 mb-2">
              {t('contact.form.message')} *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-[#D5C6C6] focus:ring-2 focus:ring-[#6B4F4F] focus:border-transparent"
            />
          </div>

          {!isHuman && (
            <div className="text-center text-[#8B7E7E] dark:text-gray-400">
              {t('common.verifying')}
            </div>
          )}

          {submitError && (
            <div className="text-red-600 dark:text-red-400 text-center">
              {submitError}
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting || !isHuman}
              className={`px-8 py-4 bg-[#6B4F4F] text-white rounded-lg font-semibold transition-colors ${
                (isSubmitting || !isHuman) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#8B7E7E]'
              }`}
            >
              {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}; 