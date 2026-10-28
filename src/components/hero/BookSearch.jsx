import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

const BookSearch = ({
  itemVariants,
  searchTerm,
  handleSearchChange,
  handleSearch,
  loading,
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className="w-full max-w-lg mt-2"
    >
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 p-2 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <div className="flex items-center flex-1 px-2 gap-2">
          <Search className="w-5 h-5 shrink-0" />

          <input
            type="text"
            name="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="History Books"
            aria-label="Search books"
            className="w-full bg-transparent font-bold focus:outline-none py-2"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="bg-[#FF6B6B] px-6 py-3 border-4 border-black font-black uppercase flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Find'}
          {!loading && <ArrowRight className="w-5 h-5" />}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default BookSearch;