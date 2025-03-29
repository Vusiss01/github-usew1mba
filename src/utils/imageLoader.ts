export const getOptimizedImageUrl = (url: string, width: number = 600) => {
  const baseUrl = url.split('?')[0];
  return `${baseUrl}?w=${width}&q=80&fm=webp&fit=crop&auto=format,compress`;
}; 