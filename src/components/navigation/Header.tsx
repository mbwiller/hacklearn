import { NavLink, useNavigate } from 'react-router-dom';
import { Shield, LayoutDashboard, Code, User, LogOut } from 'lucide-react';
import { Container } from '../ui/Container';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';

export const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
      isActive
        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-semibold'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800'
    }`;

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

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
          <div className="flex items-center gap-4">
            <NavLink to="/app/dashboard" className={navLinkClass}>
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden md:inline">Dashboard</span>
            </NavLink>
            <NavLink to="/app/prompt-engineering" className={navLinkClass}>
              <Code className="w-4 h-4" />
              <span className="hidden md:inline">Prompt Engineering</span>
            </NavLink>
            <NavLink to="/app/account" className={navLinkClass}>
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Account</span>
            </NavLink>
          </div>

          {/* Right side - User info & actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle variant="inline" />
            
            {user && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};