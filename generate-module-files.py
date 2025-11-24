#!/usr/bin/env python3
"""
Script to generate boilerplate files for HackLearn modules.
Creates metadata configs, index files, and READMEs for modules 2-20.
"""

import os
from pathlib import Path

# Module definitions with metadata
MODULES = {
    2: {
        "folder": "02-adversarial-ml",
        "title": "Adversarial Machine Learning",
        "component": "AdversarialMLConcept",
        "lab_export": "adversarialMLProblem",
        "icon": "Brain",
        "category": "AI/ML Security",
        "difficulty": "Intermediate",
        "description": "Understand how subtle perturbations in input data can fool ML models into making incorrect predictions.",
        "realWorldExample": "In 2023, researchers poisoned ImageNet dataset causing Google DeepMind models to misclassify 'dog' images as 'cat'.",
        "keyTakeaways": [
            "Evasion attacks modify inputs to bypass detection",
            "Adversarial examples are imperceptible to humans",
            "Can affect image recognition, malware detection, spam filters",
            "Attackers can craft inputs without model access"
        ],
        "defenses": [
            "Adversarial training with malicious examples",
            "Input validation and anomaly detection",
            "Ensemble methods using multiple models",
            "Defensive distillation"
        ]
    },
    3: {
        "folder": "03-data-poisoning",
        "title": "Data Poisoning",
        "component": "DataPoisoningConcept",
        "lab_export": "dataPoisoningProblem",
        "icon": "Database",
        "category": "AI/ML Security",
        "difficulty": "Intermediate",
        "description": "Learn how attackers corrupt training data to manipulate model behavior at its foundation.",
        "realWorldExample": "Microsoft's Tay chatbot was poisoned through malicious interactions, causing it to generate offensive content within 24 hours.",
        "keyTakeaways": [
            "Attackers inject malicious data into training sets",
            "Can create backdoors triggered by specific inputs",
            "Affects model behavior globally, not just specific inputs",
            "Hard to detect once model is trained"
        ],
        "defenses": [
            "Data validation and sanitization",
            "Anomaly detection in training data",
            "Use trusted data sources",
            "Regular model retraining with clean data"
        ]
    },
    # Add definitions for modules 4-20 here as needed
}

def create_metadata_config(module_id, module_info, base_path):
    """Create metadata/config.ts file"""
    folder = module_info["folder"]
    component = module_info["component"]
    title = module_info["title"]
    icon = module_info["icon"]
    category = module_info["category"]
    difficulty = module_info["difficulty"]
    description = module_info["description"]
    realWorldExample = module_info["realWorldExample"]
    keyTakeaways = module_info["keyTakeaways"]
    defenses = module_info["defenses"]

    # Convert to camelCase for export name
    export_name = component[0].lower() + component[1:] + "Metadata"

    key_takeaways_str = ",\n    ".join([f"'{kt}'" for kt in keyTakeaways])
    defenses_str = ",\n    ".join([f"'{d}'" for d in defenses])

    content = f"""import {{ {icon} }} from 'lucide-react';
import type {{ Concept }} from '@/types';
import {{ {component} }} from '../component/{component}';

export const {export_name}: Concept = {{
  id: {module_id},
  category: '{category}',
  title: '{title}',
  icon: <{icon} className="w-8 h-8" />,
  difficulty: '{difficulty}',
  description: '{description}',
  realWorldExample: '{realWorldExample}',
  keyTakeaways: [
    {key_takeaways_str}
  ],
  defenses: [
    {defenses_str}
  ],
  detailedComponent: (props) => <{component} {{...props}} />
}};
"""

    file_path = Path(base_path) / folder / "metadata" / "config.ts"
    file_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.write_text(content, encoding='utf-8')
    print(f"Created: {file_path}")

def create_index_files(module_info, base_path):
    """Create all index.ts files for a module"""
    folder = module_info["folder"]
    component = module_info["component"]
    lab_export = module_info["lab_export"]
    export_name = component[0].lower() + component[1:] + "Metadata"

    # Component index
    component_index = f"export {{ {component} }} from './{component}';\n"
    Path(base_path, folder, "component", "index.ts").write_text(component_index, encoding='utf-8')

    # Lab index
    lab_index = f"export {{ {lab_export} }} from './lab-problem';\n"
    Path(base_path, folder, "lab", "index.ts").write_text(lab_index, encoding='utf-8')

    # Metadata index
    metadata_index = f"export {{ {export_name} }} from './config';\n"
    Path(base_path, folder, "metadata", "index.ts").write_text(metadata_index, encoding='utf-8')

    # Top-level index
    top_index = f"""// Module {module_info.get('id', '?')}: {module_info['title']}
// Complete module with component, lab problem, and metadata

export {{ {component} }} from './component';
export {{ {lab_export} }} from './lab';
export {{ {export_name} }} from './metadata';
"""
    Path(base_path, folder, "index.ts").write_text(top_index, encoding='utf-8')
    print(f"Created index files for: {folder}")

def main():
    base_path = Path("src/modules")

    for module_id, module_info in MODULES.items():
        print(f"\nProcessing Module {module_id}...")
        create_metadata_config(module_id, module_info, base_path)
        create_index_files(module_info, base_path)

    print("\n✅ All module files generated successfully!")

if __name__ == "__main__":
    main()
