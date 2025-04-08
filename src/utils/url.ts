export const addUtmSource = (url: string): string => {
  try {
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
    const urlObj = new URL(urlWithProtocol);
    
    // 如果URL已经有查询参数，添加&，否则添加?
    const separator = urlObj.search ? '&' : '?';
    return `${urlWithProtocol}${separator}utm_source=onmyguide`;
  } catch (error) {
    console.error('Error processing URL:', error);
    return url;
  }
}; 