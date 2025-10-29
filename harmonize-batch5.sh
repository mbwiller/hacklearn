#!/bin/bash

echo "=== Batch 5: Harmonizing Modules #14-19 ==="

for file in SocialEngineeringConcept.tsx NetworkScanningConcept.tsx PasswordCrackingConcept.tsx MitMAttacksConcept.tsx DoSAttacksConcept.tsx WebAppVulnerabilitiesConcept.tsx; do
  if [ -f "src/components/concepts/$file" ]; then
    echo "Harmonizing $file..."
    # Fix all possible gradient variations to emerald
    sed -i 's/from-purple-500 to-pink-600/from-emerald-400 to-emerald-600/g' "src/components/concepts/$file"
    sed -i 's/from-red-500 to-orange-600/from-emerald-400 to-emerald-600/g' "src/components/concepts/$file"
    sed -i 's/from-orange-500 to-red-600/from-emerald-400 to-emerald-600/g' "src/components/concepts/$file"
    sed -i 's/from-blue-500 to-cyan-600/from-emerald-400 to-emerald-600/g' "src/components/concepts/$file"
    sed -i 's/from-cyan-500 to-blue-600/from-emerald-400 to-emerald-600/g' "src/components/concepts/$file"
    # Ensure icons have text-white
    sed -i 's/className="w-12 h-12" \/>/className="w-12 h-12 text-white" \/>/g' "src/components/concepts/$file"
    # Fix gray vs slate inconsistencies
    sed -i 's/bg-white dark:bg-gray-950/bg-white dark:bg-slate-950/g' "src/components/concepts/$file"
    sed -i 's/bg-white dark:bg-gray-900/bg-white dark:bg-slate-900/g' "src/components/concepts/$file"
    sed -i 's/border-gray-200 dark:border-gray-800/border-slate-200 dark:border-slate-800/g' "src/components/concepts/$file"
  fi
done

echo "=== Batch 5 Complete! ==="
