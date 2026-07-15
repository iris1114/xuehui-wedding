import { motion } from "framer-motion";
import photo1 from "../assets/1.jpeg";
import photo2 from "../assets/2.jpeg";
import photo3 from "../assets/3.jpeg";
import photo4 from "../assets/4.jpeg";
import photo5 from "../assets/5.jpeg";

// Banner photo used for the full-bleed parallax band
const bannerPhoto = photo3;

// Remaining photos shown in the grid
const gridPhotos = [photo1, photo2, photo4, photo5];

export default function Gallery() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
      id="gallery"
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Festive gold watermark accent */}
      <span
        aria-hidden
        className="watermark-xi pointer-events-none absolute -top-10 -right-16 text-[14rem] md:text-[20rem] opacity-[0.15] rotate-6 select-none"
      >
        囍
      </span>

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-sans text-md md:text-sm tracking-[0.3em] text-muted uppercase mb-4">
            Our Moments
          </p>
          <h2 className="font-serif text-4xl  md:text-5xl font-light text-charcoal">
            美好时刻
          </h2>
          <div className="decorative-line mt-6" />
        </motion.div>
      </div>

      {/* Parallax Banner - background-attachment: fixed on desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative w-full h-[50vh] md:h-[65vh] my-12 md:my-16 bg-center bg-cover bg-scroll md:bg-fixed"
        style={{ backgroundImage: `url(${bannerPhoto})` }}
      >
        {/* Overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/15 to-charcoal/40" />

        {/* Gold ornamental frame */}
        <div
          aria-hidden
          className="absolute inset-4 md:inset-8 border border-gold/50"
        />

        {/* Centered content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="watermark-xi text-4xl md:text-4xl  md:text-5xl  mb-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
          >
            囍
          </motion.span>
          <p className="font-script text-2xl md:text-3xl text-cream mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
            Yi Kai &amp; Xue Hui
          </p>
          <p className="font-sans text-md md:text-sm tracking-[0.35em] text-cream/85 uppercase">
            执子之手 · 与子偕老
          </p>
        </div>
      </motion.div>

      {/* Photo Grid */}
      <div className="section-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-3 md:gap-6 max-w-3xl mx-auto"
        >
          {gridPhotos.map((src, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden border border-gold/30 bg-white/40 p-1.5"
            >
              <div className="overflow-hidden">
                <img
                  src={src}
                  alt="Yi Kai & Xue Hui"
                  loading="lazy"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
