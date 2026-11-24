import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { copyFileSync, mkdirSync } from 'node:fs'

const publicPages = [
  'index.html',
  'privacy.html',
  'terms.html',
  'disclaimer.html',
  'about_prime_lane_motors/code.html',
  'contact_us/code.html',
  'finance_enquiry_final_vw_mobile/code.html',
  'our_inventory_desktop/code.html',
  'sell_or_trade_in_your_vehicle/code.html'
].map((page) => resolve(process.cwd(), page))

const copyGradientUtility = {
  name: 'copy-plm-gradient-utility',
  closeBundle() {
    const destination = resolve(process.cwd(), 'dist/assets/utils')
    mkdirSync(destination, { recursive: true })
    copyFileSync(
      resolve(process.cwd(), 'assets/utils/gradients.js'),
      resolve(destination, 'gradients.js')
    )
  }
}

export default defineConfig({
  root: '.',
  plugins: [copyGradientUtility],
  publicDir: false,
  server: {
    port: 5173,
    host: true,
    open: false,
    cors: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2020',
    rollupOptions: {
      input: publicPages
    }
  }
})
