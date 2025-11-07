import React, { useState } from 'react';

interface ActivityData {
  [date: string]: number; // Date in 'YYYY-MM-DD' format mapped to activity count
}

interface ActivityHeatmapProps {
  activityData: ActivityData;
  maxWeeks?: number; // Default 52, can reduce for mobile
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({
  activityData,
  maxWeeks = 52
}) => {
  const [hoveredCell, setHoveredCell] = useState<{ date: string; count: number } | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Generate array of weeks (7 days each)
  const generateWeeks = () => {
    const weeks: Date[][] = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (maxWeeks * 7));

    for (let week = 0; week < maxWeeks; week++) {
      const weekDays: Date[] = [];
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + (week * 7) + day);
        weekDays.push(currentDate);
      }
      weeks.push(weekDays);
    }

    return weeks;
  };

  // Get color intensity based on activity level
  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-gray-200 dark:bg-slate-800';
    if (count === 1) return 'bg-cyan-200 dark:bg-cyan-900/40';
    if (count === 2) return 'bg-cyan-400 dark:bg-cyan-700/60';
    if (count >= 3) return 'bg-cyan-600 dark:bg-cyan-500';
    return 'bg-gray-200 dark:bg-slate-800';
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get date string in YYYY-MM-DD format
  const getDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const weeks = generateWeeks();

  const handleMouseEnter = (date: Date, event: React.MouseEvent) => {
    const dateString = getDateString(date);
    const count = activityData[dateString] || 0;
    setHoveredCell({ date: formatDate(date), count });
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  return (
    <div className="relative">
      {/* Month labels */}
      <div className="flex gap-[3px] mb-2 text-xs text-gray-600 dark:text-gray-400">
        {Array.from({ length: 12 }, (_, i) => {
          const monthDate = new Date();
          monthDate.setMonth(monthDate.getMonth() - (11 - i));
          return (
            <div
              key={i}
              className="flex-1 text-center"
              style={{ minWidth: `${100 / 12}%` }}
            >
              {monthDate.toLocaleDateString('en-US', { month: 'short' })}
            </div>
          );
        })}
      </div>

      {/* Heatmap grid */}
      <div className="flex gap-[3px] overflow-x-auto pb-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.map((date, dayIndex) => {
              const dateString = getDateString(date);
              const count = activityData[dateString] || 0;
              const isFuture = date > new Date();

              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`
                    w-3 h-3 rounded-sm transition-all duration-200
                    ${isFuture ? 'bg-gray-100 dark:bg-slate-900/50 cursor-not-allowed' : getColorClass(count)}
                    ${!isFuture && 'hover:ring-2 hover:ring-cyan-400 hover:scale-110 cursor-pointer'}
                  `}
                  onMouseEnter={(e) => !isFuture && handleMouseEnter(date, e)}
                  onMouseLeave={handleMouseLeave}
                  title={isFuture ? 'Future date' : `${formatDate(date)}: ${count} activities`}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Day labels */}
      <div className="flex gap-[3px] mt-2">
        <div className="flex flex-col gap-[3px] text-xs text-gray-600 dark:text-gray-400">
          <div className="h-3 flex items-center">Mon</div>
          <div className="h-3"></div>
          <div className="h-3 flex items-center">Wed</div>
          <div className="h-3"></div>
          <div className="h-3 flex items-center">Fri</div>
          <div className="h-3"></div>
          <div className="h-3 flex items-center">Sun</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 text-xs text-gray-600 dark:text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-slate-800" />
          <div className="w-3 h-3 rounded-sm bg-cyan-200 dark:bg-cyan-900/40" />
          <div className="w-3 h-3 rounded-sm bg-cyan-400 dark:bg-cyan-700/60" />
          <div className="w-3 h-3 rounded-sm bg-cyan-600 dark:bg-cyan-500" />
        </div>
        <span>More</span>
      </div>

      {/* Tooltip */}
      {hoveredCell && (
        <div
          className="fixed z-50 px-3 py-2 text-sm bg-gray-900 dark:bg-slate-800 text-white rounded-lg shadow-lg pointer-events-none"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y + 10,
          }}
        >
          <div className="font-semibold">{hoveredCell.date}</div>
          <div className="text-gray-300">
            {hoveredCell.count} {hoveredCell.count === 1 ? 'activity' : 'activities'}
          </div>
        </div>
      )}
    </div>
  );
};
