/**
 * Design Tokens - Single Source of Truth for HackLearn UI/UX
 *
 * This file defines all styling values used across the platform.
 * Changing values here will update all 20 modules automatically.
 */

export const designTokens = {
  // ============================================================================
  // COLORS
  // ============================================================================
  colors: {
    // Primary accent color (used for CTAs, highlights, icons)
    primary: {
      50: 'emerald-50',
      100: 'emerald-100',
      400: 'emerald-400',
      500: 'emerald-500',
      600: 'emerald-600',
      700: 'emerald-700',
      900: 'emerald-900',
      950: 'emerald-950',
    },

    // Background colors
    background: {
      page: {
        light: 'bg-white',
        dark: 'dark:bg-slate-950',
      },
      card: {
        light: 'bg-white',
        dark: 'dark:bg-slate-900',
      },
      cardSecondary: {
        light: 'bg-slate-50',
        dark: 'dark:bg-slate-800/50',
      },
    },

    // Border colors
    border: {
      default: {
        light: 'border-slate-200',
        dark: 'dark:border-slate-800',
      },
      subtle: {
        light: 'border-slate-100',
        dark: 'dark:border-slate-700',
      },
    },

    // Text colors
    text: {
      primary: {
        light: 'text-slate-900',
        dark: 'dark:text-white',
      },
      secondary: {
        light: 'text-slate-600',
        dark: 'dark:text-slate-400',
      },
      accent: {
        light: 'text-emerald-600',
        dark: 'dark:text-emerald-400',
      },
    },
  },

  // ============================================================================
  // SPACING
  // ============================================================================
  spacing: {
    // Page padding
    page: 'p-8',

    // Card padding
    cardLarge: 'p-8',
    cardMedium: 'p-6',
    cardSmall: 'p-4',

    // Margins
    sectionBottom: 'mb-8',
    elementBottom: 'mb-6',
    smallBottom: 'mb-4',

    // Gaps
    gapLarge: 'gap-6',
    gapMedium: 'gap-4',
    gapSmall: 'gap-2',

    // Spacing between sections
    spaceYLarge: 'space-y-8',
    spaceYMedium: 'space-y-6',
    spaceYSmall: 'space-y-4',
  },

  // ============================================================================
  // TYPOGRAPHY
  // ============================================================================
  typography: {
    // Page title (h1)
    title: 'text-4xl font-bold',

    // Section heading (h2)
    heading: 'text-2xl font-bold',

    // Subsection heading (h3)
    subheading: 'text-xl font-semibold',

    // Body text
    body: 'text-base',

    // Small text
    small: 'text-sm',

    // Extra small text
    xsmall: 'text-xs',
  },

  // ============================================================================
  // BORDER RADIUS
  // ============================================================================
  borderRadius: {
    xlarge: 'rounded-2xl',
    large: 'rounded-xl',
    medium: 'rounded-lg',
    small: 'rounded-md',
    full: 'rounded-full',
  },

  // ============================================================================
  // SHADOWS
  // ============================================================================
  shadows: {
    large: 'shadow-2xl',
    medium: 'shadow-lg',
    small: 'shadow-md',
  },

  // ============================================================================
  // COMPONENTS
  // ============================================================================
  components: {
    // Back to Dashboard Button
    backButton: {
      base: 'px-4 py-2 rounded-lg transition-all flex items-center gap-2',
      background: {
        light: 'bg-slate-100 hover:bg-slate-200',
        dark: 'dark:bg-slate-800 dark:hover:bg-slate-700',
      },
      border: {
        light: 'border border-slate-300',
        dark: 'dark:border-slate-700',
      },
      icon: {
        size: 'w-4 h-4',
      },
    },

    // Module Header
    header: {
      container: 'flex items-center gap-4 mb-8',
      iconWrapper: {
        base: 'p-4 rounded-xl',
        gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
      },
      icon: {
        size: 'w-12 h-12',
        color: 'text-white',
      },
      title: 'text-4xl font-bold',
      subtitle: {
        base: 'mt-2',
        color: {
          light: 'text-emerald-600',
          dark: 'dark:text-emerald-400',
        },
      },
    },

    // Tab Navigation
    tabs: {
      container: {
        base: 'border-b mb-8',
        border: {
          light: 'border-slate-200',
          dark: 'dark:border-slate-800',
        },
      },
      nav: 'flex gap-2',
      button: {
        base: 'px-6 py-3 rounded-t-lg font-medium transition-all flex items-center gap-2',
        icon: 'w-5 h-5',
        active: {
          background: {
            light: 'bg-emerald-50',
            dark: 'dark:bg-emerald-950/50',
          },
          text: {
            light: 'text-emerald-600',
            dark: 'dark:text-emerald-400',
          },
          border: 'border-b-2 border-emerald-500',
        },
        inactive: {
          text: {
            light: 'text-slate-600',
            dark: 'dark:text-slate-400',
          },
          hover: {
            text: {
              light: 'hover:text-slate-900',
              dark: 'dark:hover:text-white',
            },
            background: {
              light: 'hover:bg-slate-50',
              dark: 'dark:hover:bg-slate-800',
            },
          },
        },
      },
    },

    // Content Cards
    card: {
      base: 'rounded-lg border p-6',
      background: {
        light: 'bg-white',
        dark: 'dark:bg-slate-900',
      },
      border: {
        light: 'border-slate-200',
        dark: 'dark:border-slate-800',
      },
    },
  },

  // ============================================================================
  // LAYOUT
  // ============================================================================
  layout: {
    maxWidth: 'max-w-6xl mx-auto',
    container: 'min-h-screen',
  },
} as const;

/**
 * Helper function to combine token classes
 */
export function combineTokens(...tokens: (string | undefined)[]): string {
  return tokens.filter(Boolean).join(' ');
}

/**
 * Get all classes for a component
 */
export const getComponentClasses = {
  backButton: () =>
    combineTokens(
      designTokens.components.backButton.base,
      designTokens.components.backButton.background.light,
      designTokens.components.backButton.background.dark,
      designTokens.components.backButton.border.light,
      designTokens.components.backButton.border.dark
    ),

  headerIconWrapper: () =>
    combineTokens(
      designTokens.components.header.iconWrapper.base,
      designTokens.components.header.iconWrapper.gradient
    ),

  headerIcon: () =>
    combineTokens(
      designTokens.components.header.icon.size,
      designTokens.components.header.icon.color
    ),

  headerTitle: () =>
    combineTokens(
      designTokens.components.header.title,
      designTokens.colors.text.primary.light,
      designTokens.colors.text.primary.dark
    ),

  headerSubtitle: () =>
    combineTokens(
      designTokens.components.header.subtitle.base,
      designTokens.components.header.subtitle.color.light,
      designTokens.components.header.subtitle.color.dark
    ),

  tabContainer: () =>
    combineTokens(
      designTokens.components.tabs.container.base,
      designTokens.components.tabs.container.border.light,
      designTokens.components.tabs.container.border.dark,
      designTokens.spacing.sectionBottom
    ),

  tabButton: (isActive: boolean) => {
    const base = designTokens.components.tabs.button.base;
    if (isActive) {
      return combineTokens(
        base,
        designTokens.components.tabs.button.active.background.light,
        designTokens.components.tabs.button.active.background.dark,
        designTokens.components.tabs.button.active.text.light,
        designTokens.components.tabs.button.active.text.dark,
        designTokens.components.tabs.button.active.border
      );
    }
    return combineTokens(
      base,
      designTokens.components.tabs.button.inactive.text.light,
      designTokens.components.tabs.button.inactive.text.dark,
      designTokens.components.tabs.button.inactive.hover.text.light,
      designTokens.components.tabs.button.inactive.hover.text.dark,
      designTokens.components.tabs.button.inactive.hover.background.light,
      designTokens.components.tabs.button.inactive.hover.background.dark
    );
  },

  contentCard: () =>
    combineTokens(
      designTokens.components.card.base,
      designTokens.components.card.background.light,
      designTokens.components.card.background.dark,
      designTokens.components.card.border.light,
      designTokens.components.card.border.dark
    ),
};
