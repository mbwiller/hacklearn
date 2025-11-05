import { NavLink } from 'react-router-dom';
import { Shield, LayoutDashboard, Code, User } from 'lucide-react';
import { Container } from '../ui/Container';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Header = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
      isActive
        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-semibold'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-gray-200 dark:border-[#1F1F1F]">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <NavLink
            to="/app/dashboard"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="p-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
              HackLearn Pro
            </span>
          </NavLink>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <NavLink to="/app/dashboard" className={navLinkClass}>
              <LayoutDashboard className="w-5 h-5" />
              <span className="hidden md:block">Dashboard</span>
            </NavLink>

            <NavLink to="/app/prompt-engineering" className={navLinkClass}>
              <Code className="w-5 h-5" />
              <span className="hidden md:block">Prompt Engineering</span>
            </NavLink>

            <NavLink to="/app/account" className={navLinkClass}>
              <User className="w-5 h-5" />
              <span className="hidden md:block">Account</span>
            </NavLink>
          </div>

          {/* Theme Toggle (positioned separately from nav links) */}
          <div className="ml-4">
            <ThemeToggle variant="inline" />
          </div>
        </nav>
      </Container>
    </header>
  );
};
