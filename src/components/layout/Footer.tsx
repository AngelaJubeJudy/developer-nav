import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaXTwitter, FaLinkedin, FaYoutube, FaFacebook } from 'react-icons/fa6';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaXTwitter size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaLinkedin size={24} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaYoutube size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaFacebook size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-gray-300">{t('footer.about')}</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300">{t('footer.contact')}</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-gray-300">{t('footer.privacy')}</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-gray-300">{t('footer.terms')}</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.contact')}</h3>
            <Link to="/contact" className="flex items-center hover:text-gray-300 group">
              <span>{t('footer.contactUs')}</span>
              <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={14} />
            </Link>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.newsletter')}</h3>
            <p className="mb-4">{t('footer.newsletterDesc')}</p>
            <form className="flex">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="px-4 py-2 rounded-l text-gray-800 w-full"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r"
              >
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Developer Nav. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 