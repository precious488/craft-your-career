import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(234_89%_60%/0.15),transparent_70%)]" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "hsl(210, 40%, 98%)" }}>
            Start Building Your Resume Today
          </h2>
          <p className="text-lg mb-8" style={{ color: "hsl(215, 20%, 75%)" }}>
            Join thousands of professionals who landed their dream jobs with ResumeAI.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 h-12 px-8 text-base shadow-glow">
              Get Started — It's Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
