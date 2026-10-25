import { ArrowLeft, Menu, X } from 'lucide-react';

export default function AdminMobileHeader({
  sidebarOpen,
  setSidebarOpen,
  navigate,
}) {
  return (
    <header className="lg:hidden flex items-center justify-between p-4 border-b-4 border-black">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="border-2 border-black bg-white p-2"
        aria-label="Toggle navigation"
      >
        {sidebarOpen ? <X /> : <Menu />}
      </button>

      <h1 className="font-black text-xl">BOOK ADMIN</h1>

      <button
        onClick={() => navigate('/')}
        className="border-2 border-black bg-white p-2"
        aria-label="Back to website"
      >
        <ArrowLeft />
      </button>
    </header>
  );
}