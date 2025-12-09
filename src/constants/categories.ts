export const categoryMapping = {
    breaking: 'Breaking',
    business: 'Business',
    crime: 'Crime',
    domestic: 'Domestic',
    education: 'Education',
    entertainment: 'Entertainment',
    environment: 'Environment',
    food: 'Food',
    health: 'Health',
    lifestyle: 'Lifestyle',
    other: 'Other',
    politics: 'Politics',
    science: 'Science',
    sports: 'Sports',
    technology: 'Technology',
    top: 'Top',
    tourism: 'Tourism',
    world: 'World',
} as const;

export type Category = keyof typeof categoryMapping;
