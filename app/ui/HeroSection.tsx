import Image from "next/image";
import { LabelChip } from "./shared/LabelChip";

export default function HeroSection({ invert = true }: { invert: boolean }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-x-10 px-4 sm:px-8 md:px-10 py-8 md:py-12" id="About">
      <div
        className={`relative aspect-square w-full max-w-xs sm:max-w-sm md:max-w-2xl mx-auto ${invert ? "md:order-2 md:justify-self-end" : "md:order-1 md:justify-self-start"}`}
      >
        <Image
          loading="eager"
          src={"/profile_2.png"}
          alt="Profile"
          fill
          className={`object-cover ${invert ? "rounded-full md:rounded-l-full" : "rounded-full md:rounded-r-full"}`}
        />
      </div>
      <div
        className={`flex flex-col gap-y-4 md:gap-y-5 p-4 sm:p-8 md:p-10 text-center ${invert ? "md:order-1" : "md:order-2"}`}
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Geovanni Xavier Zuñiga Guzhñay</h1>
        <h2 className="text-lg sm:text-xl md:text-2xl">Esta es la historia de mi pasión</h2>
        <div className="flex justify-center gap-x-2 flex-wrap gap-y-2">
          <LabelChip text="FrontEnd"></LabelChip>
          <LabelChip text="BackEnd"></LabelChip>
        </div>
      </div>
    </section>
  );
}
