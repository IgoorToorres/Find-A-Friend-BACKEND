import { defineConfig } from 'vitest/config'
import tsconfigpPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigpPaths()],
  test: {
    globals: true,
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/services',
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          environment:
            'prisma/vitest-enviroment-prisma/prisma-test-enviroment.ts',
        },
      },
    ],
  },
})
