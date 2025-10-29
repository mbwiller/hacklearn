#!/bin/bash

echo "=== Batch 3: Harmonizing Modules #12 and #13 ==="

# Module #12: SQL Injection
echo "Harmonizing Module #12: SQL Injection..."
sed -i 's/from-red-500 to-orange-600/from-emerald-400 to-emerald-600/g' "src/components/concepts/SQLInjectionConcept.tsx"
echo "Module #12 harmonized!"

# Module #13: XSS
echo "Harmonizing Module #13: XSS..."
# Fix root background
sed -i 's/bg-white dark:bg-gray-950/bg-white dark:bg-slate-950/g' "src/components/concepts/XSSConcept.tsx"
# Fix main card
sed -i 's/bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/g' "src/components/concepts/XSSConcept.tsx"
# Fix icon gradient
sed -i 's/from-orange-500 to-red-600/from-emerald-400 to-emerald-600/g' "src/components/concepts/XSSConcept.tsx"
# Fix back button
sed -i 's/bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700/bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700/g' "src/components/concepts/XSSConcept.tsx"
echo "Module #13 harmonized!"

echo "=== Batch 3 Complete! ===" 

