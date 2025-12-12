"use client";
import About from "./ui/About";
import HeroSection from "./ui/HeroSection";
import Interesting from "./ui/Interesting";
import TopSkills from "./ui/TopSkills";
import WelcomeProjects from "./ui/WelcomeProjects";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-primary flex min-h-screen flex-col font-sans">
      <Interesting />
      <HeroSection invert={false} />
      <About />
      <TopSkills />
      <WelcomeProjects />
      <ButtonToProyects/>
    </main>
  );
}

function ButtonToProyects() {
  return (
    <div className="my-5 flex items-center justify-center">
      <Link href={'/projects'} className="bg-accent text-secondary hover:bg-resalt rounded-full px-8 py-3 font-bold shadow-lg transition-all duration-300 active:scale-120">
        <SearchIcon className="text-2xl!" />
      </Link>
    </div>
  );
}
