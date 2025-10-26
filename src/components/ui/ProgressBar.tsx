interface ProgressBarProps {
  progress: number;
  label?: string;
}

export const ProgressBar = ({ progress, label = 'Overall Progress' }: ProgressBarProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold">{label}</span>
        <span className="text-cyan-400">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
