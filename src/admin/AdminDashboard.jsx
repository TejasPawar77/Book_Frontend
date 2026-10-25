import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Users,
  Search,
  Star,
  ArrowRight,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';

const dashboardUrl = import.meta.env.VITE_ADMIN_DASHBOARD_URL;

const statistics = [
  {
    key: 'total_books',
    label: 'TOTAL BOOKS',
    icon: BookOpen,
    color: 'bg-purple-300',
  },
  {
    key: 'total_users',
    label: 'REGISTERED USERS',
    icon: Users,
    color: 'bg-blue-300',
  },
  {
    key: 'total_searches',
    label: 'BOOK SEARCHES',
    icon: Search,
    color: 'bg-yellow-300',
  },
  {
    key: 'total_reviews',
    label: 'TOTAL REVIEWS',
    icon: Star,
    color: 'bg-pink-300',
  },
];

const shortcuts = [
  {
    title: 'Manage Books',
    description: 'Add, update, search, and remove books.',
    path: '/admin/books',
    icon: BookOpen,
    color: 'bg-purple-300',
  },
  {
    title: 'Manage Users',
    description: 'View registered users and account status.',
    path: '/admin/users',
    icon: Users,
    color: 'bg-blue-300',
  },
  {
    title: 'Review Analytics',
    description: 'Explore searches, ratings, and recommendations.',
    path: '/admin/analytics',
    icon: Search,
    color: 'bg-yellow-300',
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.auth);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const fetchDashboard = async () => {
    if (!accessToken) {
      setError('Access token is missing. Please log in again.')
      setData(null)
      setLoading(false)
      return
    }

    if (!dashboardUrl) {
      setError(
        'VITE_ADMIN_DASHBOARD_URL is missing from your frontend .env file.'
      )
      setData(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.get(dashboardUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      setData(response.data)
    } catch (err) {
      setData(null)

      setError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        err.message ||
        'Unable to load dashboard statistics.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (accessToken) {
      fetchDashboard()
    } else {
      setLoading(false)
      setError('Access token is missing. Please log in again.')
    }
  }, [accessToken])


  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-purple-700 font-black text-sm">
            OVERVIEW
          </p>
          <h1 className="text-3xl sm:text-4xl font-black mt-1">
            Dashboard<span className="text-purple-600">.</span>
          </h1>
          <p className="mt-2 font-medium text-gray-700">
            Manage your Book Recommender application.
          </p>
        </div>

        <button
          onClick={fetchDashboard}
          disabled={loading}
          className="flex items-center gap-2 border-2 border-black bg-white px-4 py-3 font-black shadow-[4px_4px_0px_#000] hover:bg-purple-100 disabled:opacity-60"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div
          role="alert"
          className="flex gap-3 items-start border-2 border-black bg-red-100 p-4 shadow-[4px_4px_0px_#000]"
        >
          <AlertCircle className="shrink-0 mt-1" />
          <div>
            <p className="font-black">Could not load dashboard</p>
            <p className="text-sm mt-1">{error}</p>
            <p className="text-sm mt-2">
              Check the dashboard endpoint and Django staff permissions.
            </p>
          </div>
        </div>
      )}

      {/* Statistics */}
      <section>
        <h2 className="text-xl font-black mb-4">
          APPLICATION STATISTICS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {statistics.map(({ key, label, icon: Icon, color }) => (
            <div
              key={key}
              className="border-2 border-black bg-white p-5 shadow-[6px_6px_0px_#000] hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between gap-3">
                <div
                  className={`w-12 h-12 border-2 border-black ${color} flex items-center justify-center`}
                >
                  <Icon size={24} />
                </div>
                <span className="text-xs font-black text-gray-500">
                  LIVE DATA
                </span>
              </div>

              <p className="mt-5 text-sm font-black text-gray-600">
                {label}
              </p>

              <p className="mt-1 text-3xl font-black">
                {loading ? '...' : (data?.[key] ?? '—')}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section className="border-2 border-black bg-white shadow-[6px_6px_0px_#000]">
        <div className="border-b-2 border-black p-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">RECENT ACTIVITY</h2>
            <p className="text-sm text-gray-600 mt-1">
              Latest administrative and application events.
            </p>
          </div>
          <span className="bg-yellow-300 border-2 border-black px-2 py-1 text-xs font-black">
            ACTIVITY
          </span>
        </div>

        <div className="p-5">
          {loading ? (
            <p className="font-bold text-gray-500">Loading activity...</p>
          ) : data?.recent_activity?.length ? (
            <div className="space-y-4">
              {data.recent_activity.map((item, index) => (
                <div
                  key={item.id ?? index}
                  className="border-l-4 border-purple-500 pl-4 py-1"
                >
                  <p className="font-bold">
                    {item.description ?? item.action ?? 'Activity'}
                  </p>
                  {item.created_at && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 font-medium">
              {error
                ? 'Activity is unavailable until the API connection is fixed.'
                : 'No recent activity is available yet.'}
            </p>
          )}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="text-xl font-black mb-4">
          QUICK ACTIONS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {shortcuts.map(({ title, description, path, icon: Icon, color }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="text-left border-2 border-black bg-white p-5 shadow-[5px_5px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <div
                className={`w-12 h-12 ${color} border-2 border-black flex items-center justify-center`}
              >
                <Icon size={24} />
              </div>

              <h3 className="text-xl font-black mt-4">{title}</h3>
              <p className="text-sm text-gray-600 mt-2">{description}</p>

              <span className="flex items-center gap-2 mt-5 font-black text-purple-700">
                OPEN MODULE <ArrowRight size={18} />
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}