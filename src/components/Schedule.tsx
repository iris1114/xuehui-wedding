import { motion } from "framer-motion";

interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  icon: string;
}

const scheduleData: ScheduleEvent[] = [
  {
    time: "7:00 PM",
    title: "自由餐喜宴",
    description: "Wedding Buffet",
    icon: "🍽️",
  },
  {
    time: "8:00 PM",
    title: "敬茶仪式",
    description: "Traditional Tea Ceremony",
    icon: "🍵",
  },
];

// Timeline connector line
function TimelineConnector({ isLast }: { isLast: boolean }) {
  if (isLast) return null;

  return (
    <div className="absolute left-6 md:left-8 top-14 w-px h-full bg-muted-light" />
  );
}

// Schedule card component
function ScheduleCard({
  event,
  index,
  isLast,
}: {
  event: ScheduleEvent;
  index: number;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="relative pl-16 md:pl-20 pb-10 md:pb-14 last:pb-0"
    >
      {/* Timeline Connector */}
      <TimelineConnector isLast={isLast} />

      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
        className="absolute left-3 md:left-5 top-1 w-6 h-6 md:w-7 md:h-7 rounded-full bg-cream border border-muted flex items-center justify-center"
      >
        <span className="text-xs">{event.icon}</span>
      </motion.div>

      {/* Card Content */}
      <div className="bg-white/40 border border-muted-light/50 p-5 md:p-6 transition-all duration-300 hover:bg-white/60 hover:shadow-sm">
        {/* Time */}
        <span className="font-sans text-xs tracking-[0.2em] text-muted uppercase">
          {event.time}
        </span>

        {/* Title */}
        <h3 className="font-serif text-xl md:text-2xl text-charcoal mt-2 mb-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-sm text-charcoal-light leading-relaxed">
          {event.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Schedule() {
  return (
    <section id="schedule" className="py-16 md:py-24 lg:py-32">
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
            流程
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-charcoal">
            Schedule
          </h2>
          <p className="font-serif text-base md:text-lg text-charcoal-light mt-4">
            03 / 10 / 2026
          </p>
          <p className="font-sans text-sm text-muted mt-1">农历八月廿三</p>
          <div className="decorative-line mt-6" />
        </motion.div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto">
          {scheduleData.map((event, index) => (
            <ScheduleCard
              key={event.time}
              event={event}
              index={index}
              isLast={index === scheduleData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
