export const countries = ['us', 'ie', 'in'] as const;

export type Country = (typeof countries)[number];
