// Prerender-only stand-in for src/firebase/config (no browser APIs in Node).
export const app = {} as never;
export const auth = { currentUser: null } as never;
export const db = {} as never;
export const storage = {} as never;
