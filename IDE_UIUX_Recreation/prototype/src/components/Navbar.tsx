import { ChevronLeft, ChevronRight, Play, Upload, Settings, Timer, User } from 'lucide-react';

interface NavbarProps {
  onRun: () => void;
  onSubmit: () => void;
  isRunning: boolean;
}

export const Navbar = ({ onRun, onSubmit, isRunning }: NavbarProps) => {
  return (
    <nav className="h-12 bg-leetcode-dark-bg-2 border-b flex items-center justify-between px-3 z-50" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 px-3 py-1.5 text-leetcode-text-secondary hover:text-leetcode-text-primary text-sm font-medium transition-colors"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Problem List</span>
        </button>

        <div className="flex items-center gap-1 ml-2">
          <button
            className="p-2 text-leetcode-text-muted hover:text-leetcode-text-primary hover:bg-leetcode-dark-bg-3 rounded transition-colors"
            aria-label="Previous problem"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-leetcode-text-muted hover:text-leetcode-text-primary hover:bg-leetcode-dark-bg-3 rounded transition-colors"
            aria-label="Next problem"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Section - Run & Submit Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onRun}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-1.5 bg-leetcode-accent-green hover:bg-opacity-80 text-white rounded font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4" />
          <span>{isRunning ? 'Running...' : 'Run'}</span>
        </button>

        <button
          onClick={onSubmit}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-1.5 bg-leetcode-accent-emerald hover:bg-opacity-80 text-white rounded font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="w-4 h-4" />
          <span>Submit</span>
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <button
          className="p-2 text-leetcode-text-muted hover:text-leetcode-text-primary hover:bg-leetcode-dark-bg-3 rounded transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 px-3 py-1 bg-leetcode-dark-bg-3 rounded text-leetcode-text-secondary text-sm">
          <Timer className="w-4 h-4" />
          <span>00:00</span>
        </div>

        <button
          className="p-1.5 bg-leetcode-dark-bg-3 rounded-full hover:bg-opacity-80 transition-colors"
          aria-label="User profile"
        >
          <User className="w-5 h-5 text-leetcode-text-secondary" />
        </button>
      </div>
    </nav>
  );
};
