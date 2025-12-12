import { GridCard } from "./shared/GridCard";

export default function WelcomeProjects() {
  return (
    <section className="flex flex-col items-center justify-center">
      <h1>¿En que hemos trabajado?</h1>
      <div className="grid max-h-175 w-full grid-cols-2 grid-rows-2 gap-5 p-5">
        <GridCard
        srcRepo="https://smiservis.com/"
          chips={["MySQL", "Tailwind", "NextJS", "Web"]}
          className="row-span-2"
          src="/projects/smi-page.png"
          classNameImg="aspect-video"
        >
          <h2>Plataforma de Servicios Profesionales</h2>
          <p className="text-2xl"> 
            Plataforma informativa que permite a los usuarios obtener asesoria
            personalizada.
          </p>
        </GridCard>
        <GridCard
          srcRepo="https://github.com/nnyez/OrganizadorEstudioTesis.git"
          src="/projects/planning-app1.jpeg"
          classNameImg=""
          className="row-span-2"
          chips={["Angular", "Ionic", "Firebase"]}
        >
          <h2>Aplicativo para una Organizacion Mejor</h2>
          <p className="text-2xl">
            Una aplicacion movil realizada con objetivo para organizar tareas, notas y tiempos. 
          </p>
        </GridCard>
      </div>
    </section>
  );
}
