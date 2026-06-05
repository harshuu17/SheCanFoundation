import { useState, useEffect } from 'react';

/**
 * Debounces a value by a specified delay.
 * Useful for search inputs to avoid firing API calls on every keystroke.
 */
const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

export default useDebounce;
