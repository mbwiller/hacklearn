import { useProgress } from './hooks/useProgress';
import { useGameState } from './hooks/useGameState';
import { useAchievements } from './hooks/useAchievements';
import { concepts } from './data/concepts';
import { Dashboard } from './components/Dashboard';
import { ConceptDetail } from './components/concepts/ConceptDetail';
import { ChallengeView } from './components/concepts/ChallengeView';

function App() {
  const {
    progress,
    points,
    level,
    achievements,
    saveProgress,
    awardPoints,
    addAchievement,
    getProgressPercent,
  } = useProgress();

  const {
    currentConcept,
    setCurrentConcept,
    showChallenge,
    challengeAnswer,
    setChallengeAnswer,
    challengeResult,
    setChallengeResult,
    resetChallenge,
    startChallenge,
    goBackToDashboard,
  } = useGameState();

  // Check for achievements whenever progress or points change
  useAchievements(progress, points, addAchievement);

  const handleChallengeSubmit = () => {
    const concept = concepts.find(c => c.id === currentConcept);
    if (!concept) return;

    const isCorrect = challengeAnswer.toUpperCase() === concept.challenge.correct;

    if (isCorrect) {
      setChallengeResult({ success: true, message: 'Correct!' });
      if (!progress[concept.id]) {
        awardPoints(concept.points);
        saveProgress(concept.id, true);
      }
    } else {
      setChallengeResult({
        success: false,
        message: `Incorrect. ${concept.challenge.explanation}`,
      });
    }
  };

  // Render Challenge View
  if (showChallenge && currentConcept) {
    const concept = concepts.find(c => c.id === currentConcept);
    if (!concept) return null;

    return (
      <ChallengeView
        concept={concept}
        answer={challengeAnswer}
        result={challengeResult}
        onAnswerSelect={setChallengeAnswer}
        onSubmit={handleChallengeSubmit}
        onClose={resetChallenge}
      />
    );
  }

  // Render Concept Detail View
  if (currentConcept && !showChallenge) {
    const concept = concepts.find(c => c.id === currentConcept);
    if (!concept) return null;

    // If concept has a detailed component, render that instead
    if (concept.detailedComponent) {
      return <>{concept.detailedComponent({ onBack: goBackToDashboard, onStartChallenge: startChallenge })}</>;
    }

    return (
      <ConceptDetail
        concept={concept}
        isCompleted={!!progress[concept.id]}
        onBack={goBackToDashboard}
        onStartChallenge={startChallenge}
      />
    );
  }

  // Render Dashboard
  return (
    <Dashboard
      concepts={concepts}
      progress={progress}
      points={points}
      level={level}
      achievements={achievements}
      progressPercent={getProgressPercent(concepts.length)}
      onConceptClick={setCurrentConcept}
    />
  );
}

export default App;
