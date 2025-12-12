'use client'


import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import Navigation from "./shared/Navigation";
import { LabelIcon } from "./shared/LabelIcon";
export default function Footbar() {
  return (
    <footer className="flex justify-between p-10 ">
      <div>
        <h2 className="">CONTACTAME</h2>
        <div>
          <ul className="flex flex-row justify-center py-5 gap-x-5">
            <li>{LabelIcon("GitHub", <GitHubIcon />)}</li>
            <li>{LabelIcon("X", <XIcon />)}</li>
            <li>{LabelIcon("Instagram", <InstagramIcon />)}</li>
          </ul>
        </div>
      </div>
      <div className="text-center max-w-2/5">
        <h3 className="font-roboto-mono">
          Innovando para un futuro lleno de codigo{" "}
          <span className="inline-block transform hover:text-resalt hover:scale-110">
            Mejor
          </span>
        </h3>
      </div>
      <div className="flex flex-col justify-center gap-y-5">
        {Navigation(true)}
      </div>
    </footer>
  );
}


