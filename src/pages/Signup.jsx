import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../store/authSlice';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading = false, error: reduxError = null } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (formData.password !== formData.confirmPassword) {
      setLocalError("PASSWORDS DO NOT MATCH!");
      return;
    }


    const resultAction = await dispatch(
      signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    );

    if (signupUser.fulfilled.match(resultAction)) {
      navigate('/dashboard');
    }
  };

  const displayError = localError || reduxError;

  return (
    <div className="min-h-screen bg-[#FFF4E0] flex items-center justify-center p-4 font-sans py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-black text-black uppercase tracking-tight">
            CREATE ACCOUNT
          </h1>
          <p className="text-sm font-bold text-gray-600 mt-1">
            Join us today to get started
          </p>
        </div>


        {displayError && (
          <div className="mb-5 p-3 bg-[#FF6B6B] border-2 border-black font-bold text-xs uppercase text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {displayError}
          </div>
        )}


        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black tracking-wider text-black uppercase">
              User Name
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-4 w-5 h-5 text-black stroke-[2.5] pointer-events-none" />
              <input
                type="text"
                placeholder="JOHN DOE"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white border-4 border-black pl-12 pr-4 py-3 text-base sm:text-sm font-bold placeholder:text-gray-400 focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
                required
              />
            </div>
          </div>


          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black tracking-wider text-black uppercase">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 w-5 h-5 text-black stroke-[2.5] pointer-events-none" />
              <input
                type="email"
                placeholder="YOU@EXAMPLE.COM"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white border-4 border-black pl-12 pr-4 py-3 text-base sm:text-sm font-bold placeholder:text-gray-400 focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
                required
              />
            </div>
          </div>


          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black tracking-wider text-black uppercase">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-5 h-5 text-black stroke-[2.5] pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white border-4 border-black pl-12 pr-12 py-3 text-base sm:text-sm font-bold placeholder:text-gray-400 focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-black hover:opacity-70 focus:outline-none"
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
              id="terms"
              checked={formData.agreeToTerms}
              onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
              className="w-5 h-5 accent-[#FF6B6B] border-2 border-black rounded-none cursor-pointer"
              required
            />
            <label htmlFor="terms" className="text-xs font-bold text-black select-none cursor-pointer">
              I AGREE TO THE{' '}
              <a href="#terms" className="underline hover:bg-[#FFD600] px-0.5">
                TERMS & CONDITIONS
              </a>
            </label>
          </div>


          {isLoading ? (
            <div className="w-full bg-gray-300 border-4 border-black px-6 py-4 mt-2 flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-pulse">
              <div className="w-24 h-5 bg-gray-400 rounded-none"></div>
              <div className="w-5 h-5 bg-gray-400 rounded-none"></div>
            </div>
          ) : (
            <motion.button
              whileHover={{ x: -2, y: -2 }}
              whileTap={{ x: 2, y: 2 }}
              type="submit"
              className="w-full bg-[#FF6B6B] text-black border-4 border-black px-6 py-4 mt-2 font-extrabold flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none cursor-pointer select-none text-base tracking-wide"
            >
              <span>SIGN UP</span>
              <ArrowRight className="w-5 h-5 stroke-3" />
            </motion.button>
          )}
        </form>


        <div className="mt-6 text-center pt-4 border-t-2 border-black">
          <p className="text-xs font-bold text-black">
            ALREADY HAVE AN ACCOUNT?{' '}
            <Link
              to="/login"
              className="bg-[#A855F7] text-white px-2 py-0.5 border-2 border-black font-black hover:bg-[#9333ea] transition-colors inline-block ml-1"
            >
              LOG IN
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;