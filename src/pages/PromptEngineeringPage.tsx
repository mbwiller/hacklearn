import { useNavigate } from 'react-router-dom';
import { Code } from 'lucide-react';
import { promptEngineeringConcepts } from '../data/promptEngineeringConcepts';
import { useProgress } from '../hooks/useProgress';
import { ConceptCard } from '../components/concepts/ConceptCard';
import { Container } from '../components/ui/Container';

export const PromptEngineeringPage = () => {
  const { progress } = useProgress();
  const navigate = useNavigate();

  const handleConceptClick = (conceptId: number) => {
    navigate(`/app/prompt-concepts/${conceptId}`);
  };

  return (
    <div className="p-8">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code className="w-12 h-12 text-emerald-500" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Prompt Engineering for LLMs
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Master the art of crafting effective prompts for large language models
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-purple-500/20 border border-purple-500 rounded-full text-purple-600 dark:text-purple-400 font-semibold">
            Coming Soon - Content in Development
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promptEngineeringConcepts.map(concept => (
            <ConceptCard
              key={concept.id}
              concept={concept}
              isCompleted={!!progress[concept.id]}
              onClick={() => handleConceptClick(concept.id)}
            />
          ))}
        </div>

        {/* Info Note */}
        <div className="mt-12 p-6 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            About This Section
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            The Prompt Engineering modules are currently under development. These 10 advanced modules will cover
            everything from fundamentals to enterprise-grade prompt engineering, including agentic workflows,
            safety considerations, and production deployment strategies. Check back soon for comprehensive content,
            hands-on labs, and real-world examples.
          </p>
        </div>
      </Container>
    </div>
  );
};
