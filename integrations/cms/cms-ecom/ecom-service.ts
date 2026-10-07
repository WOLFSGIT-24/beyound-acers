/**
 * Buy now - local mock implementation.
 */
export async function buyNow(
  items: Array<{ collectionId: string; itemId: string; quantity?: number }>
): Promise<void> {
  if (items.length === 0) {
    throw new Error('At least one item is required for checkout');
  }
  console.log('Buy Now called locally:', items);
  alert('Checkout is currently disabled in local mode.');
}
