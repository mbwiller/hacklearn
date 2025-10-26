interface DifficultyBadgeProps {
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  const getColor = () => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-600 bg-green-100';
      case 'Intermediate':
        return 'text-yellow-600 bg-yellow-100';
      case 'Advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getColor()}`}>
      {difficulty}
    </span>
  );
};
