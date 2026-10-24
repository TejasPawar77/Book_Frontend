import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Star,
  ChartNoAxesCombined,
  History,
  Settings,
  LogOut,
  ArrowLeft,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { logout } from '../store/authSlice';

const navigation = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
  { name: 'Books', path: '/admin/books', icon: BookOpen },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Reviews', path: '/admin/reviews', icon: Star },
  { name: 'Analytics', path: '/admin/analytics', icon: ChartNoAxesCombined },
  { name: 'Audit Logs', path: '/admin/audit-logs', icon: History },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 border-2 border-black font-bold transition-all ${isActive
      ? 'bg-purple-500 text-white shadow-[4px_4px_0px_#000] translate-x-[-2px]'
      : 'bg-white text-black hover:bg-purple-100'
    }`;

  return (
    <div className="min-h-screen bg-[#FFF4E0] text-black">
      {/* Mobile header */}
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

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#FFF4E0] border-r-4 border-black p-5 flex flex-col
          transform transition-transform duration-200 lg:translate-x-0 lg:static lg:min-h-screen
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-black tracking-tight">
              BOOK<span className="text-purple-600">ADMIN.</span>
            </h1>
            <p className="text-sm font-bold mt-2">MANAGEMENT CONSOLE</p>
          </div>

          <div className="bg-purple-100 border-2 border-black p-3 mb-6 shadow-[4px_4px_0px_#000]">
            <p className="text-xs font-black text-gray-600">SIGNED IN AS</p>
            <p className="font-black truncate">
              {username || 'Administrator'}
            </p>
          </div>

          <nav className="flex flex-col gap-3 flex-1">
            {navigation.map(({ name, path, icon: Icon, end }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                className={linkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                <span>{name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 border-2 border-black bg-white px-4 py-3 font-bold hover:bg-yellow-200"
            >
              <ArrowLeft size={20} />
              Back to Website
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 border-2 border-black bg-red-500 text-white px-4 py-3 font-black shadow-[4px_4px_0px_#000] hover:bg-red-600"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">
          <div className="hidden lg:flex items-center justify-between mb-8 border-b-4 border-black pb-5">
            <div>
              <p className="text-sm font-black text-purple-700">
                BOOK RECOMMENDER / ADMIN
              </p>
              <h2 className="text-3xl font-black mt-1">
                Management Dashboard
              </h2>
            </div>

            <div className="border-2 border-black bg-white px-4 py-3 font-bold shadow-[4px_4px_0px_#000]">
              Welcome, {username || 'Admin'}
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
}