import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import myImage from '../assets/My_Image.png';
import {
  Terminal,
  Cloud,
  Code2,
  TrendingUp,
  ArrowUpRight,
  Zap,
  Globe,
  Layers,
  Mail
} from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const popIn = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  }
};

export default function About() {
  const [activeTab, setActiveTab] = useState('ALL');

  const projects = [
    {
      id: 1,
      title: 'Realtime Audio Visualizer Engine',
      category: 'WEBGL',
      desc: 'High-performance audio processing with Web Audio API, Three.js shaders, and custom Framer Motion controls.',
      badgeBg: 'bg-[#FFE600]',
      badgeText: 'WEBGL / THREE.JS'
    },
    {
      id: 2,
      title: 'Autonomous Agent Dashboard',
      category: 'REACT',
      desc: 'Real-time WebSocket monitoring suite for LLM agent workflows with dynamic step visualizers.',
      badgeBg: 'bg-[#35A7FF]',
      badgeText: 'NEXT.JS / WEBSOCKET'
    },
    {
      id: 3,
      title: 'Neo-Brutalist Component System',
      category: 'DESIGN',
      desc: 'Zero-runtime, high-contrast UI kit built for speed, accessibility, and high visual punch.',
      badgeBg: 'bg-[#FF5964]',
      badgeText: 'TAILWIND / RADIX'
    }
  ];

  const filteredProjects =
    activeTab === 'ALL'
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <div className="min-h-screen bg-[#FFF4E0] text-black font-mono p-4 sm:p-8 md:p-2 selection:bg-[#FFE600] selection:text-black">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* HERO SECTION WITH IMAGE */}
        <motion.header
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="border-4 border-black bg-[#A855F7] p-6 sm:p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">


            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block bg-black text-white px-3 py-1 font-bold text-xs sm:text-sm uppercase tracking-widest"
              >
                FULLSTACK_WEB_DEVELOPER
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none"
              >
                <span className="bg-white px-2 border-4 border-black inline-block mt-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  FULL-STACK PYTHON <br />
                  DEVELOPER.<br />
                </span>
              </motion.h1>

              <p className="text-base sm:text-lg font-bold leading-relaxed border-t-4 border-black pt-4">
                Specializing in Python, React, and Web designs.
                Coding innovative idea.
              </p>

              {/* Quick links with Tactile Motion Hover */}
              <div className="flex flex-wrap gap-3 pt-2">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03, x: -2, y: -2 }}
                  whileTap={{ scale: 0.97, x: 2, y: 2 }}
                  className="bg-black text-white px-4 py-2 font-black text-xs sm:text-sm uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:bg-white hover:text-black transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" /> HIRE ME
                </motion.a>

                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.03, x: -2, y: -2 }}
                  whileTap={{ scale: 0.97, x: 2, y: 2 }}
                  className="bg-white text-black px-4 py-2 font-black text-xs sm:text-sm uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#35A7FF] hover:text-white transition-colors flex items-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" /> GITHUB
                </motion.a>

                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.03, x: -2, y: -2 }}
                  whileTap={{ scale: 0.97, x: 2, y: 2 }}
                  className="bg-white text-black px-4 py-2 font-black text-xs sm:text-sm uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FF5964] hover:text-white transition-colors flex items-center gap-2"
                >
                  <LinkedinIcon className="w-4 h-4" /> LINKEDIN
                </motion.a>
              </div>
            </div>

            {/* Right Profile Image Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
                className="relative w-full max-w-xs sm:max-w-sm"
              >
                <div className="border-4 border-black bg-[#00F5D4] p-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <div className="border-4 border-black overflow-hidden aspect-square">
                    <img
                      src={myImage}
                      alt="Developer"
                    />
                  </div>
                  <div className="mt-3 bg-white border-2 border-black p-2 text-center font-black text-3XL uppercase tracking-wider">
                    TEJAS PAWAR
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* MANIFESTO / PHILOSOPHY GRID */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black uppercase bg-black text-white px-4 py-2 inline-block border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            FRONTEND
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div
              variants={popIn}
              whileHover={{ y: -6 }}
              className="border-4 border-black bg-[#FF5964] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-black block mb-2">01.</span>
                <h3 className="text-xl font-black uppercase mb-3 border-b-2 border-black pb-2">
                  60 FPS OR NOTHING
                </h3>
                <p className="font-medium text-sm leading-snug">
                  Animations should feel snappy and visceral. Jank is a bug. Optimized state management and light render trees drive every view.
                </p>
              </div>
              <div className="mt-6 pt-2 border-t-2 border-black font-black text-xs uppercase">
                TARGET: PERFORMANCE
              </div>
            </motion.div>

            <motion.div
              variants={popIn}
              whileHover={{ y: -6 }}
              className="border-4 border-black bg-[#35A7FF] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-black block mb-2">02.</span>
                <h3 className="text-xl font-black uppercase mb-3 border-b-2 border-black pb-2">
                  STARK INTENTIONALITY
                </h3>
                <p className="font-medium text-sm leading-snug">
                  Bold typography, distinct borders, and dynamic colors guide the eye. Design shouldn't hide behind muted opacity.
                </p>
              </div>
              <div className="mt-6 pt-2 border-t-2 border-black font-black text-xs uppercase">
                STYLE: NEO-BRUTALISM
              </div>
            </motion.div>

            <motion.div
              variants={popIn}
              whileHover={{ y: -6 }}
              className="border-4 border-black bg-[#38B000] text-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-black block mb-2">03.</span>
                <h3 className="text-xl font-black uppercase mb-3 border-b-2 border-white pb-2">
                  CLEAN COMPONENT ARCH
                </h3>
                <p className="font-medium text-sm leading-snug">
                  Predictable props, modular structures, and zero bloated bundles ensure fast loading times and robust scalability.
                </p>
              </div>
              <div className="mt-6 pt-2 border-t-2 border-white font-black text-xs uppercase">
                STACK: JS + REACT
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* CORE TECH STACK */}
        <section className="border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2 inline-block">
            DEV STACK
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {[
              { icon: Code2, title: 'Core', text: 'React 19, JavaScript (ESNext), Next.js App Router, JSX' },
              { icon: Layers, title: 'Styling & UI', text: 'Tailwind CSS, Framer Motion, Radix UI, Lucide Icons' },
              { icon: Zap, title: 'State & Data', text: 'Zustand, React Query (TanStack), Redux Toolkit, Axios' },
              { icon: Globe, title: 'Graphics & 3D', text: 'Three.js, React Three Fiber, WebGL, Canvas API' },
              { icon: Terminal, title: 'Tooling', text: 'Vite, Vitest, Cypress, ESLint, Prettier, Docker' },
              { icon: Cloud, title: 'Deployment', text: 'Vercel, AWS S3 / CloudFront, Netlify, Cloudflare Workers' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={popIn}
                whileHover={{ scale: 1.02 }}
                className="border-2 border-black p-4 bg-[#F4F4F0] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center gap-2 mb-2 font-black text-base uppercase">
                  <item.icon className="w-5 h-5 stroke-[2.5]" /> {item.title}
                </div>
                <p className="text-sm font-semibold">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* PERFORMANCE LOG TABLE */}
        <section className="border-4 border-black bg-[#9B5DE5] p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-8 h-8 stroke-3" />
            <h2 className="text-2xl font-black uppercase text-white">
              BENCHMARKS & METRICS
            </h2>
          </div>

          <div className="overflow-x-auto border-4 border-black bg-white text-black">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-4 border-black bg-[#FFE600] font-black text-sm uppercase">
                  <th className="p-3 border-r-2 border-black">Target Optimization</th>
                  <th className="p-3">Measured Result</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black text-xs sm:text-sm font-bold">
                <tr>
                  <td className="p-3 border-r-2 border-black bg-[#F4F4F0]">Lighthouse Performance Audit</td>
                  <td className="p-3">Consistently scored <span className="bg-[#FFE600] px-1 border border-black">98-100</span> on Core Web Vitals.</td>
                </tr>
                <tr>
                  <td className="p-3 border-r-2 border-black bg-[#F4F4F0]">Bundle Size Reduction</td>
                  <td className="p-3">Tree-shaken dependencies resulting in <span className="bg-[#FFE600] px-1 border border-black">&lt;45KB</span> first-load JS.</td>
                </tr>
                <tr>
                  <td className="p-3 border-r-2 border-black bg-[#F4F4F0]">Interaction to Next Paint (INP)</td>
                  <td className="p-3">Sub-<span className="bg-[#FFE600] px-1 border border-black">50ms</span> response times on heavy dashboard state updates.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FEATURED PROJECTS WITH ANIMATED FILTERING */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-black uppercase bg-black text-white px-4 py-2 inline-block border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              FEATURED WORKS
            </h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {['ALL', 'WEBGL', 'REACT', 'DESIGN'].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 font-black text-xs border-2 border-black transition-all ${activeTab === tab
                    ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-black hover:bg-gray-200'
                    }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((p) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ x: -4, y: -4 }}
                  key={p.id}
                  className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-black uppercase mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs font-semibold text-gray-800 mb-4 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 font-black text-xs ${p.badgeBg} text-black px-2 py-1 border border-black w-max`}
                  >
                    {p.badgeText} <ArrowUpRight className="w-3 h-3" />
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

      </div>
    </div>
  );
}