import ReactDOM from 'react-dom/client'
import App from './App'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const clientQuery = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={clientQuery}>
    <App />
  </QueryClientProvider>
)