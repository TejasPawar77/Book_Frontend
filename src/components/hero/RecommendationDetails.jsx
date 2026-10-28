import { useNavigate } from 'react-router-dom';

const RecommendationDetails = ({
  loggedIn,
  setAuthMessage,
}) => {
  const navigate = useNavigate();

  const handleAddToStack = () => {
    if (!loggedIn) {
      setAuthMessage(
        'Please log in or sign up before adding books to your stack.'
      );
      return;
    }

    navigate('/books');
  };

  return (
    <div className="bg-[#FFFDF5] border-4 border-black p-4 space-y-3">
      <h3 className="font-black text-sm uppercase">
        Designing Data-Intensive Applications
      </h3>

      <p className="text-xs font-bold text-black/70">
        Martin Kleppmann
      </p>

      <p className="font-bold text-xs leading-relaxed text-black/80">
        Learn how reliable, scalable, and maintainable data systems
        work. Explore databases, distributed systems, replication,
        partitioning, transactions, and stream processing.
      </p>

      <div className="flex flex-wrap gap-2">
        {['Databases', 'Distributed Systems', 'Backend'].map(
          (topic) => (
            <span
              key={topic}
              className="bg-[#FFD93D] border-2 border-black px-2 py-1 text-[10px] font-black uppercase"
            >
              {topic}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default RecommendationDetails;