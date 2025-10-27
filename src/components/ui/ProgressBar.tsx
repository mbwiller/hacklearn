interface ProgressBarProps {
  progress: number;
  label?: string;
}

export const ProgressBar = ({ progress, label = 'Overall Progress' }: ProgressBarProps) => {
  return (
    <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#1F1F1F] rounded-xl p-6 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-gray-900 dark:text-white">{label}</span>
        <span className="text-emerald-500">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-[#1F1F1F] rounded-full h-4 overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
