import { motion } from 'framer-motion';

const SocialProof = ({ itemVariants }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex items-center gap-4 mt-4 pt-4 border-t-4 border-black w-full"
    >
      <div className="font-bold text-sm">
        <span className="font-black underline decoration-4 decoration-[#FFD93D]">
          7000+
        </span>{' '}
        books are available.
      </div>
    </motion.div>
  );
};

export default SocialProof;