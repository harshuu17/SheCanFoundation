/**
 * Shared utility functions for She Can Foundation
 */

// Format a date string to a readable format
export const formatDate = (dateStr, options = {}) => {
  const defaults = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-US', { ...defaults, ...options });
};

// Truncate text to a max length
export const truncate = (str, max = 80) => {
  if (!str) return '';
  return str.length > max ? str.slice(0, max).trim() + '…' : str;
};

// Validate email format
export const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

// Validate phone number (loose international format)
export const isValidPhone = (phone) =>
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);

// Capitalize first letter of each word
export const titleCase = (str) =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());

// Get initials from a full name
export const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
