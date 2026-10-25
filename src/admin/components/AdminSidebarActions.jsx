import { ArrowLeft, LogOut } from 'lucide-react';

export default function AdminSidebarActions({ navigate, onLogout }) {
  return (
    <div className="mt-8 flex flex-col gap-3">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-3 border-2 border-black bg-white px-4 py-3 font-bold hover:bg-yellow-200"
      >
        <ArrowLeft size={20} />
        Back to Website
      </button>

      <button
        onClick={onLogout}
        className="flex items-center gap-3 border-2 border-black bg-red-500 text-white px-4 py-3 font-black shadow-[4px_4px_0px_#000] hover:bg-red-600"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
}