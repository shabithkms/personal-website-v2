import React from "react";

export const ComponentSkeleton: React.FC<{ height?: string }> = ({ height = "h-64" }) => {
  return (
    <div
      className={`w-full ${height} border-2 border-ink/20 dark:border-paper/20 bg-ink/[0.03] dark:bg-paper/[0.03] animate-pulse flex items-center justify-center`}
    >
      <div className="w-3 h-3 bg-accent border border-ink dark:border-paper animate-pulse" />
    </div>
  );
};
