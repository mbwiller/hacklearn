import { useState, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface TimelineScrubberProps {
  currentTimestep: number;
  maxTimestep: number;
  isPlaying: boolean;
  onTimestepChange: (timestep: number) => void;
  onPlayPause: () => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
}

export const TimelineScrubber = ({
  currentTimestep,
  maxTimestep,
  isPlaying,
  onTimestepChange,
  onPlayPause,
  playbackSpeed,
  onSpeedChange,
}: TimelineScrubberProps) => {
  const [_isDragging, setIsDragging] = useState(false); // For future drag state styling

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onTimestepChange(Number(e.target.value));
  }, [onTimestepChange]);

  const skipBackward = useCallback(() => {
    onTimestepChange(Math.max(0, currentTimestep - 10));
  }, [currentTimestep, onTimestepChange]);

  const skipForward = useCallback(() => {
    onTimestepChange(Math.min(maxTimestep, currentTimestep + 10));
  }, [currentTimestep, maxTimestep, onTimestepChange]);

  const percentage = (currentTimestep / maxTimestep) * 100;

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
      {/* Playback controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={skipBackward}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Skip backward"
        >
          <SkipBack className="w-5 h-5 text-gray-400 hover:text-white" />
        </button>

        <button
          onClick={onPlayPause}
          className="p-3 bg-gradient-to-br from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 rounded-full transition-all shadow-lg shadow-cyan-500/30"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white" />
          )}
        </button>

        <button
          onClick={skipForward}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Skip forward"
        >
          <SkipForward className="w-5 h-5 text-gray-400 hover:text-white" />
        </button>
      </div>

      {/* Timeline slider */}
      <div className="relative">
        <input
          type="range"
          min={0}
          max={maxTimestep}
          value={currentTimestep}
          onChange={handleSliderChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, rgb(34 211 238) 0%, rgb(34 211 238) ${percentage}%, rgb(51 65 85) ${percentage}%, rgb(51 65 85) 100%)`,
          }}
        />

        {/* Timestep labels */}
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>t = 0</span>
          <span className="font-mono text-cyan-400">
            t = {currentTimestep} / {maxTimestep}
          </span>
          <span>t = {maxTimestep}</span>
        </div>
      </div>

      {/* Playback speed control */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Playback Speed</span>
        <div className="flex gap-2">
          {[0.5, 1.0, 2.0, 4.0].map((speed) => (
            <button
              key={speed}
              onClick={() => onSpeedChange(speed)}
              className={`px-3 py-1 rounded-lg transition-all ${
                playbackSpeed === speed
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
