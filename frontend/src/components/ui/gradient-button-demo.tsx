import { GradientButton } from "./gradient-button";

export function GradientButtonDemo() {
  return (
    <div className="flex flex-wrap gap-6">
      <GradientButton>Get Started</GradientButton>
      <GradientButton variant="variant">Explore PRISM</GradientButton>
    </div>
  );
}