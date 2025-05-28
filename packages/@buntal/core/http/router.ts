export const buildRouter = (dir: string) =>
  new Bun.FileSystemRouter({
    style: 'nextjs',
    dir: dir
  })
