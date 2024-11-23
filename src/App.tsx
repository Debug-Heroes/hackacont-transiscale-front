import { QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./router/router-provider";
import { queryClient } from "./lib/react-query";
import { AuthVerification } from "./contexts/AuthVerification";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <Router />

    </QueryClientProvider>
  )
}


