import React from "react";

/**
 * Flat, technical backdrop: a dot-grid field plus corner crosshairs,
 * replacing the old glow-orb/particle treatment with something that
 * reads as drafting paper rather than a glossy gradient.
 */
export const GridBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden text-ink/[0.08] dark:text-paper/[0.08]">
      <div className="absolute inset-0 bg-dot-grid" />

      {/* Corner crosshairs — a small nod to design-tool chrome */}
      <div className="hidden sm:block absolute top-6 left-6 w-4 h-4 border-l-2 border-t-2 border-ink/20 dark:border-paper/20" />
      <div className="hidden sm:block absolute top-6 right-6 w-4 h-4 border-r-2 border-t-2 border-ink/20 dark:border-paper/20" />
      <div className="hidden sm:block absolute bottom-6 left-6 w-4 h-4 border-l-2 border-b-2 border-ink/20 dark:border-paper/20" />
      <div className="hidden sm:block absolute bottom-6 right-6 w-4 h-4 border-r-2 border-b-2 border-ink/20 dark:border-paper/20" />
    </div>
  );
};
