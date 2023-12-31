import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://127.0.0.1:5173",
    env: {
      BACKEND_API_URL: "http://127.0.0.1:3001/api",
      HOMEPAGE: "http://127.0.0.1:5173"
    }
  },
})
