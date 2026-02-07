import { motion } from "framer-motion";
import heroImage from "../assets/hero.png";

// Decorative SVG ornament
const Ornament = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 200 20"
    className={`w-32 md:w-48 h-auto ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 10 H80 M120 10 H200"
      stroke="currentColor"
      strokeWidth="0.5"
      className="text-muted"
    />
    <circle
      cx="100"
      cy="10"
      r="3"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      className="text-muted"
    />
    <circle
      cx="90"
      cy="10"
      r="1.5"
      fill="currentColor"
      className="text-muted"
    />
    <circle
      cx="110"
      cy="10"
      r="1.5"
      fill="currentColor"
      className="text-muted"
    />
  </svg>
);

// Corner decorative element
const CornerDecoration = ({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) => {
  const rotations = {
    "top-left": 0,
    "top-right": 90,
    "bottom-right": 180,
    "bottom-left": 270,
  };

  const positions = {
    "top-left": "top-6 left-6 md:top-10 md:left-10",
    "top-right": "top-6 right-6 md:top-10 md:right-10",
    "bottom-left": "bottom-6 left-6 md:bottom-10 md:left-10",
    "bottom-right": "bottom-6 right-6 md:bottom-10 md:right-10",
  };

  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      viewBox="0 0 40 40"
      className={`absolute w-8 h-8 md:w-10 md:h-10 ${positions[position]}`}
      style={{ transform: `rotate(${rotations[position]}deg)` }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0 L0 40 M0 0 L40 0"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-muted-light"
      />
    </motion.svg>
  );
};

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  // Hero image animation variants
  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Corner Decorations */}
      <CornerDecoration position="top-left" />
      <CornerDecoration position="top-right" />
      <CornerDecoration position="bottom-left" />
      <CornerDecoration position="bottom-right" />

      {/* Content */}
      <div className="text-center px-6 py-24 md:py-20">
        {/* Hero Image with animations */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="relative mx-auto mb-6 md:mb-8"
        >
          {/* Subtle glow effect behind image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="absolute inset-0 blur-3xl bg-charcoal/30 rounded-full scale-75"
          />

          {/* Floating animation wrapper */}
          {/* <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: 1,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <img
              src={heroImage}
              alt="Yi Kai & Xue Hui"
              className="w-100 h-100 md:w-100 md:h-100 lg:w-100 lg:h-100 object-contain mx-auto"
            />
          </motion.div> */}
        </motion.div>

        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Ornament */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6 md:mb-8"
          >
            <Ornament />
          </motion.div>

          {/* Pre-title */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-xs md:text-sm tracking-[0.3em] text-muted uppercase mb-4 md:mb-6"
          >
            We joyfully invite you to celebrate
          </motion.p>

          {/* Main Names */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-[2.25rem] md:text-5xl lg:text-6xl font-light tracking-wide text-charcoal leading-tight mb-3 md:mb-4"
          >
            <span className="block">YI KAI</span>
            <span className="font-serif text-xl md:text-2xl font-light text-muted my-1 md:my-2 block">
              &
            </span>
            <span className="block">XUE HUI</span>
          </motion.h1>

          {/* Decorative Line */}
          <motion.div
            variants={itemVariants}
            className="w-12 md:w-20 h-px bg-muted mx-auto my-6 md:my-8"
          />

          {/* Date */}
          <motion.div variants={itemVariants} className="space-y-2">
            <p className="font-sans text-xs md:text-sm tracking-[0.4em] text-charcoal-light uppercase">
              Saturday
            </p>
            <p className="font-serif text-xl md:text-3xl tracking-wider text-charcoal">
              18 APRIL 2026
            </p>
          </motion.div>

          {/* Bottom Ornament */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-8 md:mt-12"
          >
            <Ornament />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-sans text-xs tracking-widest text-muted uppercase">
              Scroll
            </span>
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              className="text-muted"
            >
              <rect
                x="1"
                y="1"
                width="14"
                height="22"
                rx="7"
                stroke="currentColor"
                strokeWidth="1"
              />
              <motion.circle
                cx="8"
                cy="8"
                r="2"
                fill="currentColor"
                animate={{ cy: [8, 14, 8] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
