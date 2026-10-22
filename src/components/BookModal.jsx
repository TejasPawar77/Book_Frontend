import { Star, X } from "lucide-react";
import { imageUrl } from "./getBookInfo";

export default function BookModal({ book, onClose }) {
  if (!book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={book.title}
        className="relative flex max-h-[85vh] w-full max-w-lg gap-5 overflow-y-auto rounded-3xl border border-[#E8DFF5] bg-[#FFF4E0] p-6 shadow-2xl max-sm:flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6B6B] text-white transition hover:opacity-80"
        >
          <X size={20} />
        </button>

        {book.image && (
          <img
            src={imageUrl(book.image)}
            alt={book.title}
            className="h-52 w-36 shrink-0 rounded-xl object-cover max-sm:mx-auto"
          />
        )}

        <div className="min-w-0 pt-8">
          <h2 className="text-2xl font-black text-gray-900">{book.title}</h2>
          <p className="mt-2 text-sm text-gray-600">
            By {book.authors.join(", ")}
          </p>

          {book.rating !== null && (
            <p className="mt-3 flex items-center gap-2 font-bold">
              <Star size={18} fill="#FFD93D" className="text-amber-600" />
              {book.rating.toFixed(1)}
            </p>
          )}

          <p className="mt-4 whitespace-pre-line text-sm leading-6 text-gray-700">
            {book.description}
          </p>

          {book.link && (
            <a
              href={book.link}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block rounded-xl bg-[#FFD93D] px-5 py-2.5 font-bold text-gray-900 transition hover:opacity-80"
            >
              Explore Book →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}