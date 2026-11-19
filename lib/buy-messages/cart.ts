export const cartBuyMessages: string[] = [
  "Your items are imaginary. Your cart has been cleared. Your satisfaction is imaginary.",
  "Your order has been received. Your order will be processed by USPS. USPS has been notified. USPS has been notified twice. USPS has not responded.",
  "Thank you for your purchase. We have already forgotten what you bought.",
  "Your cart has been cleared. Your cart has been moved to the cloud. We do not know where the cloud is.",
  "Order confirmed. Nothing has been shipped. Nothing will be shipped. The confirmation is real.",
  "Your items are on their way. There is no way. There are no items.",
  "Purchase complete. The Content Review Team has been notified. The Content Review Team is in a huddle.",
  "Your order is being processed. It is not being processed. Thank you for your order.",
  "Your order has been handed off to USPS. USPS will ship it. USPS may ship it. USPS may not ship it. USPS will decide. Please allow 4–6 weeks for USPS to decide.",
  "Your order has been shipped via USPS Priority Mail. USPS Priority Mail is an oxymoron. Your order is on its way eventually.",
  "Shipping is free. Shipping has always been free. Shipping will be free for now. Shipping may not be free tomorrow.",
  "Your order is in transit. Your order has always been in transit. Transit is a state of mind.",
  "Your cart has been migrated to the cloud. The cloud is somewhere. We do not know where. Your cart is fine.",
];

export function getCartBuyMessage(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return cartBuyMessages[Math.abs(hash) % cartBuyMessages.length];
}
