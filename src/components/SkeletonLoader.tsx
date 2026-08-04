import React from "react";

export const ComponentSkeleton: React.FC<{ height?: string }> = ({ height = "h-64" }) => {
  return (
    <div className={`w-full ${height} rounded-2xl bg-slate-200/60 dark:bg-slate-900/60 animate-pulse border border-slate-300/40 dark:border-slate-800/60 flex items-center justify-center`}>
      <div className="w-12 h-12 rounded-full bg-slate-300/60 dark:bg-slate-800/80 animate-ping" />
    </div>
  );
};
