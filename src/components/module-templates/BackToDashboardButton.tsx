import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getComponentClasses } from '../../design-system/tokens';

/**
 * BackToDashboardButton - Standardized back button for all modules
 *
 * This component ensures consistent back navigation across all 20 modules.
 * Styling is controlled by design tokens.
 */
export const BackToDashboardButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/app/dashboard')}
      className={getComponentClasses.backButton()}
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Dashboard
    </button>
  );
};
