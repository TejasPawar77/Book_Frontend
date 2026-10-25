import { NavLink } from 'react-router-dom';
import navigation from '/adminNavigation';

export default function AdminNavigation({ onNavigate }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 border-2 border-black font-bold transition-all ${isActive
      ? 'bg-purple-500 text-white shadow-[4px_4px_0px_#000] translate-x-[-2px]'
      : 'bg-white text-black hover:bg-purple-100'
    }`;

  return (
    <nav className="flex flex-col gap-3 flex-1">
      {navigation.map(({ name, path, icon: Icon, end }) => (
        <NavLink
          key={path}
          to={path}
          end={end}
          className={linkClass}
          onClick={onNavigate}
        >
          <Icon size={20} />
          <span>{name}</span>
        </NavLink>
      ))}
    </nav>
  );
}