
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  ArrowRight,
  Search,
  UserRound,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchBooks } from '../store/booksSlice.js';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Books state
  const {
    loading,
    error,
  } = useSelector((state) => state.books);

  // Authentication state
  const {
    isAuthenticated,
    accessToken,
    user,
  } = useSelector((state) => state.auth);

  // Check whether the user is authenticated
  const loggedIn = Boolean(
    isAuthenticated || accessToken
  );

  const handleSearch = async (e) => {
    e.preventDefault();

    // Require login before searching
    if (!loggedIn) {
      setAuthMessage(
        'Please log in or create an account before searching books.'
      );
      return;
    }


    if (!searchTerm.trim()) {
      setAuthMessage('Please enter a book title or genre.');
      return;
    }

    setAuthMessage('');

    try {

      await dispatch(
        searchBooks(searchTerm.trim())
      ).unwrap();

      navigate('/books');
    } catch (err) {
      console.error('Book search failed:', err);
    }
  };


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    if (authMessage) {
      setAuthMessage('');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0, rotate: -12 },
    visible: {
      scale: 1,
      rotate: -6,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 12,
      },
    },
  };

  return (
    <section className="relative min-h-screen w-full bg-[#FFF4E0] text-black font-sans overflow-hidden border-b-4 border-black px-4 py-10 md:py-20 flex flex-col justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start gap-6"
        >
          {/* Category Tag */}
          <motion.div variants={itemVariants}>
            <span className="inline-block bg-[#FFD93D] text-black font-black uppercase text-xs md:text-sm px-4 py-1.5 border-2 md:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] tracking-widest">
              Stop Reading Garbage Books
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase leading-[0.95] tracking-tight"
          >
            Find Your Next <br />

            <span className="relative inline-block bg-[#A855F7] text-white px-3 py-1 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] my-2 -rotate-1">
              Obsession
            </span>{' '}
            Faster.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl font-bold text-black/90 max-w-xl leading-snug"
          >
            Start Reading Now! Enter which kind of book you want to read.
          </motion.p>

          {/* Search Form */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-lg mt-2"
          >
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-3 p-2 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus-within:translate-x-1 focus-within:translate-y-1 focus-within:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <div className="flex items-center flex-1 px-2 gap-2">
                <Search className="w-5 h-5 text-black shrink-0 stroke-3" />

                <input
                  type="text"
                  name="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="History Books"
                  aria-label="Search books"
                  className="w-full bg-transparent font-bold placeholder:text-black/50 text-black focus:outline-none text-base py-2"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="bg-[#FF6B6B] hover:bg-[#ff5252] disabled:opacity-50 text-black font-black uppercase px-6 py-3 border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 text-base shrink-0 cursor-pointer"
              >
                {loading ? 'Searching...' : 'Find'}

                {!loading && (
                  <ArrowRight className="w-5 h-5 stroke-3" />
                )}
              </motion.button>
            </form>

            {/* Login / Signup Message */}
            {authMessage && (
              <div
                role="alert"
                className="mt-4 p-4 bg-[#FFD93D] border-4 border-black font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <p>{authMessage}</p>

                {!loggedIn && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 bg-[#FF6B6B] px-3 py-2 border-2 border-black font-black hover:bg-[#ff5252]"
                    >
                      Log In <ArrowRight size={16} />
                    </Link>

                    <Link
                      to="/signup"
                      className="inline-flex items-center gap-2 bg-[#A855F7] text-white px-3 py-2 border-2 border-black font-black hover:bg-[#9333ea]"
                    >
                      <UserRound size={16} />
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* API Search Error */}
            {error && (
              <p
                role="alert"
                className="text-red-600 font-bold mt-3 text-sm"
              >
                {typeof error === 'string'
                  ? error
                  : 'Unable to search books. Please try again.'}
              </p>
            )}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t-4 border-black w-full"
          >
            <div className="font-bold text-sm">
              <span className="font-black underline decoration-4 decoration-[#FFD93D]">
                7000+
              </span>{' '}
              books are available.
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0"
        >
          {/* Main Card */}
          <div className="relative w-full max-w-md bg-[#A855F7] border-4 border-black p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-2 hover:rotate-0 transition-transform duration-300">

            {/* Badge */}
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="absolute -top-6 -right-6 bg-[#FFD93D] text-black font-black border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 text-xs uppercase tracking-wider flex items-center gap-1"
            >
              <BookOpen className="w-4 h-4" />
              Read Daily!
            </motion.div>

            {/* Book Graphic */}
            <div className="bg-white border-4 border-black p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center">
              <div className="w-full h-56 md:h-64 bg-[#FF9F43] border-4 border-black flex flex-col justify-between p-4 relative overflow-hidden group">

                {/* Decorative stripes */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_50%,#000_50%,#000_75%,transparent_75%,transparent)] bg-size-[:16px_16px]" />

                <div className="flex justify-between items-start z-10">
                  <span className="bg-black text-white font-black text-xs px-2 py-1 uppercase">
                    Sci-Fi
                  </span>

                  <span className="bg-[#FF6B6B] text-black font-black text-xs px-2 py-1 border-2 border-black">
                    9.8/10
                  </span>
                </div>

                <div className="z-10 bg-white border-2 border-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="font-black text-xl leading-none uppercase">
                    Neuromancer
                  </h3>

                  <p className="font-bold text-xs text-black/70 mt-1">
                    William Gibson
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendation Details */}
            <div className="bg-[#FFFDF5] border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
              <div className="flex items-center justify-between border-b-2 border-black pb-2">
                <span className="font-black text-xs uppercase tracking-wider">
                  Why You'll Love It
                </span>

                <span className="bg-[#6BCB77] border-2 border-black text-[10px] font-black px-2 py-0.5 uppercase">
                  Match 99%
                </span>
              </div>

              <p className="font-bold text-xs leading-relaxed text-black/80">
                Gritty neon aesthetic, high-stakes hacking, and zero fluff.
                Perfect if you enjoyed Blade Runner or Dark Matter.
              </p>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    if (!loggedIn) {
                      setAuthMessage(
                        'Please log in or sign up before adding books to your stack.'
                      );
                      return;
                    }

                    navigate('/books');
                  }}
                  className="flex-1 bg-[#FF6B6B] hover:bg-[#ff5252] text-black font-black text-xs uppercase py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                >
                  Add To Stack
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/books')}
                  className="bg-white hover:bg-gray-100 text-black font-black text-xs uppercase px-3 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;