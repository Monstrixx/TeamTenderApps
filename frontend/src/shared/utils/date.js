/**
 * Format a date value into human-readable localized string
 * @param {Date|string|number} dateInput - Date object or ISO date string
 * @param {string} locale - Locale string (default: 'id-ID')
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export function formatDate(dateInput, locale = 'id-ID', options = {}) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const defaultOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat(locale, defaultOptions).format(date);
}

/**
 * Format a timestamp into short date time format
 * @param {Date|string|number} timestamp - Timestamp input
 * @returns {string} Formatted date & time
 */
export function formatTimestamp(timestamp) {
  return formatDate(timestamp, 'id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
