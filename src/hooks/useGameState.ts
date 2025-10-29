import { useState } from 'react';

// Hook kept for potential future use (currently unused after challenge system removal)
export const useGameState = () => {
  const [currentConcept, setCurrentConcept] = useState<number | null>(null);
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeAnswer, setChallengeAnswer] = useState('');
  const [challengeResult, setChallengeResult] = useState<{ success: boolean; message: string } | null>(null);

  const resetChallenge = () => {
    setChallengeAnswer('');
    setChallengeResult(null);
    setShowChallenge(false);
  };

  const startChallenge = () => {
    setShowChallenge(true);
  };

  const goBackToDashboard = () => {
    setCurrentConcept(null);
    resetChallenge();
  };

  return {
    currentConcept,
    setCurrentConcept,
    showChallenge,
    setShowChallenge,
    challengeAnswer,
    setChallengeAnswer,
    challengeResult,
    setChallengeResult,
    resetChallenge,
    startChallenge,
    goBackToDashboard,
  };
};
