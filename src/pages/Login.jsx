import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserRound,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { loginUser } from '../store/authSlice';

// 1. Username and password validation
const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'Username is required')
    .max(150, 'Username must be 150 characters or fewer')
    .regex(
      /^[a-zA-Z0-9@.+_-]+$/,
      'Username contains invalid characters'
    ),

  password: z.string().min(1, 'Password is required'),

  remember: z.boolean(),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isLoading = false,
    error = null,
  } = useSelector((state) => state.auth);

  // 2. Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setValidationErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  // 3. Validate and submit login form

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validation = loginSchema.safeParse(formData)

    if (!validation.success) {
      const errors = {}

      validation.error.issues.forEach((issue) => {
        const field = issue.path[0]
        if (!errors[field]) {
          errors[field] = issue.message
        }
      })

      setValidationErrors(errors)
      return
    }

    setValidationErrors({})

    try {
      const result = await dispatch(
        loginUser({
          username: validation.data.username,
          password: validation.data.password,
          remember: validation.data.remember,
        })
      )

      if (loginUser.fulfilled.match(result)) {
        const accessToken =
          result.payload?.access ??
          result.payload?.access_token ??
          result.payload?.accessToken ??
          result.payload?.data?.access ??
          result.payload?.data?.accessToken

        if (accessToken) {
          navigate('/admin', { replace: true })
        } else {
          console.error('Django response:', result.payload)
          setLoginError(
            'Login succeeded, but no access token was returned by Django.'
          )
        }
      } else {
        setLoginError(
          typeof result.payload === 'string'
            ? result.payload
            : 'Login failed. Please check your credentials.'
        )
      }
    } catch (error) {
      console.error('Login error:', error)
      setLoginError('An unexpected error occurred during login.')
    }
  }


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
            Enter your username and password to access your account
          </p>
        </div>

        {/* API / login error */}
        {error && (
          <div
            role="alert"
            className="mb-5 p-3 bg-[#FF6B6B] border-2 border-black font-bold text-xs uppercase text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            {typeof error === 'string'
              ? error
              : 'Login failed. Please check your credentials.'}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="text-xs font-black tracking-wider text-black uppercase"
            >
              Username
            </label>

            <div className="relative flex items-center">
              <UserRound className="absolute left-4 w-5 h-5 text-black stroke-[2.5] pointer-events-none" />

              <input
                id="username"
                name="username"
                type="text"
                placeholder="ENTER YOUR USERNAME"
                value={formData.username}
                onChange={handleChange}
                maxLength={150}
                aria-invalid={!!validationErrors.username}
                aria-describedby={
                  validationErrors.username
                    ? 'username-error'
                    : undefined
                }
                autoComplete="username"
                required
                className="w-full bg-white border-4 border-black pl-12 pr-4 py-3.5 text-base sm:text-sm font-bold placeholder:text-gray-400 focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
            </div>

            {validationErrors.username && (
              <p
                id="username-error"
                role="alert"
                className="text-xs font-bold text-red-600"
              >
                {validationErrors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-xs font-black tracking-wider text-black uppercase"
              >
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
                aria-invalid={!!validationErrors.password}
                aria-describedby={
                  validationErrors.password
                    ? 'password-error'
                    : undefined
                }
                autoComplete="current-password"
                required
                className="w-full bg-white border-4 border-black pl-12 pr-12 py-3.5 text-base sm:text-sm font-bold placeholder:text-gray-400 focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 text-black hover:opacity-70 focus:outline-none"
                aria-label={
                  showPassword ? 'Hide password' : 'Show password'
                }
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <Eye className="w-5 h-5 stroke-[2.5]" />
                )}
              </button>
            </div>

            {validationErrors.password && (
              <p
                id="password-error"
                role="alert"
                className="text-xs font-bold text-red-600"
              >
                {validationErrors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="w-5 h-5 accent-[#FF6B6B] border-2 border-black rounded-none cursor-pointer"
            />

            <label
              htmlFor="remember"
              className="text-xs font-bold text-black select-none cursor-pointer"
            >
              REMEMBER ME ON THIS DEVICE
            </label>
          </div>

          {/* Submit */}
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
                <ArrowRight className="w-5 h-5 stroke-[3]" />
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