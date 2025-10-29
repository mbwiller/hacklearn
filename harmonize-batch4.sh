#!/bin/bash

echo "=== Batch 4: Harmonizing Modules #4-10 ==="

# Module #5: Jailbreaking (has orange-red gradient)
echo "Fixing Module #5: Jailbreaking..."
sed -i 's/from-orange-500 to-red-600/from-emerald-400 to-emerald-600/g' "src/components/concepts/JailbreakingConcept.tsx"

# Fix any remaining non-emerald gradients in modules 4-10
for file in ModelExtractionConcept.tsx RAGSecurityConcept.tsx MultiAgentSecurityConcept.tsx LinkTrapsSecurityConcept.tsx InvisibleUnicodeInjectionConcept.tsx AIAgentCommandInjectionConcept.tsx; do
  if [ -f "src/components/concepts/$file" ]; then
    echo "Checking $file..."
    # Fix purple-pink gradients
    sed -i 's/from-purple-500 to-pink-600/from-emerald-400 to-emerald-600/g' "src/components/concepts/$file"
    # Fix red-orange gradients  
    sed -i 's/from-red-500 to-orange-600/from-emerald-400 to-emerald-600/g' "src/components/concepts/$file"
    # Fix orange-red gradients
    sed -i 's/from-orange-500 to-red-600/from-emerald-400 to-emerald-600/g' "src/components/concepts/$file"
    # Ensure icons have text-white
    sed -i 's/className="w-12 h-12" \/>/className="w-12 h-12 text-white" \/>/g' "src/components/concepts/$file"
  fi
done

echo "=== Batch 4 Complete! ==="
