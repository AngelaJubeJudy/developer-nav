import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isHuman, setIsHuman] = useState(false);
  
  const location = useLocation();
  const subject = location.state?.subject || 'Contact Form Submission';

  // 模拟Cloudflare检测
  useEffect(() => {
    // 在实际应用中，这里应该集成Cloudflare Turnstile或其他验证服务
    const checkIfHuman = async () => {
      // 模拟API调用延迟
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
      setSubmitError('Please complete the human verification');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // 在实际应用中，这里应该发送邮件或调用API
      await new Promise(resolve => setTimeout(resolve, 1500)); // 模拟API调用
      
      // 发送邮件到指定邮箱
      const mailtoLink = `mailto:angelajubejudy@126.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `From: ${formData.firstName} ${formData.lastName} (${formData.email})\n\nReason: ${formData.reason}\n\nMessage:\n${formData.message}`
      )}`;
      
      window.location.href = mailtoLink;
      
      setSubmitSuccess(true);
      setFormData(initialFormData);
    } catch {
      setSubmitError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-[#6B4F4F] dark:text-gray-200 mb-8">
        Contact Us
      </h1>
      
      {submitSuccess ? (
        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg mb-6">
          <p className="font-semibold">Message sent successfully!</p>
          <p>We will get back to you as soon as possible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitError && (
            <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
              {submitError}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[#6B4F4F] dark:text-gray-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6B4F4F] dark:focus:ring-gray-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-[#6B4F4F] dark:text-gray-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6B4F4F] dark:focus:ring-gray-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#6B4F4F] dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6B4F4F] dark:focus:ring-gray-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-[#6B4F4F] dark:text-gray-300 mb-1">
              Reason For Contact
            </label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6B4F4F] dark:focus:ring-gray-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            >
              {reasonOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#6B4F4F] dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#6B4F4F] dark:focus:ring-gray-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            ></textarea>
          </div>
          
          {/* 在实际应用中，这里应该集成Cloudflare Turnstile */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-[#8B7E7E] dark:text-gray-400 mb-2">
              Human Verification (模拟Cloudflare检测)
            </p>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="humanVerification"
                checked={isHuman}
                onChange={() => setIsHuman(!isHuman)}
                className="h-4 w-4 text-[#6B4F4F] focus:ring-[#6B4F4F] border-gray-300 rounded"
              />
              <label htmlFor="humanVerification" className="ml-2 block text-sm text-[#8B7E7E] dark:text-gray-400">
                I am a human
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !isHuman}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
              isSubmitting || !isHuman
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#6B4F4F] hover:bg-[#8B7E7E]'
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}; 