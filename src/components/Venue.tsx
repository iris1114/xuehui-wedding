import { motion } from "framer-motion";
import venueImage from "../assets/venue2.png";

interface VenueInfo {
  name: string;
  address: string;
  googleMapsUrl: string;
}

const venueData: VenueInfo = {
  name: "C You Homestay",
  address:
    "C25, Jalan Bunga Siantan, Taman Plentong Baru, 81750 Masai, Johor Darul Ta'zim",
  googleMapsUrl: "https://share.google/PobGw4lcMQDFVjJor",
};

// Generate Waze URL
function getWazeUrl(address: string): string {
  const encodedAddress = encodeURIComponent(address);
  return `https://waze.com/ul?q=${encodedAddress}`;
}

// Map Pin Icon
function MapPinIcon({ className = "" }: { className?: string }) {
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
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
}

// External Link Icon
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

export default function Venue() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="venue" className="py-16 md:py-24 lg:py-32 bg-cream-dark/30">
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
            地點
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-charcoal">
            The Venue
          </h2>
          <div className="decorative-line mt-6" />
        </motion.div>

        {/* Venue Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto items-center"
        >
          {/* Left Column - Venue Image */}
          {/* <motion.div variants={itemVariants} className="order-2 md:order-1">
            <div className="overflow-hidden ">
              <img
                src={venueImage}
                alt={venueData.name}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div> */}

          {/* Right Column - Venue Details */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 order-1 md:order-2"
          >
            {/* Venue Name */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <MapPinIcon className="w-5 h-5 text-muted" />
                <span className="font-sans text-xs tracking-[0.2em] text-muted uppercase">
                  Location
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">
                {venueData.name}
              </h3>
              <p className="font-sans text-sm text-charcoal-light">
                {venueData.address}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {/* Google Maps Button */}
              <a
                href={venueData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center justify-center gap-2"
              >
                <span>Google Maps</span>
                <ExternalLinkIcon className="w-4 h-4" />
              </a>

              {/* Waze Button */}
              <a
                href={getWazeUrl(venueData.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center justify-center gap-2"
              >
                <span>Waze</span>
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
