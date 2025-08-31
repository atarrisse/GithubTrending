import config from '@/app/config';

/**
 * Formats a date string according to the user's locale
 */
export function formatDate(dateString: string): string {
  if (!dateString || dateString === null || dateString === undefined) {
    return 'Invalid date';
  }
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  // Use user's locale for formatting
  return date.toLocaleDateString(getUserLocale(), {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function getUserLocale(): string {
  if (typeof window !== 'undefined' && window.navigator) {
    return window.navigator.language || config.defaultLocale;
  }
  return config.defaultLocale;
}
