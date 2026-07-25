"use client";

import { Container } from "@/components/container";
import { contact } from "@/content/site-content";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type FormEvent } from "react";

const fieldClasses =
  "peer min-h-14 w-full rounded-xl border border-white/10 bg-[#0d131e]/90 px-3 pb-2 pt-6 text-white caret-indigo-300 transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-transparent hover:border-white/20 focus:border-indigo-400 focus:bg-[#101827] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.14)] focus:outline-none";

const labelClasses =
  "pointer-events-none absolute left-3 top-2 text-xs font-medium text-slate-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-300";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const businessType = (formData.get("businessType") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name) {
      setStatus("error");
      setFeedback("Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setFeedback("Please enter a valid email address.");
      return;
    }

    if (!message) {
      setStatus("error");
      setFeedback("Please enter a message.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

    const payload = {
      access_key: accessKey,
      subject: `New Contact Form Submission — Agency Website`,
      from_name: "Agency Website Contact Section",
      name,
      email,
      replyto: email,
      business_type: businessType || "N/A",
      message,
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
        form.reset();
        setStatus("success");
        setFeedback("Thanks — your message was sent successfully.");
      } else {
        throw new Error(result.message || "Form submission failed.");
      }
    } catch (err: unknown) {
      setStatus("error");
      const errText =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setFeedback(errText);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-white/10 bg-[#0c111b]/65 py-16 sm:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-indigo-300">
              Contact
            </p>
            <h2
              id="contact-heading"
              className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              {contact.heading}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
              {contact.description}
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder=" "
                  autoComplete="name"
                  required
                  className={fieldClasses}
                />
                <label htmlFor="name" className={labelClasses}>
                  Name
                </label>
              </div>

              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder=" "
                  autoComplete="email"
                  required
                  className={fieldClasses}
                />
                <label htmlFor="email" className={labelClasses}>
                  Email
                </label>
              </div>

              <div className="relative sm:col-span-2">
                <input
                  id="business-type"
                  name="businessType"
                  type="text"
                  placeholder=" "
                  className={fieldClasses}
                />
                <label htmlFor="business-type" className={labelClasses}>
                  Business type
                </label>
              </div>

              <div className="relative sm:col-span-2">
                <textarea
                  id="message"
                  name="message"
                  placeholder=" "
                  rows={6}
                  required
                  className={`${fieldClasses} min-h-40 resize-y`}
                />
                <label htmlFor="message" className={labelClasses}>
                  Message
                </label>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={status === "loading" || status === "success"}
              whileHover={reduceMotion ? undefined : { scale: 1.025 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="relative mt-6 inline-flex min-h-14 min-w-44 items-center justify-center overflow-hidden rounded-full bg-white px-7 font-medium text-slate-950 shadow-lg shadow-indigo-500/15 transition-colors disabled:cursor-not-allowed disabled:bg-slate-200"
            >
              {status === "success" && !reduceMotion ? (
                <motion.span
                  aria-hidden="true"
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute h-20 w-20 rounded-full bg-emerald-400/30"
                />
              ) : null}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={status}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="relative flex items-center"
                >
                  {status === "loading" ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950"
                      />
                      Sending…
                    </>
                  ) : status === "success" ? (
                    <>
                      <motion.svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="mr-2 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <motion.path
                          d="m5 12 4 4L19 7"
                          initial={reduceMotion ? false : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                        />
                      </motion.svg>
                      Message sent
                    </>
                  ) : (
                    "Send enquiry"
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <p
              aria-live="polite"
              className={`mt-4 min-h-6 text-sm ${
                status === "success" ? "text-emerald-300" : "text-red-300"
              }`}
            >
              {feedback}
            </p>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}
