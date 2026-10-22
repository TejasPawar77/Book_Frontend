import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { getBookInfo } from "./getBookInfo";
import BookCard from "./BookCard";
import BookModal from "./BookModal";

export default function Book({ books = [], bookData }) {
  const carouselRef = useRef(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const allBooks = Array.isArray(books) ? books : [];
  const finalBooks = allBooks.length
    ? allBooks
    : bookData
      ? [bookData]
      : [];

  const bookList = finalBooks.map(getBookInfo);

  const scroll = (direction) => {
    carouselRef.current?.scrollBy({
      left: direction * 320,
      behavior: "smooth",
    });
  };

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  if (!bookList.length) {
    return (
      <section className="min-h-75 rounded-3xl bg-[#FFF4E0] p-8 text-center">
        <BookOpen size={48} className="mx-auto mb-4 text-[#A855F7]" />
        <h2 className="text-2xl font-black text-gray-900">No books found!</h2>
        <p className="mt-2 text-gray-600">Search for a book to get started.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full bg-[#FFF4E0] px-6 py-10 sm:px-8 lg:px-28">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-sm font-bold uppercase tracking-widest text-[#A855F7]">
            Your next favourite
          </p>
          <h1 className="text-3xl font-black text-gray-900 sm:text-4xl">
            Discover Books<span className="text-[#A855F7]">.</span>
          </h1>
          <p className="mt-2 text-sm text-gray-600">Find your next great read.</p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous books"
            className="flex h-11 w-11 items-center justify-center border border-[#E8DFF5] bg-white text-gray-800 shadow-sm transition hover:bg-[#FFD93D]"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next books"
            className="flex h-11 w-11 items-center justify-center border border-[#E8DFF5] bg-white text-gray-800 shadow-sm transition hover:bg-[#FFD93D]"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Horizontal book cards carousel */}
      <div
        ref={carouselRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 pt-1 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {bookList.map((book, index) => (
          <BookCard
            key={`${book.id || book.title}-${index}`}
            book={book}
            isFavorite={favorites.includes(book.id || book.title)}
            onToggleFavorite={toggleFavorite}
            onSelect={setSelectedBook}
          />
        ))}
      </div>

      {/* Book details popup */}
      <BookModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </section>
  );
}