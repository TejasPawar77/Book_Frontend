import { motion } from 'framer-motion';

const HeroContent = ({ itemVariants }) => {
  return (
    <>
      <motion.div variants={itemVariants}>
        <span className="inline-block bg-[#FFD93D] px-4 py-2 border-4 border-black font-black uppercase text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          Stop Reading Garbage Books
        </span>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-6xl md:text-7xl font-black uppercase leading-[0.95]"
      >
        Find Your Next
        <br />
        <span className="inline-block bg-[#A855F7] text-white px-3 py-1 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] my-2">
          Obsession
        </span>{' '}
        Faster.
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-lg md:text-xl font-bold max-w-xl"
      >
        Start Reading Now! Enter which kind of book you want to read.
      </motion.p>
    </>
  );
};

export default HeroContent;