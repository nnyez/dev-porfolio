import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavlinkDashboard({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  const pathname = usePathname();

  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  
  if (isActive) {
    return (
      <Link
        href={href}
        className="font-quicksand text-lg font-bold text-accent border-b-2 border-accent pb-1 transition-colors"
      >
        {text}
      </Link>
    );
  } else {
    return (
      <Link
        href={href}
        className="font-quicksand text-lg font-bold text-foreground hover:text-accent border-b-2 border-transparent hover:border-accent pb-1 transition-colors duration-300"
      >
        {text}
      </Link>
    );
  }
}
