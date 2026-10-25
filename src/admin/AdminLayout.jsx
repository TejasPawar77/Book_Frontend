import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AdminMobileHeader from './components/AdminMobileHeader';
import AdminSidebar from './components/AdminSidebar';
import AdminPageHeader from './components/AdminPageHeader';

export default function AdminLayout() {
  const navigate = useNavigate();

  const { username } = useSelector((state) => state.auth);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF4E0] text-black">
      {/* Mobile Header */}
      <AdminMobileHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigate={navigate}
      />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          username={username}
          navigate={navigate}
        />

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">
          <AdminPageHeader username={username} />

          {/* Child routes render here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
