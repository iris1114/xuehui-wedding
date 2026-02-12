import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  phone: string;
  guests: string;
  attendance: "yes" | "no" | "";
  notes: string;
}

interface FormErrors {
  name?: string;
  guests?: string;
  attendance?: string;
}

// Google Form Configuration
const GOOGLE_FORM_CONFIG = {
  formUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSc7lIj2YUMRP4Z-uDRibP5sI3jm68IlmixjX44jZf8QDRpV9g/formResponse",
  entries: {
    name: "entry.1061864420",
    attendance: "entry.33636078",
    guests: "entry.39442586",
    phone: "entry.1847150213",
    notes: "entry.1470500087",
  },
};

// Check icon for success
function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

export default function RSVP() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    guests: "1",
    attendance: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "請填寫姓名 / Please enter name";
    }

    if (!formData.attendance) {
      newErrors.attendance = "請選擇 / Please select";
    }

    if (formData.attendance === "yes") {
      const guestsNum = parseInt(formData.guests, 10);
      if (isNaN(guestsNum) || guestsNum < 1) {
        newErrors.guests = "請至少 1 人 / At least 1 guest";
      } else if (guestsNum > 10) {
        newErrors.guests = "最多 10 人 / Max 10 guests";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit to Google Forms
  const submitToGoogleForms = async (): Promise<boolean> => {
    const { formUrl, entries } = GOOGLE_FORM_CONFIG;

    // Build form data for Google Forms
    const googleFormData = new FormData();
    googleFormData.append(entries.name, formData.name);
    googleFormData.append(
      entries.attendance,
      formData.attendance === "yes" ? "參加 Accept" : "無法參加 Decline"
    );

    if (formData.attendance === "yes") {
      googleFormData.append(entries.guests, formData.guests);
    }

    if (formData.phone) {
      googleFormData.append(entries.phone, formData.phone);
    }

    if (formData.notes) {
      googleFormData.append(entries.notes, formData.notes);
    }

    try {
      // Google Forms doesn't support CORS, so we use no-cors mode
      // This means we won't get a response, but the submission will work
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        body: googleFormData,
      });
      return true;
    } catch (error) {
      console.error("Error submitting to Google Forms:", error);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Submit to Google Forms
    await submitToGoogleForms();

    // Since we use no-cors, we assume success
    // Add a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="rsvp" className="py-16 md:py-24 lg:py-32">
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
            期待您的蒞臨
          </p>
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-muted uppercase mb-4">
            We Hope You Can Make It
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-charcoal">
            RSVP
          </h2>
          <div className="decorative-line mt-6" />
        </motion.div>

        {/* Form Container */}
        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <label htmlFor="name" className="form-label">
                    姓名 Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="姓名 / Name"
                    className={`form-input ${
                      errors.name ? "border-error" : ""
                    }`}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-error"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>

                {/* Attendance Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="form-label">是否出席？Attend? *</label>
                  <div className="flex gap-4 mt-2">
                    <label
                      className={`flex-1 flex items-center justify-center gap-2 p-4 border cursor-pointer transition-all duration-300 min-h-[44px] ${
                        formData.attendance === "yes"
                          ? "border-accent bg-accent text-cream"
                          : "border-muted-light hover:border-accent hover:bg-accent/10"
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="yes"
                        checked={formData.attendance === "yes"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="font-sans text-sm tracking-wider">
                        參加 Accept
                      </span>
                    </label>
                    <label
                      className={`flex-1 flex items-center justify-center gap-2 p-4 border cursor-pointer transition-all duration-300 min-h-[44px] ${
                        formData.attendance === "no"
                          ? "border-accent bg-accent text-cream"
                          : "border-muted-light hover:border-accent hover:bg-accent/10"
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="no"
                        checked={formData.attendance === "no"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="font-sans text-sm tracking-wider">
                        無法參加 Decline
                      </span>
                    </label>
                  </div>
                  {errors.attendance && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-error"
                    >
                      {errors.attendance}
                    </motion.p>
                  )}
                </motion.div>

                {/* Number of Guests Field - Only show when attending */}
                <AnimatePresence>
                  {formData.attendance === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label htmlFor="guests" className="form-label">
                        人數 Guests
                      </label>
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className={`form-input ${
                          errors.guests ? "border-error" : ""
                        }`}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "人" : "人"}
                          </option>
                        ))}
                      </select>
                      {errors.guests && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-error"
                        >
                          {errors.guests}
                        </motion.p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 饮食习惯 (Optional) - submitted via phone entry */}
                {formData.attendance === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="phone" className="form-label">
                      飲食習慣 Diet
                    </label>
                    <select
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">請選擇 Select</option>
                      <option value="荤 Meat">荤 Meat</option>
                      <option value="素 Veg">素 Veg</option>
                    </select>
                  </motion.div>
                )}

                {/* Notes Field */}
                {formData.attendance === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <label htmlFor="notes" className="form-label">
                      備註 Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="忌口：牛/羊/海鮮或其他 / Allergies: beef, lamb, seafood, etc."
                      rows={4}
                      className="form-input resize-none"
                    />
                  </motion.div>
                )}
                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="pt-4"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Sending...
                      </motion.span>
                    ) : (
                      "Send RSVP"
                    )}
                  </button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12 md:py-16"
              >
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center"
                >
                  <CheckIcon className="w-8 h-8 text-success" />
                </motion.div>

                {/* Success Message */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-serif text-2xl md:text-3xl text-charcoal mb-4"
                >
                  Thank You!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="font-sans text-charcoal-light"
                >
                  We've received your response.
                  <br />
                  {formData.attendance === "yes"
                    ? `We can't wait to celebrate with you!`
                    : ""}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
