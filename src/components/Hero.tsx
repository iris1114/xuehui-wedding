import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import heroImageMobile from "../assets/hero.jpeg";
import heroImagePc from "../assets/hero_pc.jpeg";

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
  const heroImageRef = useRef<HTMLDivElement>(null);
  const welcomeTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        heroImageRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1.1 },
      ).fromTo(
        welcomeTextRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.85 },
        "-=0.4",
      );
      tl.to(
        welcomeTextRef.current,
        {
          y: -6,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        "+=0.4",
      );
    });
    return () => ctx.revert();
  }, []);

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

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Corner Decorations */}
      <CornerDecoration position="top-left" />
      <CornerDecoration position="top-right" />
      <CornerDecoration position="bottom-left" />
      <CornerDecoration position="bottom-right" />

      {/* Hero Image Block - 手机用 hero.jpeg，PC 用 hero_pc.png */}
      <div
        ref={heroImageRef}
        className="relative w-full h-screen flex-shrink-0 overflow-hidden"
      >
        {/* 手机版图片 */}
        <img
          src={heroImageMobile}
          alt="Yi Kai & Xue Hui"
          className="absolute  w-full h-full object-cover object-center md:hidden"
          loading="eager"
          fetchPriority="high"
        />
        {/* PC 版图片 */}
        <img
          src={heroImagePc}
          alt="Yi Kai & Xue Hui"
          className="absolute  w-full h-full object-cover object-center hidden md:block"
          loading="eager"
          fetchPriority="high"
        />
        {/* 渐变让标语在浅色墙面上清晰 */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-cream/55 via-transparent to-transparent pointer-events-none"
          aria-hidden
        />
        {/* Welcome to our wedding - 手机与 PC 上方皆显示 */}
        {/* <div className="absolute inset-0 flex items-start justify-center pt-[40%] sm:pt-[40%] md:pt-30 lg:pt-30 px-4 sm:px-6">
          <p
            ref={welcomeTextRef}
            className="font-script text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl font-semibold text-charcoal text-center drop-shadow-[0_1px_3px_rgba(255,255,255,0.85)] max-w-[90vw]"
          >
            Welcome to our wedding!
          </p>
        </div> */}

        {/* Scroll Indicator - 放在第一屏（hero 图）底部，进站即可看到 */}
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
            <span className="font-sans text-md tracking-widest text-muted uppercase">
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

      {/* Text Content - 保留原本设计 */}
      <div className="relative text-center px-6 py-10 sm:py-12 md:py-16 flex-1 flex flex-col items-center justify-center overflow-hidden">
        {/* Festive gold watermark */}
        <span
          aria-hidden
          className="watermark-xi pointer-events-none absolute inset-0 flex items-center justify-center text-[16rem] sm:text-[20rem] md:text-[26rem] opacity-[0.08] select-none"
        >
          囍
        </span>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10"
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
            className="font-sans text-lg tracking-[0.3em] text-muted uppercase mb-6 md:mb-6"
          >
            诚邀您出席我们的新婚喜宴
          </motion.p>

          {/* Main Names */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-[2.25rem] md:text-4xl  md:text-5xl  lg:text-6xl font-light tracking-wide text-charcoal leading-tight mb-3 md:mb-4"
          >
            <span className="block">怡 凯</span>
            <span className="font-serif text-xl md:text-2xl font-light text-muted my-1 md:my-2 block">
              &
            </span>
            <span className="block">雪 蕙</span>
          </motion.h1>

          {/* Decorative Line */}
          <motion.div
            variants={itemVariants}
            className="w-12 md:w-20 h-px bg-muted mx-auto my-6 md:my-8"
          />

          {/* Date */}
          <motion.div variants={itemVariants} className="space-y-2">
            <p className="font-sans text-lg tracking-[0.4em] text-charcoal-light uppercase">
              星期六
            </p>
            <p className="font-serif text-3xl md:text-3xl tracking-wider text-charcoal">
              03 / 10 / 2026
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
      </div>
    </section>
  );
}
