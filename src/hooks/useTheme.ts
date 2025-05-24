import { useState, useEffect } from 'react';
import { getPreferredTheme } from '../utils/helpers';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getPreferredTheme());

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};