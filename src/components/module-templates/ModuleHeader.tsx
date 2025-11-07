import React from 'react';
import { LucideIcon } from 'lucide-react';
import { getComponentClasses, designTokens } from '../../design-system/tokens';

export interface ModuleHeaderProps {
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
   * Optional custom icon color/gradient (overrides default emerald gradient)
   */
  iconGradient?: string;
}

/**
 * ModuleHeader - Standardized header for all modules
 *
 * This component ensures consistent header styling across all 20 modules.
 * It includes an icon, title, and subtitle with design token styling.
 */
export const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  icon: Icon,
  title,
  subtitle,
  iconGradient,
}) => {
  const iconWrapperClass = iconGradient
    ? `${designTokens.components.header.iconWrapper.base} ${iconGradient}`
    : getComponentClasses.headerIconWrapper();

  return (
    <div className={designTokens.components.header.container}>
      <div className={iconWrapperClass}>
        <Icon className={getComponentClasses.headerIcon()} />
      </div>
      <div className="flex-1">
        <h1 className={getComponentClasses.headerTitle()}>{title}</h1>
        <p className={getComponentClasses.headerSubtitle()}>{subtitle}</p>
      </div>
    </div>
  );
};
