import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Wedding date: October 3, 2026 — banquet starts at 7pm
const WEDDING_DATE = new Date("2026-10-03T19:00:00");

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const difference = WEDDING_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

// Animated number component with flip effect
function AnimatedDigit({ value, label }: { value: number; label: string }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const formattedValue = displayValue.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={displayValue}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-charcoal tracking-wider"
          >
            {formattedValue}
          </motion.div>
        </AnimatePresence>
      </div>
      <span className="mt-2 md:mt-3 font-sans text-xs md:text-sm tracking-[0.2em] text-muted uppercase">
        {label}
      </span>
    </div>
  );
}

// Separator dot
function Separator() {
  return (
    <div className="flex flex-col items-center justify-center px-2 md:px-4 lg:px-6 pt-2">
      <motion.div
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col gap-2"
      >
        <span className="w-1 h-1 rounded-full bg-muted" />
        <span className="w-1 h-1 rounded-full bg-muted" />
      </motion.div>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Prevent hydration mismatch
  if (!hasMounted) {
    return (
      <section className="py-16 md:py-24 bg-cream-dark/30">
        <div className="section-container">
          <div className="text-center">
            <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-muted uppercase mb-8">
              Counting down to our special day
            </p>
            <div className="flex justify-center items-start gap-2 md:gap-0">
              <div className="flex flex-col items-center">
                <div className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-charcoal tracking-wider">
                  --
                </div>
                <span className="mt-2 md:mt-3 font-sans text-xs md:text-sm tracking-[0.2em] text-muted uppercase">
                  Days
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-16 md:py-24 bg-cream-dark/30"
    >
      <div className="section-container">
        <div className="text-center">
          {/* Section Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs md:text-sm tracking-[0.3em] text-muted uppercase mb-8 md:mb-12"
          >
            倒数计时
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-start"
          >
            <AnimatedDigit value={timeLeft.days} label="Days" />
            <Separator />
            <AnimatedDigit value={timeLeft.hours} label="Hours" />
            <Separator />
            <AnimatedDigit value={timeLeft.minutes} label="Minutes" />
            <Separator />
            <AnimatedDigit value={timeLeft.seconds} label="Seconds" />
          </motion.div>

          {/* Wedding Date */}
          {/* <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 md:mt-14 font-serif text-lg md:text-xl text-charcoal-light italic"
          >
            April 18, 2026
          </motion.p> */}
        </div>
      </div>
    </motion.section>
  );
}
