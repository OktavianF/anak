import React from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Global providers wrapper for the application
 * Add context providers here (auth, theme, query, etc.)
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {/* Add providers here as needed:
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      */}
      {children}
    </>
  );
}
