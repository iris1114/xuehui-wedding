import { motion } from "framer-motion";

const DRIVE_UPLOAD_URL =
  "https://drive.google.com/drive/folders/1cxpHsMQtcvtENaXvW9qPaq-2xjml-rnY";

// Camera / Photo icon
function CameraIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

// External link icon
function ExternalLinkIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

export default function SharePhotos() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <section id="sharephotos" className="py-16 md:py-24 lg:py-32 bg-cream">
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
            Capture the Day
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-charcoal">
            Share Your Photos
          </h2>
          <div className="decorative-line mt-6" />
        </motion.div>

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6 md:mb-8"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-cream-dark/50 flex items-center justify-center">
              <CameraIcon className="w-7 h-7 md:w-8 md:h-8 text-accent" />
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="font-sans text-charcoal-light text-sm md:text-base leading-relaxed mb-2"
          >
            当天的笑容与感动，我们都想好好收藏。
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="font-sans text-charcoal-light text-sm md:text-base leading-relaxed mb-8 md:mb-10"
          >
            If you took photos at our celebration, we’d love to have them. We’ll
            treasure every moment you captured.
          </motion.p>

          <motion.div variants={itemVariants}>
            <a
              href={DRIVE_UPLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-4 text-sm md:text-base"
            >
              <span>Upload to Google Drive</span>
              <ExternalLinkIcon className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-6 font-sans text-xs text-muted"
          >
            Click the button above to open the folder, then drag and drop your
            photos to upload.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
