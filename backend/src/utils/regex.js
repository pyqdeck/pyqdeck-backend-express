/**
 * Escapes special characters in a string for use in a regular expression.
 * Prevents Regex Injection attacks.
 *
 * @param {string} string - The string to escape
 * @returns {string} - The escaped string
 */
export const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};
