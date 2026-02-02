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
   - created appComponents folder
     - created Container.jsx file
     - created NavBar.jsx file

   - Installed react router
   - wrote the routes in AppRouting.jsx file!
   - created Login.jsx file
   - Install axios
   - Install redux toolkit
   - created appStore.js file
   - created userSlice.js file
   - created feedSlice.js file
   - created requestSlice.js file
   - created friendsSlice.js file
   - created constants.js file
   - created blockSlice.js file

   # Task-3
   - created AppTabs.jsx file
   - created Feed.jsx file
   - created CardUser.jsx file
   - created Requests.jsx file
   - created Friends.jsx file
   - created Block.jsx file
   - created Profile.jsx file
   - created ProfileEdit.jsx file
   - created ForgotPassword.jsx file
   - created DropDown.jsx file
   - Protected Routes