import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold text-[#6B4F4F] dark:text-gray-200 mb-4">
              {t('footer.title')}
            </h3>
            <p className="text-[#8B7E7E] dark:text-gray-400 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6B4F4F] dark:text-gray-200 hover:text-[#5A3F3F] dark:hover:text-gray-300"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6B4F4F] dark:text-gray-200 hover:text-[#5A3F3F] dark:hover:text-gray-300"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6B4F4F] dark:text-gray-200 hover:text-[#5A3F3F] dark:hover:text-gray-300"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-[#6B4F4F] dark:text-gray-200 mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/about" 
                  className="text-[#8B7E7E] dark:text-gray-400 hover:text-[#6B4F4F] dark:hover:text-gray-200"
                >
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-[#8B7E7E] dark:text-gray-400 hover:text-[#6B4F4F] dark:hover:text-gray-200"
                >
                  {t('footer.contact')}
                </a>
              </li>
              <li>
                <a 
                  href="/privacy" 
                  className="text-[#8B7E7E] dark:text-gray-400 hover:text-[#6B4F4F] dark:hover:text-gray-200"
                >
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a 
                  href="/terms" 
                  className="text-[#8B7E7E] dark:text-gray-400 hover:text-[#6B4F4F] dark:hover:text-gray-200"
                >
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-[#6B4F4F] dark:text-gray-200 mb-4">
              {t('footer.contactUs')}
            </h4>
            <div className="flex items-center space-x-2 text-[#8B7E7E] dark:text-gray-400">
              <Mail size={20} />
              <a 
                href="mailto:angelajubejudy@126.com"
                className="hover:text-[#6B4F4F] dark:hover:text-gray-200"
              >
                angelajubejudy@126.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center">
          <p className="text-[#8B7E7E] dark:text-gray-400">
            © {new Date().getFullYear()} Developer Nav. All rights reserved.
          </p>
          <p className="text-sm text-[#8B7E7E] dark:text-gray-400 mt-2">
            Created with ❤️ by Angela in NYC
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 