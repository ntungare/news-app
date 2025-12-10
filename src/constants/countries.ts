export const countries = Object.freeze(['us', 'ie', 'in'] as const);
export const countriesSet = Object.freeze(new Set<string>(countries));

export type Country = (typeof countries)[number];
