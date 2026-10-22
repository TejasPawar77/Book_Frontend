import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Globe, MessageCircle, Share2, Send } from 'lucide-react';

const Footer = () => {

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com',
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com',
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      name: 'Discord',
      href: 'https://discord.com',
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full bg-[#FFFDF5] text-black font-mono border-t-4 border-black p-6 md:p-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">

        {/* Brand & Newsletter Section (Cols 1-6) */}
        <div className="md:col-span-6 flex flex-col justify-between border-4 border-black bg-[#A855F7] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div>
            <div className="inline-block bg-black text-white px-3 py-1 font-bold text-sm mb-4 border-2 border-black">
              STAY IN THE LOOP
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 uppercase">
              SHARE YOUR FEEDBACK.
            </h2>
            <p className="text-sm font-semibold mb-6">
              Your opinion will increase our confidence to upgrade this Application.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-stretch gap-3 w-full max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL..."
              className="w-full bg-white border-4 border-black px-5 py-3.5 text-base sm:text-sm font-bold placeholder:text-gray-500 focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
              required
            />

            <motion.button
              whileHover={{ x: -2, y: -2 }}
              whileTap={{ x: 2, y: 2 }}
              type="submit"
              className="w-full bg-[#FF5757] text-white border-4 border-black px-4 py-3.5 text-sm font-extrabold flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none cursor-pointer select-none"
            >
              <span>SUBSCRIBE</span>
              <ArrowRight className="w-5 h-5 stroke-3" />
            </motion.button>
          </form>
        </div>

        {/* Quick Links (Cols 7-9) */}
        <div className="md:col-span-3 border-4 border-black bg-[#7ED957] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-extrabold border-b-4 border-black pb-2 mb-4 uppercase">
              NAVIGATION
            </h3>
            <ul className="space-y-3 font-bold text-sm">
              {['Home', 'Books', 'About Us'].map((item) => (
                <motion.li key={item} whileHover={{ x: 6 }}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-2 hover:underline">
                    <span className="w-2 h-2 bg-black inline-block"></span>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Socials Icons */}
        <div className="md:col-span-3 border-4 border-black bg-[#FF6B6B] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-extrabold border-b-4 border-black pb-2 mb-4 uppercase">
              SOCIALS
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white text-black border-3 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.75 hover:translate-y-0.75 transition-all flex items-center justify-center"
                >
                  {social.svg}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-black font-bold text-xs">
            <p>BUILT WITH LOVE</p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t-4 border-black pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-bold">
        <div className="bg-black text-white px-4 py-2 border-2 border-black">
          © {new Date().getFullYear()} BRUTAL.IO — ALL RIGHTS RESERVED.
        </div>

        <div className="flex items-center gap-2 bg-[#00BF63] px-4 py-2 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <span>CREATED BY</span>
          <Heart className="w-4 h-4 fill-black text-black" />
          <span>TEJAS PAWAR</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;