import { QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./router/router-provider";
import { queryClient } from "./lib/react-query";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  )
}


