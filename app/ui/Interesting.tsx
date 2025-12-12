import Image from "next/image";
import { Stats } from "./Stats";

export default function Interesting() {
  return (
    <section className="grid grid-cols-2">
      <div className="flex items-center justify-center">
        <Stats />
      </div>
      <div className="relative aspect-square max-w-150">
        <Image src={"/dev.svg"} fill alt="devcode"></Image>
      </div>
    </section>
  );
}


