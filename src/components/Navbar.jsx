import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    isAuthenticated,
    accessToken,
    user,
    username,
    isStaff,
  } = useSelector((state) => state.auth)

  const loggedIn = Boolean(isAuthenticated || accessToken)

  const displayUsername =
    username ||
    user?.username ||
    user?.user?.username ||
    user?.name ||
    'User'

  const navLinks = [
    {
      name: 'HOME',
      to: '/',
      activeBg: 'bg-[#FFE66D]',
      hoverBg: 'hover:bg-[#FFE66D]',
    },
    {
      name: 'BOOKS',
      to: '/books',
      activeBg: 'bg-[#4ECDC4]',
      hoverBg: 'hover:bg-[#4ECDC4]',
    },
    {
      name: 'ABOUT US',
      to: '/about',
      activeBg: 'bg-[#FF8B14]',
      hoverBg: 'hover:bg-[#FF8B14]',
    },
  ]

  // Show Dashboard only to staff/admin users.
  const visibleNavLinks = isStaff
    ? [
      ...navLinks,
      {
        name: 'DASHBOARD',
        to: '/admin',
        activeBg: 'bg-[#A855F7]',
        hoverBg: 'hover:bg-[#A855F7]',
      },
    ]
    : navLinks

  const handleLogin = () => {
    setIsOpen(false)
    navigate('/login')
  }

  const handleSignup = () => {
    setIsOpen(false)
    navigate('/signup')
  }

  const handleLogout = () => {
    setIsOpen(false)
    dispatch(logout())
    navigate('/login')
  }

  const linkClass = (link) => ({ isActive }) =>
    `inline-block border-2 px-3 py-2 font-bold transition-all ${isActive
      ? `${link.activeBg} border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`
      : `border-transparent ${link.hoverBg}`
    }`

  const AuthButtons = ({ mobile = false }) => {
    if (loggedIn) {
      return (
        <>
          <span
            className={`border-2 border-black bg-[#FFE66D] px-4 py-2 ${mobile ? 'text-center' : ''
              }`}
          >
            HI, {displayUsername}
          </span>

          <motion.button
            type="button"
            onClick={handleLogout}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className="border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            LOG OUT
          </motion.button>
        </>
      )
    }

    return (
      <>
        <motion.button
          type="button"
          onClick={handleLogin}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          className="border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors cursor-pointer"
        >
          LOG IN
        </motion.button>

        <motion.button
          type="button"
          onClick={handleSignup}
          whileHover={{
            x: 2,
            y: 2,
            boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)',
          }}
          whileTap={{
            x: 4,
            y: 4,
            boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)',
          }}
          className="bg-[#A855F7] text-white border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
        >
          GET STARTED
        </motion.button>
      </>
    )
  }

  return (
    <nav className="bg-[#FFFDF5] border-b-4 border-black px-6 py-4 font-mono sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" onClick={() => setIsOpen(false)}>
          <motion.div
            whileHover={{
              x: 2,
              y: 2,
              boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)',
            }}
            whileTap={{
              x: 4,
              y: 4,
              boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)',
            }}
            className="text-2xl font-black tracking-wider uppercase bg-[#FF6B6B] border-2 border-black px-3 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors inline-block"
          >
            Books
          </motion.div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 font-bold text-sm">
          {visibleNavLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={linkClass(link)}
            >
              {({ isActive }) => (
                <motion.span
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className={`block ${isActive ? 'font-black' : ''
                    } `}
                >
                  {link.name}
                </motion.span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden md:flex items-center space-x-4 font-bold text-sm">
          <AuthButtons />
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{
            x: 1,
            y: 1,
            boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)',
          }}
          whileTap={{
            x: 3,
            y: 3,
            boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)',
          }}
          className="md:hidden border-2 border-black p-2 bg-[#FFE66D] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          <svg
            className="w-6 h-6 stroke-black stroke-3"
            fill="none"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </motion.button>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            className="md:hidden overflow-hidden border-2 border-black bg-[#FFFDF5] mt-4 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex flex-col space-y-3 font-bold text-sm">
              {visibleNavLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={linkClass(link)}
                >
                  {link.name}
                </NavLink>
              ))}

              <hr className="border-black border-b-2 my-1" />

              <AuthButtons mobile />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar