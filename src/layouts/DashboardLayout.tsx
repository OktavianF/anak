import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout for dashboard/main app pages
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
