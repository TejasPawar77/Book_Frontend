import { Link } from 'react-router-dom';
import { ArrowRight, UserRound } from 'lucide-react';

const AuthMessage = ({ authMessage, loggedIn }) => {
  if (!authMessage) return null;

  return (
    <div
      role="alert"
      className="mt-4 p-4 bg-[#FFD93D] border-4 border-black font-bold text-sm"
    >
      <p>{authMessage}</p>

      {!loggedIn && (
        <div className="flex flex-wrap gap-3 mt-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-[#FF6B6B] px-3 py-2 border-2 border-black font-black"
          >
            Log In <ArrowRight size={16} />
          </Link>

          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-[#A855F7] text-white px-3 py-2 border-2 border-black font-black"
          >
            <UserRound size={16} />
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthMessage;