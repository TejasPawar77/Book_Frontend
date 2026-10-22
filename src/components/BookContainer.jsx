import { useSelector, useDispatch } from 'react-redux';
import { nextBook } from '../store/booksSlice.js';
import Book from './Book';

const BookContainer = () => {
  const dispatch = useDispatch();

  const { searchResults, loading, error } = useSelector(
    (state) => state.books
  );

  if (loading) {
    return (
      <div className="py-12 text-center font-black">
        Loading stack...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center font-bold text-red-500">
        {error}
      </div>
    );
  }

  if (!searchResults.length) return null;

  return (
    <Book
      books={searchResults}
      onNext={() => dispatch(nextBook())}
    />
  );
};

export default BookContainer;
