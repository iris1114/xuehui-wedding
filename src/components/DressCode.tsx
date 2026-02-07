import { motion } from "framer-motion";

interface ColorSwatch {
  name: string;
  hex: string;
  textDark?: boolean;
}

const earthToneColors: ColorSwatch[] = [
  { name: "Warm Taupe", hex: "#A67B5B" },
  { name: "Dusty Rose", hex: "#C9A9A6" },
  { name: "Sage Green", hex: "#9CAF88" },
  { name: "Champagne", hex: "#D4C4A8", textDark: true },
  { name: "Terracotta", hex: "#C67D5E" },
  { name: "Soft Mocha", hex: "#8B7355" },
];

// Color swatch component
function ColorSwatchCard({
  color,
  index,
}: {
  color: ColorSwatch;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="w-10 h-10 md:w-10 md:h-10 rounded-full shadow-md border-2 border-white/50 mb-3"
        style={{ backgroundColor: color.hex }}
      />
      <span className="font-sans text-xs md:text-sm text-charcoal-light text-center">
        {color.name}
      </span>
    </motion.div>
  );
}

// Dress illustration icons
function DressIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path d="M32 8C32 8 28 12 28 16C28 20 32 22 32 22C32 22 36 20 36 16C36 12 32 8 32 8Z" />
      <path d="M28 22L20 56H44L36 22" />
      <path d="M28 22C28 22 20 24 16 28" />
      <path d="M36 22C36 22 44 24 48 28" />
      <path d="M24 38H40" />
    </svg>
  );
}

function SuitIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path d="M24 12H40V20C40 24 36 28 32 28C28 28 24 24 24 20V12Z" />
      <path d="M24 20L16 56H26L28 32H36L38 56H48L40 20" />
      <path d="M28 32L32 40L36 32" />
      <path d="M30 24H34" />
      <circle cx="32" cy="46" r="1.5" />
      <circle cx="32" cy="52" r="1.5" />
    </svg>
  );
}

export default function DressCode() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="dresscode">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-muted uppercase mb-4">
            What to Wear
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-charcoal">
            Dress Code
          </h2>
          <div className="decorative-line mt-6" />
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto"
        >
          {/* Dress Code Description */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <p className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
              Earth Tones / 大地色系
            </p>
            <p className="font-sans text-sm md:text-base text-charcoal-light leading-relaxed max-w-xl mx-auto">
              We kindly invite you to dress in elegant earth tones to complement
              our celebration.
            </p>
            <p className="font-sans text-sm md:text-base text-charcoal-light leading-relaxed max-w-xl mx-auto">
              诚挚邀请您一起穿大地色系的衣服，与我们共创美好的回忆。
            </p>
          </motion.div>

          {/* Dress Icons */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-8 md:gap-16 mb-12"
          >
            <div className="text-center">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 p-4 rounded-full bg-cream-dark/50 border border-muted-light/50"
              >
                <DressIcon className="w-full h-full text-charcoal-light" />
              </motion.div>
              <span className="font-sans text-xs md:text-sm text-muted tracking-wide uppercase">
                Ladies
              </span>
            </div>
            <div className="text-center">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 p-4 rounded-full bg-cream-dark/50 border border-muted-light/50"
              >
                <SuitIcon className="w-full h-full text-charcoal-light" />
              </motion.div>
              <span className="font-sans text-xs md:text-sm text-muted tracking-wide uppercase">
                Gentlemen
              </span>
            </div>
          </motion.div>

          {/* Color Palette */}
          {/* <motion.div variants={itemVariants}>
            <p className="font-sans text-xs md:text-sm tracking-[0.2em] text-muted uppercase text-center mb-8">
              Suggested Color Palette
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-4">
              {earthToneColors.map((color, index) => (
                <ColorSwatchCard key={color.hex} color={color} index={index} />
              ))}
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}
