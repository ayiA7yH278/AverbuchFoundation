import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Inquiry = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // TODO: Replace this with your Formspree endpoint URL
  // Get it from https://formspree.io after creating a form
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjgezpdg";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquire" ref={ref} className="px-6 md:px-12 lg:px-24 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl mx-auto"
      >
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-serif-display text-3xl md:text-4xl lg:text-5xl font-medium mb-6 tracking-tight"
          >
            Inquire
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-16 h-px divider-bronze mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="font-sans-body text-base md:text-lg text-muted-foreground tracking-wide-custom max-w-xl mx-auto"
          >
            Let's discuss how we can help bring your vision to life.
          </motion.p>
        </div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-sans-body text-sm tracking-wide-custom uppercase">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                className="font-sans-body"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-sans-body text-sm tracking-wide-custom uppercase">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="font-sans-body"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="font-sans-body text-sm tracking-wide-custom uppercase">
              Company
            </Label>
            <Input
              id="company"
              name="company"
              type="text"
              className="font-sans-body"
              placeholder="Company name (optional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="font-sans-body text-sm tracking-wide-custom uppercase">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              rows={6}
              className="font-sans-body resize-none"
              placeholder="Tell us about your project..."
            />
          </div>

          <div className="pt-4 space-y-4">
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md"
              >
                <p className="text-sm text-green-800 dark:text-green-200 font-sans-body">
                  Thank you! Your inquiry has been sent successfully. We'll get back to you soon.
                </p>
              </motion.div>
            )}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md"
              >
                <p className="text-sm text-red-800 dark:text-red-200 font-sans-body">
                  There was an error sending your inquiry. Please try again or contact us directly.
                </p>
              </motion.div>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 font-sans-body text-xs tracking-monument uppercase disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Inquiry"}
            </Button>
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Inquiry;
