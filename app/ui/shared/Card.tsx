"use client";
import Image from "next/image";
import { ReactNode } from "react";

export function Card(
  title: string,
  subtitle: string,
  text: string,
  src: ReactNode,
) {
  return (
    <div className="from-alt via-primary to-resalt-alt shadow-resalt relative grid 
    transform grid-rows-2 transition 
     overflow-hidden rounded-2xl bg-linear-180 shadow-sm 
     duration-300 ease-in-out hover:scale-105 md:hover:scale-110">
      <div className="relative flex items-center justify-center text-center p-4 md:p-6">
        <Image
          src={"/pattern.svg"}
          fill
          className="relative object-cover opacity-25"
          alt="Pattern"
        ></Image>
        <div className="relative z-10">
          {src}
        </div>
      </div>
      <div className="relative flex flex-col gap-2 p-4 md:p-5">
        <h3 className="text-resalt font-black text-sm md:text-base">{title}</h3>
        <h4 className="text-sm md:text-base">{subtitle}</h4>
        <p className="text-xs md:text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
