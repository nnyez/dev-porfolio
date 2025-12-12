import Image from "next/image";
import { LabelChip } from "./shared/LabelChip";

export default function HeroSection({ invert = true }: { invert: boolean }) {
  return (
    <section className="grid grid-cols-2 items-center gap-x-10" id="About">
      <div
        className={`relative aspect-square w-full max-w-2xl ${invert ? "order-2 justify-self-end" : "order-1 justify-self-start"}`}
      >
        <Image
          loading="eager"
          src={"/profile_2.png"}
          alt="Profile"
          fill
          className={`object-cover ${invert ? "rounded-l-full" : "rounded-r-full"}`}
        />
      </div>
      <div
        className={`flex flex-col gap-y-5 p-10 text-center ${invert ? "order-1" : "order-2"}`}
      >
        <h1 className="text-8xl">Geovanni Xavier Zuñiga Guzhñay</h1>
        <h2>Esta es la historia de mi pasion</h2>
        <div className="flex justify-center gap-x-2">
          <LabelChip text="FrontEnd"></LabelChip>
          <LabelChip text="BackEnd"></LabelChip>
        </div>
      </div>
    </section>
  );
}
