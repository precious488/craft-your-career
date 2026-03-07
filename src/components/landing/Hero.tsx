import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-hero">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Resume Builder
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground"
          >
            Build Your Perfect{" "}
            <span className="text-gradient-primary">Resume</span>{" "}
            in Minutes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Create ATS-optimized, professional resumes with AI assistance.
            Stand out from the crowd and land your dream job faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 px-8 h-12 text-base shadow-glow">
                Build Your Resume
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href="#templates">
              <Button size="lg" variant="outline" className="h-12 text-base px-8">
                View Templates
              </Button>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-sm text-muted-foreground"
          >
            ✓ Free forever &nbsp; ✓ No credit card required &nbsp; ✓ ATS-friendly templates
          </motion.p>
        </div>

        {/* Resume Preview Mock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-10 scale-105" />
            <div className="relative bg-card rounded-2xl shadow-elegant border border-border overflow-hidden">
              <div className="h-8 bg-muted flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-primary mx-auto" />
                  <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
                  <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
                  <div className="space-y-2 mt-6">
                    <div className="h-3 bg-primary/20 rounded w-full" />
                    <div className="h-3 bg-primary/15 rounded w-4/5" />
                    <div className="h-3 bg-primary/10 rounded w-3/5" />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <div className="h-5 bg-foreground/10 rounded w-1/3 mb-3" />
                    <div className="h-3 bg-muted rounded w-full mb-2" />
                    <div className="h-3 bg-muted rounded w-5/6 mb-2" />
                    <div className="h-3 bg-muted rounded w-4/6" />
                  </div>
                  <div>
                    <div className="h-5 bg-foreground/10 rounded w-1/4 mb-3" />
                    <div className="h-3 bg-muted rounded w-full mb-2" />
                    <div className="h-3 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                  </div>
                  <div>
                    <div className="h-5 bg-foreground/10 rounded w-1/5 mb-3" />
                    <div className="flex gap-2 flex-wrap">
                      {["React", "TypeScript", "Node.js", "Python"].map((s) => (
                        <div key={s} className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium">
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
