interface IsDirectory {
  (path: string, callback: (err: null | NodeJS.ErrnoException | Error, isDir: boolean) => void): void | never
  sync(path: string): boolean
}

declare module 'is-directory' {
  const isDirectory: IsDirectory
  export = isDirectory
}
