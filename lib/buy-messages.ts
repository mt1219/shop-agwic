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
