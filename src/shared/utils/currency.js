/**
 * Format a numeric value to Indonesian Rupiah (Rp) currency format.
 * @param {number|string} amount - The amount to format
 * @param {boolean} withPrefix - Whether to include 'Rp ' prefix (default: true)
 * @param {number} minimumFractionDigits - Decimal places (default: 0)
 * @returns {string} Formatted currency string
 */
export function formatRupiah(amount, withPrefix = true, minimumFractionDigits = 0) {
  const numericValue = Number(amount) || 0;
  const formatted = numericValue.toLocaleString('id-ID', {
    minimumFractionDigits,
    maximumFractionDigits: minimumFractionDigits,
  });

  return withPrefix ? `Rp ${formatted}` : formatted;
}

/**
 * Format a number using standard Intl.NumberFormat
 * @param {number} amount - Amount to format
 * @param {string} locale - Locale string (default: 'id-ID')
 * @param {string} currency - Currency code (default: 'IDR')
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, locale = 'id-ID', currency = 'IDR') {
  const numericValue = Number(amount) || 0;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(numericValue);
}

/**
 * Parse a formatted currency string into a number
 * @param {string} currencyStr - String representation of currency
 * @returns {number} Parsed numeric value
 */
export function parseCurrency(currencyStr) {
  if (typeof currencyStr === 'number') return currencyStr;
  if (!currencyStr) return 0;
  const cleaned = currencyStr.replace(/[^0-9,-]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}
