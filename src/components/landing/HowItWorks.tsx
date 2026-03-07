import { motion } from "framer-motion";
import { Layout, UserPlus, Sparkles, Download } from "lucide-react";

const steps = [
  { icon: Layout, title: "Choose Template", description: "Pick from our professionally designed resume templates." },
  { icon: UserPlus, title: "Add Information", description: "Fill in your experience, education, skills and more." },
  { icon: Sparkles, title: "AI Improves Resume", description: "Let AI optimize your content for maximum impact." },
  { icon: Download, title: "Download Resume", description: "Export as PDF and start applying to your dream jobs." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">Four simple steps to your perfect resume.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                <step.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="text-xs font-bold text-primary mb-2">STEP {i + 1}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
