declare module '*.json' {
  const name: string;
}

export interface VersionObj {
  chrome: string;
  node: string;
  electron: string;
}
