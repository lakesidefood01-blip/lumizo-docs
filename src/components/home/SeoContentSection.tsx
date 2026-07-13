import { Zap, Shield, Globe, Palette } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Create professional documents in seconds. No waiting for page loads or server responses. Everything happens instantly in your browser.",
  },
  {
    icon: Shield,
    title: "100% Free",
    description:
      "No hidden fees, no subscriptions, no limits. Use all generators as much as you want, completely free.",
  },
  {
    icon: Globe,
    title: "Privacy First",
    description:
      "Your data never leaves your device. All document generation happens locally in your browser.",
  },
  {
    icon: Palette,
    title: "Professional Quality",
    description:
      "Choose from three professionally designed templates. Your documents will look polished and ready for business.",
  },
];

export function SeoContentSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            Why Choose Us
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Why Choose Lumizo Docs?
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-border/50 bg-background/50 p-6 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
