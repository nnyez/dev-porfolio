"use client";
interface LabelChipProps {
  text: string;
  className?:string;
}

export function LabelChip({ text, className }: LabelChipProps) {
  return (
    <label className={`px-4 py-2 rounded-full from-accent to-resalt text-secondary bg-linear-150 ${className}`}>
      {text}
    </label>
  );
}
