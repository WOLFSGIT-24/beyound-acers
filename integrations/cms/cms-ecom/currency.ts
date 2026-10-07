export const DEFAULT_CURRENCY = 'INR';

export function formatPrice(amount: number, currencyCode: string = DEFAULT_CURRENCY): string {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  } catch {
    return `₹${amount}`;
  }
}

export const useCurrency = () => {
  return {
    currency: DEFAULT_CURRENCY,
    isLoading: false,
    error: null,
  };
};
