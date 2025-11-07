import React from 'react';
import { LucideIcon } from 'lucide-react';
import { BackToDashboardButton } from './BackToDashboardButton';
import { ModuleHeader } from './ModuleHeader';
import { ModuleTabNavigation, Tab } from './ModuleTabNavigation';
import { designTokens, combineTokens } from '../../design-system/tokens';

export interface StandardModuleLayoutProps {
  /**
   * The icon to display in the header
   */
  icon: LucideIcon;

  /**
   * The main title of the module
   */
  title: string;

  /**
   * The subtitle/description of the module
   */
  subtitle: string;

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

  /**
   * The content to display (typically based on activeTab)
   */
  children: React.ReactNode;

  /**
   * Optional custom icon gradient (overrides default emerald)
   */
  iconGradient?: string;
}

/**
 * StandardModuleLayout - Complete layout wrapper for all modules
 *
 * This component provides the standard structure for all 20 modules:
 * - Page container with proper background
 * - Back to dashboard button
 * - Module header with icon, title, subtitle
 * - Tab navigation
 * - Content area
 *
 * Usage:
 * ```tsx
 * <StandardModuleLayout
 *   icon={Shield}
 *   title="My Module"
 *   subtitle="Learn about..."
 *   tabs={tabs}
 *   activeTab={activeTab}
 *   onTabChange={setActiveTab}
 * >
 *   {activeTab === 'overview' && <OverviewContent />}
 *   {activeTab === 'examples' && <ExamplesContent />}
 * </StandardModuleLayout>
 * ```
 */
export const StandardModuleLayout: React.FC<StandardModuleLayoutProps> = ({
  icon,
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
  children,
  iconGradient,
}) => {
  const pageClass = combineTokens(
    designTokens.layout.container,
    designTokens.colors.background.page.light,
    designTokens.colors.background.page.dark,
    designTokens.spacing.page
  );

  const cardClass = combineTokens(
    designTokens.layout.maxWidth,
    designTokens.colors.background.card.light,
    designTokens.colors.background.card.dark,
    designTokens.colors.border.default.light,
    designTokens.colors.border.default.dark,
    designTokens.borderRadius.xlarge,
    designTokens.spacing.cardLarge,
    designTokens.shadows.large,
    'border'
  );

  return (
    <div className={pageClass}>
      <div className={designTokens.layout.maxWidth}>
        <div className={designTokens.spacing.elementBottom}>
          <BackToDashboardButton />
        </div>

        <div className={cardClass}>
          <ModuleHeader
            icon={icon}
            title={title}
            subtitle={subtitle}
            iconGradient={iconGradient}
          />

          <ModuleTabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
          />

          <div className={designTokens.spacing.spaceYMedium}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
