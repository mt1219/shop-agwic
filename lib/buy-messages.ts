// One entry per product slug. `name` is interpolated into the message.
// Fallback used for products not listed here.

type BuyMessage = (name: string) => string;

export const buyMessages: Record<string, BuyMessage> = {
  "the-original-cork": (name) =>
    `Congratulations. You now own ${name}. The whistler does not know that yet. They will.`,
  "humane-squirrel-eliminator": (name) =>
    `Thank you for your purchase of ${name}. The squirrels have been notified. They have questions.`,
  "noisewhacker-3000": (name) =>
    `${name} has been dispatched to your home. So has your neighbor's leaf blower. Please do not leave them alone together.`,
  "slow-driver-deterrent": (name) =>
    `Your ${name} is on its way. It will arrive at a reasonable speed. Unlike some people.`,
  "emotional-support-brick": (name) =>
    `Thank you for purchasing ${name}. Please hold. That is all.`,
  "single-ice-cube": (name) =>
    `Your ${name} has been packed. It will not survive shipping. Neither will you, eventually.`,
  "watched-subscription": (name) =>
    `You are now subscribed to ${name}. We hope you enjoy being observed. We have already started.`,
  "permission-to-leave-the-party": (name) =>
    `Your ${name} has been delivered. You may now leave. Please do.`,
  "placeholder-health": (name) =>
    `${name} is on its way. We do not know what it does. Neither will you.`,
  "placeholder-toys": (name) =>
    `${name} has been packed. It is not for children. It is not for anyone.`,
};

export const fallbackBuyMessage: BuyMessage = (name) =>
  `Thank you for your purchase of ${name}. It will arrive eventually. See terms.`;

export function getBuyMessage(slug: string, name: string): string {
  return (buyMessages[slug] ?? fallbackBuyMessage)(name);
}

export const cartBuyMessages: string[] = [
  "Your items are imaginary. Your cart has been cleared. Your satisfaction is imaginary.",
  "Your order has been received. Your order will be processed by USPS. USPS has been notified. USPS has been notified twice. USPS has not responded.",
  "Thank you for your purchase. We have already forgotten what you bought.",
  "Your cart has been cleared. Your cart has been moved to the cloud. We do not know where the cloud is.",
  "Order confirmed. Nothing has been shipped. Nothing will be shipped. The confirmation is real.",
  "Your items are on their way. There is no way. There are no items.",
  "Purchase complete. The Content Review Team has been notified. The Content Review Team has not been notified.",
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
