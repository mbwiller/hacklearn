import { useState } from 'react';
import { useProgress } from './hooks/useProgress';
import { concepts } from './data/concepts';
import { Dashboard } from './components/Dashboard';
import { ConceptDetail } from './components/concepts/ConceptDetail';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ui/ThemeToggle';

function App() {
  const { progress } = useProgress();
  const [currentConcept, setCurrentConcept] = useState<number | null>(null);

  const goBackToDashboard = () => setCurrentConcept(null);

  // Render Concept Detail View
  if (currentConcept) {
    const concept = concepts.find(c => c.id === currentConcept);
    if (!concept) return null;

    // If concept has a detailed component, render that instead
    if (concept.detailedComponent) {
      return (
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
            <ThemeToggle />
            {concept.detailedComponent({ onBack: goBackToDashboard })}
          </div>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
          <ThemeToggle />
          <ConceptDetail
            concept={concept}
            isCompleted={!!progress[concept.id]}
            onBack={goBackToDashboard}
          />
        </div>
      </ThemeProvider>
    );
  }

  // Render Dashboard
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
        <ThemeToggle />
        <Dashboard
          concepts={concepts}
          progress={progress}
          onConceptClick={setCurrentConcept}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
