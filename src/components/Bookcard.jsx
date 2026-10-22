import { Star, Heart, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { imageUrl } from "./getBookInfo";

export default function BookCard({ book, isFavorite, onToggleFavorite, onSelect }) {
  const bookId = book.id || book.title;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex w-70 shrink-0 snap-start flex-col overflow-hidden rounded-xl border-3 border-black bg-[#FFFDF5] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:w-76.25 font-mono"
    >
      {/* Cover */}
      <motion.button
        type="button"
        onClick={() => onSelect(book)}
        aria-label={`View ${book.title} details`}
        whileHover={{ x: 2, y: 2, boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)' }}
        whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)' }}
        className="relative mb-4 block w-full overflow-hidden rounded-lg border-2 border-black bg-[#FFE66D] text-left shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
      >
        <div className="aspect-video w-full">
          {book.image ? (
            <img
              src={imageUrl(book.image)}
              alt={book.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
              <BookOpen size={42} className="text-black stroke-[2.5]" />
              <span className="line-clamp-2 font-black text-black">
                {book.title}
              </span>
            </div>
          )}
        </div>
      </motion.button>

      {/* Favorite Button */}
      <motion.button
        type="button"
        onClick={() => onToggleFavorite(bookId)}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={isFavorite}
        whileHover={{ scale: 1.1, boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)' }}
        whileTap={{ scale: 0.95, boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)' }}
        className="absolute right-7 top-7 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-[#FF6B6B] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer select-none"
      >
        <Heart size={20} fill={isFavorite ? "black" : "none"} strokeWidth={2.5} />
      </motion.button>

      {/* Book Information */}
      <button
        type="button"
        onClick={() => onSelect(book)}
        className="flex flex-1 flex-col text-left cursor-pointer"
      >
        <h2 className="line-clamp-2 min-h-14 text-xl font-black leading-7 text-black hover:underline">
          {book.title}
        </h2>
        <p className="mt-1 line-clamp-1 text-sm font-bold text-gray-700">
          {book.authors.join(", ")}
        </p>
      </button>

      {/* Rating and Category */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-md border-2 border-black bg-[#4ECDC4] px-2.5 py-1 text-xs font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          BOOK
        </span>

        {book.rating !== null && (
          <span className="flex items-center gap-1 rounded-md border-2 border-black bg-[#FFE66D] px-2.5 py-1 text-xs font-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Star size={14} fill="black" strokeWidth={2} className="text-black" />
            {book.rating.toFixed(1)}
          </span>
        )}
      </div>

      {/* Action Button */}
      <motion.button
        type="button"
        onClick={() => onSelect(book)}
        whileHover={{ x: 2, y: 2, boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)' }}
        whileTap={{ x: 4, y: 4, boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)' }}
        className="mt-5 w-full  border-2 border-black bg-[#A855F7] px-4 py-2.5 font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer select-none"
      >
        VIEW DETAILS →
      </motion.button>
    </motion.article>
  );
}