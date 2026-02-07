import Image from "next/image";
import { Stats } from "./Stats";

export default function Interesting() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-8 px-4 sm:px-8 md:px-10 py-8 md:py-12">
      <div className="flex items-center justify-center">
        <Stats />
      </div>
      <div className="relative aspect-square max-w-xs sm:max-w-sm md:max-w-150 mx-auto hover:scale-105 transition-transform duration-300">
        <Image src={"/dev.svg"} fill alt="devcode"></Image>
      </div>
    </section>
  );
}


