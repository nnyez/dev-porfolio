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
     duration-300 ease-in-out hover:scale-110">
      <div className="relative text-center">
        <Image
          src={"/pattern.svg"}
          fill
          className="relative object-cover opacity-25"
          alt="Pattern"
        ></Image>
        {src}
      </div>
      <div className="relative flex flex-col gap-2 p-5">
        <h3 className="text-resalt font-black">{title}</h3>
        <h4 className="">{subtitle}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}
