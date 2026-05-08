/**
 * Spacing utilities for irregular (asymmetric) brutalist padding/margin
 */

type SpacingDirection = 'pt' | 'pr' | 'pb' | 'pl' | 'px' | 'py';

interface IrregularSpacing {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

/**
 * Create irregular spacing for brutalist aesthetic
 * Values in tailwind units (1 unit = 0.25rem = 4px)
 * 
 * @example
 * irregularPadding(3, 4, 2, 5) // pt-3 pr-4 pb-2 pl-5
 */
export function irregularPadding(
  top: number,
  right: number,
  bottom: number,
  left: number
): string {
  return `pt-${top} pr-${right} pb-${bottom} pl-${left}`;
}

/**
 * Create irregular margin
 */
export function irregularMargin(
  top: number,
  right: number,
  bottom: number,
  left: number
): string {
  return `mt-${top} mr-${right} mb-${bottom} ml-${left}`;
}

/**
 * Predefined irregular spacings
 */
export const IRREGULAR_SPACINGS = {
  compact: {
    padding: irregularPadding(2, 3, 1, 4),
    margin: irregularMargin(1, 2, 1, 3),
  },
  default: {
    padding: irregularPadding(3, 4, 2, 5),
    margin: irregularMargin(2, 3, 2, 4),
  },
  spacious: {
    padding: irregularPadding(4, 6, 3, 7),
    margin: irregularMargin(3, 4, 3, 5),
  },
  hero: {
    padding: irregularPadding(6, 8, 4, 10),
    margin: irregularMargin(4, 6, 4, 8),
  },
  tightLeft: {
    padding: irregularPadding(4, 6, 4, 2),
    margin: irregularMargin(0, 4, 0, 0),
  },
  tightRight: {
    padding: irregularPadding(4, 2, 4, 6),
    margin: irregularMargin(0, 0, 0, 4),
  },
} as const;

/**
 * Grid gap utilities (irregular)
 */
export const IRREGULAR_GAPS = {
  small: 'gap-[8px_12px]',      // 2px vertical, 3px horizontal
  default: 'gap-[12px_20px]',    // 3px vertical, 5px horizontal
  large: 'gap-[16px_28px]',      // 4px vertical, 7px horizontal
  tight: 'gap-[4px_8px]',        // 1px vertical, 2px horizontal
} as const;

/**
 * Create inline style for irregular spacing (useful for dynamic values)
 */
export function createIrregularStyle(
  top: number,
  right: number,
  bottom: number,
  left: number
): React.CSSProperties {
  return {
    paddingTop: `${top * 0.25}rem`,
    paddingRight: `${right * 0.25}rem`,
    paddingBottom: `${bottom * 0.25}rem`,
    paddingLeft: `${left * 0.25}rem`,
  };
}

/**
 * Create inline style for gap (vertical, horizontal)
 */
export function createGapStyle(
  vertical: number,
  horizontal: number
): React.CSSProperties {
  return {
    gap: `${vertical * 0.25}rem ${horizontal * 0.25}rem`,
  };
}
