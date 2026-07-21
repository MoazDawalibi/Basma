import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cp } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

function copyStableMediaAssets() {
  let outputDirectory = path.join(projectRoot, 'dist')

  return {
    name: 'copy-stable-media-assets',
    configResolved(config: { build: { outDir: string } }) {
      outputDirectory = path.resolve(projectRoot, config.build.outDir)
    },
    async closeBundle() {
      await cp(path.join(projectRoot, 'src', 'assets'), path.join(outputDirectory, 'media'), {
        recursive: true,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), copyStableMediaAssets()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
