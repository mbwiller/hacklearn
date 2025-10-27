interface DifficultyBadgeProps {
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  const getColor = () => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-950/50 border border-green-200 dark:border-green-800';
      case 'Intermediate':
        return 'text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-800';
      case 'Advanced':
        return 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-950/50 border border-red-200 dark:border-red-800';
      default:
        return 'text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${getColor()}`}>
      {difficulty}
    </span>
  );
};
