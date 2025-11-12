import { ChevronLeft, ChevronRight, Play, Upload, Settings, Timer, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface NavbarProps {
  onRun: () => void;
  onSubmit: () => void;
  isRunning: boolean;
}

export const Navbar = ({ onRun, onSubmit, isRunning }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-12 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-3 z-50"
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-colors"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Module</span>
        </button>

        <div className="flex items-center gap-1 ml-2">
          <button
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            aria-label="Previous problem"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            aria-label="Next problem"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Section - Run & Submit Buttons */}
      <div className="flex items-center gap-2">
        <Button
          onClick={onRun}
          disabled={isRunning}
          variant="primary"
          size="sm"
          icon={<Play className="w-4 h-4" />}
          className="shadow-lg shadow-emerald-500/20"
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </Button>

        <button
          onClick={onSubmit}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-lg font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
        >
          <Upload className="w-4 h-4" />
          <span>Submit</span>
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <button
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded text-slate-300 text-sm">
          <Timer className="w-4 h-4" />
          <span>00:00</span>
        </div>

        <button
          className="p-1.5 bg-slate-800 rounded-full hover:bg-opacity-80 transition-colors"
          aria-label="User profile"
        >
          <User className="w-5 h-5 text-slate-300" />
        </button>
      </div>
    </motion.nav>
  );
};
