import React, { useState, useEffect } from 'react';
import { 
  Twitter, 
  Linkedin, 
  Youtube, 
  Facebook, 
  Link as LinkIcon, 
  QrCode, 
  X as CloseIcon 
} from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

// 简单的QR码组件
const SimpleQRCode: React.FC<{ value: string; size: number }> = ({ value, size }) => {
  // 在实际应用中，这里应该使用真实的QR码生成库
  // 这里使用一个简单的占位符
  return (
    <div 
      style={{ 
        width: size, 
        height: size, 
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ddd',
        borderRadius: '4px'
      }}
    >
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <div style={{ fontSize: '12px', marginBottom: '5px' }}>QR Code</div>
        <div style={{ fontSize: '10px', wordBreak: 'break-all' }}>
          {value.length > 30 ? value.substring(0, 30) + '...' : value}
        </div>
      </div>
    </div>
  );
};

export const ShareButtons: React.FC<ShareButtonsProps> = ({ 
  url, 
  title
}) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // 生成短链接
  const generateShortUrl = async () => {
    if (shortUrl) return;
    
    setIsLoading(true);
    try {
      // 在实际应用中，这里应该调用短链接生成API
      // 这里使用模拟数据
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShortUrl(`https://dev.tools/s/${Math.random().toString(36).substring(2, 8)}`);
    } catch (error) {
      console.error('Failed to generate short URL:', error);
      setShortUrl(url); // 失败时使用原始URL
    } finally {
      setIsLoading(false);
    }
  };

  // 复制链接到剪贴板
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // 分享到社交媒体
  const shareToSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(shortUrl || url);
    const encodedTitle = encodeURIComponent(title);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'youtube':
        // YouTube不直接支持分享链接，这里使用YouTube主页
        shareUrl = 'https://www.youtube.com/';
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // 当组件加载时生成短链接
  useEffect(() => {
    generateShortUrl();
  }, [url]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => shareToSocial('twitter')}
          className="p-2 rounded-full bg-[#1DA1F2] text-white hover:bg-opacity-80 transition-colors"
          aria-label="Share on X (Twitter)"
        >
          <Twitter size={20} />
        </button>
        <button
          onClick={() => shareToSocial('linkedin')}
          className="p-2 rounded-full bg-[#0077B5] text-white hover:bg-opacity-80 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={20} />
        </button>
        <button
          onClick={() => shareToSocial('youtube')}
          className="p-2 rounded-full bg-[#FF0000] text-white hover:bg-opacity-80 transition-colors"
          aria-label="Share on YouTube"
        >
          <Youtube size={20} />
        </button>
        <button
          onClick={() => shareToSocial('facebook')}
          className="p-2 rounded-full bg-[#4267B2] text-white hover:bg-opacity-80 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook size={20} />
        </button>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative">
          <input
            type="text"
            readOnly
            value={isLoading ? 'Generating...' : (shortUrl || url)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-[#6B4F4F] dark:text-gray-200 w-64"
          />
          <button
            onClick={() => copyToClipboard(shortUrl || url)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-[#6B4F4F] dark:text-gray-400 hover:text-[#8B7E7E] dark:hover:text-gray-300"
            aria-label="Copy link"
          >
            <LinkIcon size={16} />
          </button>
        </div>
        <button
          onClick={() => setShowQRCode(!showQRCode)}
          className="p-2 rounded-lg bg-[#D5C6C6] dark:bg-gray-700 text-[#6B4F4F] dark:text-gray-200 hover:bg-[#B4A7A7] dark:hover:bg-gray-600 transition-colors"
          aria-label="Show QR code"
        >
          <QrCode size={20} />
        </button>
      </div>
      
      {copied && (
        <div className="text-green-600 dark:text-green-400 text-sm mb-2">
          Link copied to clipboard!
        </div>
      )}
      
      {showQRCode && (
        <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <button
            onClick={() => setShowQRCode(false)}
            className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close QR code"
          >
            <CloseIcon size={16} />
          </button>
          <SimpleQRCode 
            value={shortUrl || url} 
            size={200} 
          />
        </div>
      )}
    </div>
  );
}; 