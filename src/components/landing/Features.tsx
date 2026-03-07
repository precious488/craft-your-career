import { motion } from "framer-motion";
import { Sparkles, Target, Layout, Eye, Download } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Resume Writing",
    description: "Let AI craft compelling bullet points and professional summaries tailored to your experience.",
  },
  {
    icon: Target,
    title: "ATS Optimization",
    description: "Ensure your resume passes Applicant Tracking Systems with keyword optimization and scoring.",
  },
  {
    icon: Layout,
    title: "Professional Templates",
    description: "Choose from beautifully designed templates that recruiters love. Modern, classic, and minimal styles.",
  },
  {
    icon: Eye,
    title: "Real-time Preview",
    description: "See changes instantly as you type. What you see is exactly what recruiters will see.",
  },
  {
    icon: Download,
    title: "Instant PDF Export",
    description: "Download your resume as a perfectly formatted PDF, ready to send to employers.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything You Need to Land the Job
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you create the perfect resume in minutes, not hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-glow transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
