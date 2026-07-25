"use client";

import { AmbientBackground } from "@/components/ambient-background";
import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { useState, type FormEvent } from "react";

const fieldClasses =
  "peer min-h-14 w-full rounded-xl border border-white/10 bg-[#0d131e]/90 px-3 pb-2 pt-6 text-white caret-indigo-300 transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-transparent hover:border-white/20 focus:border-indigo-400 focus:bg-[#101827] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.14)] focus:outline-none";

const labelClasses =
  "pointer-events-none absolute left-3 top-2 text-xs font-medium text-slate-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-300";

type SubmitStatus = "idle" | "loading" | "success" | "error";

interface FormDataState {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  message: string;
  heardAbout: string;
  consent: boolean;
}

const initialFormState: FormDataState = {
  firstName: "",
  lastName: "",
  email: "",
  companyName: "",
  message: "",
  heardAbout: "",
  consent: false,
};

const headingVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

const wordVariants: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ContactPage() {
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState<FormDataState>(initialFormState);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setErrorMessage("Please enter your first name.");
      return false;
    }
    if (!formData.lastName.trim()) {
      setErrorMessage("Please enter your last name.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (!formData.message.trim()) {
      setErrorMessage("Please enter your message.");
      return false;
    }
    if (!formData.consent) {
      setErrorMessage("Please agree to the privacy consent checkbox to submit.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

    const payload = {
      access_key: accessKey,
      subject: `New Contact Form Submission — Agency Website`,
      from_name: "Agency Website Contact Page",
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email: formData.email.trim(),
      replyto: formData.email.trim(),
      company: formData.companyName.trim() || "N/A",
      message: formData.message.trim(),
      heard_about: formData.heardAbout.trim() || "N/A",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setSuccessMessage("Thanks! We'll get back to you shortly.");
        setFormData(initialFormState);
      } else {
        throw new Error(result.message || "Form submission failed.");
      }
    } catch (err: unknown) {
      setStatus("error");
      const errText =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(errText);
    }
  };

  const titleWords = "Your Solution Starts Here — Contact Us Now".split(" ");

  return (
    <>
      <AmbientBackground />
      <Header />
      <main className="relative z-10 py-16 sm:py-24">
        <Container>
          {/* Section 1 — Hero */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm font-medium text-indigo-300 uppercase tracking-widest">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-white">Contact Us</span>
            </div>

            <motion.h1
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {titleWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom"
                >
                  <motion.span
                    variants={wordVariants}
                    className={`inline-block ${
                      word.toLowerCase().includes("solution") ||
                      word.toLowerCase().includes("now")
                        ? "text-indigo-400"
                        : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 max-w-2xl text-lg text-slate-300 leading-relaxed"
            >
              Have questions or need assistance? Our team is here to help — reach out today and let&apos;s create something great together!
            </motion.p>
          </div>

          {/* Section 2 — Form + FAQ 2-Column Grid */}
          <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl border border-white/10 bg-[#111722]/90 p-8 shadow-2xl shadow-black/20 sm:p-10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name & Last Name */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="relative">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder=" "
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className={fieldClasses}
                    />
                    <label htmlFor="firstName" className={labelClasses}>
                      First Name *
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder=" "
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className={fieldClasses}
                    />
                    <label htmlFor="lastName" className={labelClasses}>
                      Last Name *
                    </label>
                  </div>
                </div>

                {/* Email & Company Name */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder=" "
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={fieldClasses}
                    />
                    <label htmlFor="email" className={labelClasses}>
                      Email Address *
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      placeholder=" "
                      value={formData.companyName}
                      onChange={handleChange}
                      className={fieldClasses}
                    />
                    <label htmlFor="companyName" className={labelClasses}>
                      Company Name
                    </label>
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder=" "
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="peer min-h-32 w-full rounded-xl border border-white/10 bg-[#0d131e]/90 px-3 pb-2 pt-6 text-white caret-indigo-300 transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-transparent hover:border-white/20 focus:border-indigo-400 focus:bg-[#101827] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.14)] focus:outline-none"
                  />
                  <label htmlFor="message" className={labelClasses}>
                    Your Message *
                  </label>
                </div>

                {/* How did you hear about us */}
                <div className="relative">
                  <input
                    id="heardAbout"
                    name="heardAbout"
                    type="text"
                    placeholder=" "
                    value={formData.heardAbout}
                    onChange={handleChange}
                    className={fieldClasses}
                  />
                  <label htmlFor="heardAbout" className={labelClasses}>
                    How did you hear about us?
                  </label>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                  />
                  <label htmlFor="consent" className="text-xs text-slate-400 leading-normal">
                    I agree to allow this website to store and process my submitted information in accordance with privacy guidelines. *
                  </label>
                </div>

                {/* Status Feedback Alerts */}
                <AnimatePresence mode="wait">
                  {status === "error" && errorMessage ? (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300"
                    >
                      {errorMessage}
                    </motion.div>
                  ) : null}
                  {status === "success" && successMessage ? (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300"
                    >
                      {successMessage}
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-indigo-600 px-6 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-500 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-3">
                      <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Sending Request...</span>
                    </span>
                  ) : (
                    <span>Send Request</span>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Right Column: FAQ Side Panel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0d131e]/80 p-8 sm:p-10"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                  FAQ
                </span>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Need assistance with a software project?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                  Whether you need a custom web application, enterprise workflow automation, or tailored AI solutions, our strategic engineering team is ready to analyze your requirements and deliver results.
                </p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-4">
                  Explore Specialized Teams
                </p>
                <div className="space-y-3">
                  {[
                    { title: "Job Seekers", href: "#" },
                    { title: "Talent Consulting", href: "#" },
                    { title: "Project Management", href: "#" },
                  ].map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-4 text-sm font-medium text-white transition-all duration-200 hover:border-indigo-500/40 hover:bg-indigo-500/10"
                    >
                      <span className="group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </span>
                      <span className="text-slate-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-indigo-400">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Section 3 — Contact Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-16 rounded-3xl border border-white/10 bg-[#111722]/90 p-8 sm:p-10 shadow-xl"
          >
            <div className="grid gap-8 sm:grid-cols-3 sm:gap-6 text-center">
              {/* Address */}
              <div className="flex flex-col items-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  Address
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  123 Technology Park, Suite 400<br />Innovation City
                </p>
              </div>

              {/* Email Us */}
              <div className="flex flex-col items-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  Email Us
                </h3>
                <a href="mailto:info@agency.com" className="mt-2 text-sm text-slate-300 hover:text-indigo-400 transition-colors">
                  info@agency.com
                </a>
              </div>

              {/* Speak To Us */}
              <div className="flex flex-col items-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  Speak To Us
                </h3>
                <a href="tel:+923132471870" className="mt-2 text-sm text-slate-300 hover:text-indigo-400 transition-colors">
                  +92 313 2471870
                </a>
              </div>
            </div>
          </motion.div>
        </Container>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
