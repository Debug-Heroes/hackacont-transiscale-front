import { QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./router/router-provider";
import { queryClient } from "./lib/react-query";
import { Toaster } from 'sonner'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  )
}


