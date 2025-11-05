import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../../contexts/ThemeContext';

interface ThemeToggleProps {
  variant?: 'fixed' | 'inline';
}

export const ThemeToggle = ({ variant = 'fixed' }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useThemeContext();

  const baseClasses = "p-3 rounded-lg bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-200";
  const variantClasses = variant === 'fixed'
    ? "fixed top-6 right-6 z-50 shadow-lg hover:shadow-emerald-500/20"
    : "";

  return (
    <button
      onClick={toggleTheme}
      className={`${baseClasses} ${variantClasses}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-gray-900 dark:text-gray-100" />
      ) : (
        <Moon className="w-5 h-5 text-gray-900 dark:text-gray-100" />
      )}
    </button>
  );
};
