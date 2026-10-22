import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading = false, error = null } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(
      loginUser({
        email: formData.email,
        password: formData.password,
        remember: formData.remember,
      })
    );

    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF4E0] flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-black uppercase tracking-tight">
            WELCOME BACK
          </h1>
          <p className="text-sm font-bold text-gray-600 mt-1">
            Enter your credentials to access your account
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-[#FF6B6B] border-2 border-black font-bold text-xs uppercase text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-black tracking-wider text-black uppercase">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 w-5 h-5 text-black stroke-[2.5] pointer-events-none" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="YOU@EXAMPLE.COM"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white border-4 border-black pl-12 pr-4 py-3.5 text-base sm:text-sm font-bold placeholder:text-gray-400 focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
                required
              />
            </div>
          </div>


          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-xs font-black tracking-wider text-black uppercase">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-bold text-black underline hover:bg-[#FFD600] px-1 transition-colors"
              >
                FORGOT?
              </Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-5 h-5 text-black stroke-[2.5] pointer-events-none" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white border-4 border-black pl-12 pr-12 py-3.5 text-base sm:text-sm font-bold placeholder:text-gray-400 focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-black hover:opacity-70 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <Eye className="w-5 h-5 stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>


          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="w-5 h-5 accent-[#FF6B6B] border-2 border-black rounded-none cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs font-bold text-black select-none cursor-pointer">
              REMEMBER ME ON THIS DEVICE
            </label>
          </div>


          <motion.button
            whileHover={!isLoading ? { x: -2, y: -2 } : {}}
            whileTap={!isLoading ? { x: 2, y: 2 } : {}}
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF6B6B] text-black border-4 border-black px-6 py-4 mt-2 font-extrabold flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none cursor-pointer select-none text-base tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span>LOGGING IN...</span>
                <Loader2 className="w-5 h-5 animate-spin" />
              </>
            ) : (
              <>
                <span>LOG IN</span>
                <ArrowRight className="w-5 h-5 stroke-3" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center pt-4 border-t-2 border-black">
          <p className="text-xs font-bold text-black">
            DON'T HAVE AN ACCOUNT?{' '}
            <Link
              to="/signup"
              className="bg-[#A855F7] text-white px-2 py-0.5 border-2 border-black font-black hover:bg-[#9333ea] transition-colors inline-block ml-1"
            >
              SIGN UP
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;