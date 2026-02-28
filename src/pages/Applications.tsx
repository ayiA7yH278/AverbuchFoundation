import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

const Applications = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [position, setPosition] = useState("");
  const [positionError, setPositionError] = useState(false);
  const [phone, setPhone] = useState("");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Phone number formatting function
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    
    // Limit to 11 digits total
    const limitedDigits = digits.slice(0, 11);
    
    // Format: +_ (___) - ___ - ____
    if (limitedDigits.length === 0) return "";
    if (limitedDigits.length <= 1) return `+${limitedDigits}`;
    if (limitedDigits.length <= 4) return `+${limitedDigits.slice(0, 1)} (${limitedDigits.slice(1)}`;
    if (limitedDigits.length <= 7) return `+${limitedDigits.slice(0, 1)} (${limitedDigits.slice(1, 4)}) - ${limitedDigits.slice(4)}`;
    return `+${limitedDigits.slice(0, 1)} (${limitedDigits.slice(1, 4)}) - ${limitedDigits.slice(4, 7)} - ${limitedDigits.slice(7)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  // TODO: Replace this with your Formspree endpoint URL for job applications
  // Create a new form at https://formspree.io and use that endpoint
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgwvazg";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate position is selected
    if (!position) {
      setPositionError(true);
      setSubmitStatus("error");
      return;
    }
    
    setPositionError(false);
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    // Add position from state
    data.position = position;

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
        setPosition("");
        setPositionError(false);
        setPhone("");
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
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-6 md:px-12 lg:px-24 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          {/* Back Button */}
          <div className="mb-12">
            <Link to="/">
              <Button
                variant="ghost"
                className="font-sans-body text-xs tracking-monument uppercase text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>

          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="font-serif-display text-3xl md:text-4xl lg:text-5xl font-medium mb-6 tracking-tight"
            >
              Join Our Team
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-16 h-px divider-bronze mx-auto mb-6"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="font-sans-body text-base md:text-lg text-muted-foreground tracking-wide-custom max-w-xl mx-auto"
            >
              We're always looking for talented individuals to join our team. Submit your application below.
            </motion.p>
          </div>

          {/* Application Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-sans-body text-sm tracking-wide-custom uppercase">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="font-sans-body"
                  placeholder="Your full name"
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
              <Label htmlFor="phone" className="font-sans-body text-sm tracking-wide-custom uppercase">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                className="font-sans-body"
                placeholder="+1 (555) - 123 - 4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position" className="font-sans-body text-sm tracking-wide-custom uppercase">
                Requested Position
              </Label>
              <Select value={position} onValueChange={(value) => { setPosition(value); setPositionError(false); }}>
                <SelectTrigger className="font-sans-body">
                  <SelectValue placeholder="Select a position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Client Outreach Representative – reaching new clients">Client Outreach Representative – reaching new clients</SelectItem>
                  <SelectItem value="Digital Marketing Specialist – social media, ads, content promotion">Digital Marketing Specialist – social media, ads, content promotion</SelectItem>
                  <SelectItem value="Account Manager / Client Success – manages relationships">Account Manager / Client Success – manages relationships</SelectItem>
                </SelectContent>
              </Select>
              {positionError && !position && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">Please select a position</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="font-sans-body text-sm tracking-wide-custom uppercase">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                type="text"
                required
                className="font-sans-body"
                placeholder="City, State/Country"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetter" className="font-sans-body text-sm tracking-wide-custom uppercase">
                Cover Letter
              </Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                required
                rows={8}
                className="font-sans-body resize-none"
                placeholder="Tell us about yourself, your experience, and why you'd like to join our team..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="font-sans-body text-sm tracking-wide-custom uppercase">
                Experience
              </Label>
              <Textarea
                id="experience"
                name="experience"
                required
                rows={6}
                className="font-sans-body resize-none"
                placeholder="Describe your relevant experience..."
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
                    Thank you! Your application has been submitted successfully. We'll review it and get back to you soon.
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
                    There was an error submitting your application. Please try again or contact us directly.
                  </p>
                </motion.div>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 font-sans-body text-xs tracking-monument uppercase disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default Applications;
