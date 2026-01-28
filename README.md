# Sandeshan Frontend

# Task-1
- Install vite and configure.
   - npm create vite@lastest
- Install TailwindCSS and setup
   - npm install tailwindcss @tailwindcss/vite
- Install shadcn/ui and setup
   - create jsconfig.json
{
  "files": [],
  "references": [],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
   - npm install -D @types/node
   - In vite.config.js
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
   - npx shadcn@latest init
   - Install successfully completed!


   # Task-2
   