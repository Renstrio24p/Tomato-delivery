import { ReactNode } from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { lazy, Suspense, useEffect, useState } from "react";
const Notify = lazy(() => import("./components/Notify"));

type Props = {
  children: ReactNode;
};

export default function Hydrate({ children }: Props) {
  const [isHydrated, setIsHydrated] = useState(false);

  const queryClient = new QueryClient();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <Suspense fallback="Loading...">
        <Notify />
      </Suspense>
    );
  }

  return (
    <Suspense fallback="Loading...">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Suspense>
  );
}
