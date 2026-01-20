import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout for authentication pages (login, splash, survey)
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
