import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { searchBooks } from '../store/booksSlice.js';

import HeroContent from './hero/HeroContent';
import BookSearch from './hero/BookSearch';
import AuthMessage from './hero/AuthMessage';
import SocialProof from './hero/SocialProof';
import FeaturedBook from './hero/FeaturedBook';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.books
  );

  const { isAuthenticated, accessToken } = useSelector(
    (state) => state.auth
  );

  const loggedIn = Boolean(isAuthenticated || accessToken);

  const handleSearch = async (e) => {
    e.preventDefault();

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
      await dispatch(searchBooks(searchTerm.trim())).unwrap();
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

  return (
    <section className="relative min-h-screen w-full bg-[#FFF4E0] text-black font-sans overflow-hidden border-b-4 border-black px-4 py-10 md:py-20 flex flex-col justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start gap-6"
        >
          <HeroContent itemVariants={itemVariants} />

          <BookSearch
            itemVariants={itemVariants}
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            handleSearch={handleSearch}
            loading={loading}
          />

          <AuthMessage
            authMessage={authMessage}
            loggedIn={loggedIn}
          />

          {error && (
            <p role="alert" className="text-red-600 font-bold mt-3 text-sm">
              {typeof error === 'string'
                ? error
                : 'Unable to search books. Please try again.'}
            </p>
          )}

          <SocialProof itemVariants={itemVariants} />
        </motion.div>

        {/* Right column */}
        <FeaturedBook
          loggedIn={loggedIn}
          setAuthMessage={setAuthMessage}
        />
      </div>
    </section>
  );
};

export default Hero;