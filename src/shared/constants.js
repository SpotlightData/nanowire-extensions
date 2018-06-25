export const placeHolderSub = {
  unsubscribe: () => false,
  subscribe: () => ({ unsubscribe: () => false }),
};

export const identity = a => a;
