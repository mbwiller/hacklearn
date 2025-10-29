#!/bin/bash

# Harmonization script for HackLearn Pro modules

# Module #1: Prompt Injection
echo "Harmonizing Module #1: Prompt Injection..."
sed -i 's/className="min-h-screen text-gray-900 dark:text-white p-8"/className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-white p-8"/g' "src/components/concepts/PromptInjectionConcept.tsx"
sed -i 's/className="mb-6 px-4 py-2 bg-white\/10 hover:bg-white\/20 rounded-lg transition-all flex items-center gap-2"/className="mb-6 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-all flex items-center gap-2"/g' "src/components/concepts/PromptInjectionConcept.tsx"
sed -i 's/className="bg-white\/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"/className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-lg"/g' "src/components/concepts/PromptInjectionConcept.tsx"
sed -i 's/from-purple-500 to-pink-600/from-emerald-400 to-emerald-600/g' "src/components/concepts/PromptInjectionConcept.tsx"
sed -i 's/<Brain className="w-12 h-12" \/>/<Brain className="w-12 h-12 text-white" \/>/g' "src/components/concepts/PromptInjectionConcept.tsx"
sed -i 's/text-emerald-500 mt-2/text-emerald-600 dark:text-emerald-400 mt-2/g' "src/components/concepts/PromptInjectionConcept.tsx"
sed -i 's/border-b border-white\/20 mb-8/border-b border-gray-200 dark:border-slate-700 mb-8/g' "src/components/concepts/PromptInjectionConcept.tsx"
sed -i "s/'bg-white\/20 text-white border-b-2 border-emerald-500'/'bg-emerald-50 dark:bg-emerald-950\/50 text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500'/g" "src/components/concepts/PromptInjectionConcept.tsx"
sed -i "s/'text-gray-500 dark:text-gray-400 hover:text-white hover:bg-white\/10'/'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800'/g" "src/components/concepts/PromptInjectionConcept.tsx"

echo "Module #1 harmonized!"

