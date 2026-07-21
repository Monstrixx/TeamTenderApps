/**
 * Format a number with custom locale formatting options
 * @param {number|string} value - Value to format
 * @param {string} locale - Locale identifier (default: 'id-ID')
 * @param {object} options - Intl.NumberFormat options
 * @returns {string} Formatted number
 */
export function formatNumber(value, locale = 'id-ID', options = {}) {
  const numericValue = Number(value) || 0;
  return numericValue.toLocaleString(locale, options);
}

/**
 * Safely round a number to specified decimal places
 * @param {number|string} value - Value to round
 * @param {number} decimals - Decimal places (default: 2)
 * @returns {number} Rounded number
 */
export function roundNumber(value, decimals = 2) {
  const numericValue = Number(value) || 0;
  const factor = Math.pow(10, decimals);
  return Math.round((numericValue + Number.EPSILON) * factor) / factor;
}
