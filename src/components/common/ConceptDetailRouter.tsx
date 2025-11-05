import { useParams, useNavigate } from 'react-router-dom';
import { concepts } from '../../data/concepts';
import { promptEngineeringConcepts } from '../../data/promptEngineeringConcepts';
import { ConceptDetail } from '../concepts/ConceptDetail';
import { useProgress } from '../../hooks/useProgress';

export const ConceptDetailRouter = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { progress } = useProgress();

  const conceptId = parseInt(id || '0', 10);

  // Find concept in either ethical hacking or prompt engineering arrays
  const allConcepts = [...concepts, ...promptEngineeringConcepts];
  const concept = allConcepts.find(c => c.id === conceptId);

  if (!concept) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Concept Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The requested module could not be found.
          </p>
          <button
            onClick={() => navigate('/app/dashboard')}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    // Navigate back to the appropriate dashboard based on category
    if (concept.category === 'Prompt Engineering') {
      navigate('/app/prompt-engineering');
    } else {
      navigate('/app/dashboard');
    }
  };

  // If concept has a detailed component, render that
  if (concept.detailedComponent) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
        {concept.detailedComponent({ onBack: handleBack })}
      </div>
    );
  }

  // Otherwise, render the default ConceptDetail component
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
      <ConceptDetail
        concept={concept}
        isCompleted={!!progress[concept.id]}
        onBack={handleBack}
      />
    </div>
  );
};
