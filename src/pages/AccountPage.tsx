import { User, Award, TrendingUp, CheckCircle } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { concepts } from '../data/concepts';
import { promptEngineeringConcepts } from '../data/promptEngineeringConcepts';
import { Card } from '../components/ui/Card';
import { Container } from '../components/ui/Container';

export const AccountPage = () => {
  const { progress, points, level } = useProgress();

  // Calculate progress statistics
  const allConcepts = [...concepts, ...promptEngineeringConcepts];
  const totalModules = allConcepts.length;
  const completedModules = Object.values(progress).filter(Boolean).length;
  const completionPercentage = Math.round((completedModules / totalModules) * 100);

  // Calculate by category
  const aiMLCompleted = concepts.filter(c => c.category === 'AI/ML Security' && progress[c.id]).length;
  const traditionalCompleted = concepts.filter(c => c.category === 'Traditional Hacking' && progress[c.id]).length;
  const promptEngineeringCompleted = promptEngineeringConcepts.filter(c => progress[c.id]).length;

  // Mock user data (for now)
  const userData = {
    email: 'user@hacklearn.com',
    joinDate: 'January 2025',
    initials: 'HU'
  };

  return (
    <div className="p-8">
      <Container size="md">
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your profile and track your learning progress
            </p>
          </div>

          {/* Profile Card */}
          <Card padding="lg">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <span className="text-3xl font-bold text-white">
                    {userData.initials}
                  </span>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  HackLearn User
                </h2>
                <div className="space-y-2 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Member since {userData.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Progress Statistics */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Progress Statistics
            </h2>

            {/* Overall Progress */}
            <Card className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Overall Progress
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {completedModules} of {totalModules} modules completed
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-emerald-500">
                    {completionPercentage}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-slate-800 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </Card>

            {/* By Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card variant="hover">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    AI/ML Security
                  </h3>
                </div>
                <div className="text-3xl font-bold text-emerald-500 mb-1">
                  {aiMLCompleted}/10
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  modules completed
                </p>
              </Card>

              <Card variant="hover">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Traditional Hacking
                  </h3>
                </div>
                <div className="text-3xl font-bold text-cyan-500 mb-1">
                  {traditionalCompleted}/10
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  modules completed
                </p>
              </Card>

              <Card variant="hover">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Prompt Engineering
                  </h3>
                </div>
                <div className="text-3xl font-bold text-purple-500 mb-1">
                  {promptEngineeringCompleted}/10
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  modules completed
                </p>
              </Card>
            </div>

            {/* Gamification Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card variant="hover">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-emerald-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Current Level
                  </h3>
                </div>
                <div className="text-4xl font-bold text-emerald-500">
                  {level}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Keep learning to level up
                </p>
              </Card>

              <Card variant="hover">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-6 h-6 text-amber-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total Points
                  </h3>
                </div>
                <div className="text-4xl font-bold text-amber-500">
                  {points}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Earned from completed modules
                </p>
              </Card>
            </div>
          </div>

          {/* Info Note */}
          <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900">
            <p className="text-sm text-emerald-900 dark:text-emerald-200">
              <strong>Note:</strong> Profile data is currently stored locally in your browser.
              Backend integration for user authentication and progress sync coming soon.
            </p>
          </Card>
        </div>
      </Container>
    </div>
  );
};
