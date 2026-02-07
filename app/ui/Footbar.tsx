'use client'

import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import Navigation from "./shared/Navigation";
import { LabelIcon } from "./shared/LabelIcon";
export default function Footbar() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 px-4 sm:px-8 md:px-10 py-8 md:py-10 border-t border-accent/10">
      <div className="text-center md:text-left">
        <h2 className="text-lg sm:text-xl md:text-2xl">CONTACTAME</h2>
        <div>
          <ul className="flex flex-row justify-center md:justify-start py-4 md:py-5 gap-x-4 md:gap-x-5">
            <li>{LabelIcon("GitHub", <GitHubIcon />)}</li>
            <li>{LabelIcon("X", <XIcon />)}</li>
            <li>{LabelIcon("Instagram", <InstagramIcon />)}</li>
          </ul>
        </div>
      </div>
      <div className="text-center max-w-full md:max-w-2/5 flex-1 md:flex-none">
        <h3 className="font-roboto-mono text-sm sm:text-base md:text-lg leading-relaxed">
          Innovando para un futuro lleno de código{" "}
          <span className="inline-block transform hover:text-resalt hover:scale-105 transition-all">
            Mejor
          </span>
        </h3>
      </div>
      <div className="flex flex-row md:flex-col justify-center gap-4 md:gap-y-5">
        {Navigation(true)}
      </div>
    </footer>
  );
}


