export const STATUSES = { SUCCESS: 'success', FAIL: 'fail' } as const;
export type Status = (typeof STATUSES)[keyof typeof STATUSES];
