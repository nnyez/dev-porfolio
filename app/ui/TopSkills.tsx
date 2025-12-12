"use client";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

import { Card } from "./shared/Card";

export default function TopSkills() {
  const iconStyle = "relative! h-50! w-50! text-";
  return (
    <section className="grid justify-center grid-cols-3 gap-15 p-15">
      {Card(
        "Calidad de Codigo",
        "Excelencia",
        "Codigo escalable y limpio, con buenas practicas para un codigo excelente.  ",
        <VerifiedIcon className={`${iconStyle}`} />,
      )}
      {Card(
        "Resolucion de Problemas",
        "Innovacion",
        "Enfoque logico y eficiente para resolver cualquier desafio.",
        <EmojiEventsIcon className={`${iconStyle}`} />,
      )}
      {Card(
        "Aprendizaje Continuo",
        "Adaptabilidad",
        "Siempre en busca de nuevo conocimiento, viendo hacia el futuro de la tecnologia y mercado.",
        <RocketLaunchIcon className={`${iconStyle}`} />,
      )}
    </section>
  );
}


