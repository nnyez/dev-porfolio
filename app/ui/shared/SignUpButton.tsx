"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SignUpButton({
  text,
  href,
}: {
  text: string;
  href: string;
}) {
  const route = usePathname();

  return (
    <>
      <Link
        href={href}
        className={`bg-resalt text-primary hover:bg-accent transform rounded-md px-4 py-2 font-bold transition-all duration-100 ease-out hover:scale-105 ${route === href ? "pointer-events-none opacity-50" : ""}`}
      >
        {text}
      </Link>
    </>
  );
}
