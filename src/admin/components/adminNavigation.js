import {
  LayoutDashboard,
  BookOpen,
  Users,
  Star,
  ChartNoAxesCombined,
  History,
  Settings,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
  { name: 'Books', path: '/admin/books', icon: BookOpen },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Reviews', path: '/admin/reviews', icon: Star },
  { name: 'Analytics', path: '/admin/analytics', icon: ChartNoAxesCombined },
  { name: 'Audit Logs', path: '/admin/audit-logs', icon: History },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export default navigation;