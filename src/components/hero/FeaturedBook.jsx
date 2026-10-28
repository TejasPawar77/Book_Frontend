import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import BookGraphic from './BookGraphic';
import RecommendationDetails from './RecommendationDetails';

const FeaturedBook = ({ loggedIn, setAuthMessage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0"
    >
      <div className="relative w-full max-w-md bg-[#A855F7] border-4 border-black p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-2 hover:rotate-0 transition-transform">
        <div className="absolute -top-6 -right-6 bg-[#FFD93D] border-4 border-black px-4 py-2 font-black text-xs flex items-center gap-1">
          <BookOpen className="w-4 h-4" />
          Read Daily!
        </div>

        <BookGraphic />

        <RecommendationDetails
          loggedIn={loggedIn}
          setAuthMessage={setAuthMessage}
        />
      </div>
    </motion.div>
  );
};

export default FeaturedBook;