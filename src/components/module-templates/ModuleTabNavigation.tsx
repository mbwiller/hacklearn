import React from 'react';
import { LucideIcon } from 'lucide-react';
import { getComponentClasses, designTokens } from '../../design-system/tokens';

export interface Tab {
  /**
   * Unique identifier for the tab
   */
  id: string;

  /**
   * Display label for the tab
   */
  label: string;

  /**
   * Icon to display with the tab
   */
  icon: LucideIcon;
}

export interface ModuleTabNavigationProps {
  /**
   * Array of tabs to display
   */
  tabs: Tab[];

  /**
   * Currently active tab ID
   */
  activeTab: string;

  /**
   * Callback when a tab is clicked
   */
  onTabChange: (tabId: string) => void;
}

/**
 * ModuleTabNavigation - Standardized tab navigation for all modules
 *
 * This component ensures consistent tab styling and behavior across all 20 modules.
 * It supports icons and labels with design token styling.
 */
export const ModuleTabNavigation: React.FC<ModuleTabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className={getComponentClasses.tabContainer()}>
      <nav className={designTokens.components.tabs.nav}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={getComponentClasses.tabButton(isActive)}
            >
              <Icon className={designTokens.components.tabs.button.icon} />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
