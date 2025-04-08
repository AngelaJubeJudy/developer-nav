import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaXTwitter, FaLinkedin, FaYoutube, FaFacebook } from 'react-icons/fa6';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { addUtmSource } from '../../utils/url';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.social')}</h3>
            <div className="flex space-x-4">
              <a href={addUtmSource('https://twitter.com')} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaXTwitter size={24} />
              </a>
              <a href={addUtmSource('https://linkedin.com')} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaLinkedin size={24} />
              </a>
              <a href={addUtmSource('https://youtube.com')} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaYoutube size={24} />
              </a>
              <a href={addUtmSource('https://facebook.com')} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaFacebook size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-gray-300 flex items-center">
                  <FaArrowRight className="mr-2" size={12} />
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300 flex items-center">
                  <FaArrowRight className="mr-2" size={12} />
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-gray-300 flex items-center">
                  <FaArrowRight className="mr-2" size={12} />
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-gray-300 flex items-center">
                  <FaArrowRight className="mr-2" size={12} />
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li>
                <a href={`mailto:${t('footer.email')}`} className="hover:text-gray-300">
                  {t('footer.email')}
                </a>
              </li>
              <li>
                <a href={`tel:${t('footer.phone')}`} className="hover:text-gray-300">
                  {t('footer.phone')}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.newsletter')}</h3>
            <p className="mb-4">{t('footer.newsletterDesc')}</p>
            <form className="flex">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="px-4 py-2 rounded-l-lg w-full text-gray-900"
              />
              <button
                type="submit"
                className="bg-[#B4A7A7] text-white px-4 py-2 rounded-r-lg hover:bg-[#6B4F4F] transition-colors"
              >
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 