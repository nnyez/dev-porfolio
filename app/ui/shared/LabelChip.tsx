"use client";
interface LabelChipProps {
  text: string;
  className?:string;
}

export function LabelChip({ text, className }: LabelChipProps) {
  return (
    <label className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full from-accent to-resalt text-secondary bg-linear-150 ${className}`}>
      {text}
    </label>
  );
}
