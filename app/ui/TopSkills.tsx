"use client";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

import { Card } from "./shared/Card";

export default function TopSkills() {
  const iconStyle = "relative! h-24 sm:h-32 md:h-40 lg:h-50! w-24 sm:w-32 md:w-40 lg:w-50! text-";
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-10 lg:gap-15 p-4 sm:p-8 md:p-10 lg:p-15 justify-center">
      {Card(
        "Calidad de Código",
        "Excelencia",
        "Código escalable y limpio, con buenas prácticas para un código excelente.",
        <VerifiedIcon className={`${iconStyle}`} />,
      )}
      {Card(
        "Resolución de Problemas",
        "Innovación",
        "Enfoque lógico y eficiente para resolver cualquier desafío.",
        <EmojiEventsIcon className={`${iconStyle}`} />,
      )}
      {Card(
        "Aprendizaje Continuo",
        "Adaptabilidad",
        "Siempre en busca de nuevo conocimiento, viendo hacia el futuro de la tecnología y mercado.",
        <RocketLaunchIcon className={`${iconStyle}`} />,
      )}
    </section>
  );
}


