export const FRANCHISES = { POKEMON: 'pokemon', DIGIMON: 'digimon' } as const;
export type Franchise = (typeof FRANCHISES)[keyof typeof FRANCHISES];
