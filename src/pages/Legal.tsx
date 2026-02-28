import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Legal = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
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

          {/* Legal Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="prose prose-lg max-w-none"
          >
            <h1 className="font-serif-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-6 sm:mb-8 tracking-tight">
              Legal Notice / Disclaimer
            </h1>

            <div className="w-16 h-px divider-bronze mb-12" />

            <div className="space-y-6 sm:space-y-8 font-sans-body text-sm sm:text-base md:text-lg text-foreground leading-relaxed">
              <div className="mb-8">
                <p className="mb-2 font-medium">Averbuch Foundation</p>
                <p className="mb-2">Sole Proprietorship</p>
                <p className="mb-6">Los Gatos, California, United States</p>
              </div>

              <section>
                <p className="mb-6">
                  All content on this website, including text, graphics, logos, images, and designs, is the property of Averbuch Foundation unless otherwise noted and is protected under U.S. copyright law. Unauthorized use, reproduction, or distribution of any content is prohibited.
                </p>
              </section>

              <section>
                <h2 className="font-serif-display text-xl sm:text-2xl md:text-3xl font-medium mb-3 sm:mb-4 mt-6 sm:mt-8">
                  Services Disclaimer
                </h2>
                <p className="mb-4">
                  The services provided by Averbuch Foundation are web design and development. While we strive to deliver high-quality work, Averbuch Foundation is not liable for any indirect, incidental, or consequential damages arising from the use of our services or websites we create. Clients are responsible for providing accurate content and ensuring compliance with applicable laws on their own websites.
                </p>
              </section>

              <section>
                <h2 className="font-serif-display text-xl sm:text-2xl md:text-3xl font-medium mb-3 sm:mb-4 mt-6 sm:mt-8">
                  Third-Party Content
                </h2>
                <p className="mb-4">
                  This website may contain links to third-party websites or resources. Averbuch Foundation is not responsible for the content, privacy policies, or practices of third-party websites.
                </p>
              </section>

              <section>
                <h2 className="font-serif-display text-xl sm:text-2xl md:text-3xl font-medium mb-3 sm:mb-4 mt-6 sm:mt-8">
                  Governing Law
                </h2>
                <p className="mb-4">
                  This website and all services offered are governed by the laws of the State of California, United States. Any disputes arising from this site or our services shall be subject to the exclusive jurisdiction of the courts located in Santa Clara County, California.
                </p>
              </section>

              <div className="mt-12 pt-8 border-t border-border">
                <p className="font-sans-body text-sm text-muted-foreground tracking-wide-custom">
                  © 2026 Averbuch Foundation. All rights reserved.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Legal;
