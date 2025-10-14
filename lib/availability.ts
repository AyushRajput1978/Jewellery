export type AvailabilityStatus = "in_stock" | "backorder" | "out_of_stock";

export interface AvailabilityRule {
  combination: Record<string, string | number>;
  status: AvailabilityStatus;
  message: string;
}

export interface StockLevel {
  in_stock: boolean;
  backorder_days: number;
}

export interface AvailabilityData {
  rules: AvailabilityRule[];
  stock_levels: Record<string, Record<string, StockLevel>>;
}

export interface AvailabilityResult {
  status: AvailabilityStatus;
  message: string;
  isAvailable: boolean;
}

/**
 * Checks if a specific variation combination is available
 * @param selected - The currently selected variations
 * @param availability - The availability rules and stock levels
 * @returns Availability result with status, message, and availability flag
 */
export function checkAvailability(
  selected: Record<string, string | number>,
  availability: AvailabilityData
): AvailabilityResult {
  // Check specific combination rules first (highest priority)
  for (const rule of availability.rules) {
    const matches = Object.entries(rule.combination).every(([key, value]) => {
      return selected[key] === value;
    });
    
    if (matches) {
      return {
        status: rule.status,
        message: rule.message,
        isAvailable: rule.status !== "out_of_stock",
      };
    }
  }

  // Check individual stock levels
  let maxBackorderDays = 0;
  let hasOutOfStock = false;

  for (const [key, value] of Object.entries(selected)) {
    const stockLevels = availability.stock_levels[key];
    if (stockLevels) {
      const stockInfo = stockLevels[String(value)];
      if (stockInfo) {
        if (!stockInfo.in_stock) {
          hasOutOfStock = true;
        }
        if (stockInfo.backorder_days > maxBackorderDays) {
          maxBackorderDays = stockInfo.backorder_days;
        }
      }
    }
  }

  // Determine final status
  if (hasOutOfStock) {
    return {
      status: "out_of_stock",
      message: "This combination is currently out of stock",
      isAvailable: false,
    };
  }

  if (maxBackorderDays > 0) {
    const weeks = Math.ceil(maxBackorderDays / 7);
    return {
      status: "backorder",
      message: `Available on backorder (${weeks}-${weeks + 1} weeks)`,
      isAvailable: true,
    };
  }

  return {
    status: "in_stock",
    message: "In stock - ready to ship",
    isAvailable: true,
  };
}

/**
 * Checks if a specific variation option is available given current selections
 * @param variationType - The type of variation (e.g., "gemstone", "ring_size")
 * @param optionValue - The specific option value to check
 * @param currentSelection - The currently selected variations
 * @param availability - The availability rules and stock levels
 * @returns Object with isAvailable flag and reason message
 */
export function checkOptionAvailability(
  variationType: string,
  optionValue: string | number,
  currentSelection: Record<string, string | number>,
  availability: AvailabilityData
): { isAvailable: boolean; reason?: string } {
  // Check if this specific option has stock
  const stockLevels = availability.stock_levels[variationType];
  if (stockLevels) {
    const stockInfo = stockLevels[String(optionValue)];
    if (stockInfo && !stockInfo.in_stock) {
      return {
        isAvailable: false,
        reason: "Out of stock",
      };
    }
  }

  // Create a test selection with this option
  const testSelection = { ...currentSelection, [variationType]: optionValue };

  // Check if this combination would be available
  const result = checkAvailability(testSelection, availability);

  return {
    isAvailable: result.isAvailable,
    reason: !result.isAvailable ? result.message : undefined,
  };
}

