import { GridCard } from "./shared/GridCard";

export default function WelcomeProjects() {
  return (
    <section className="flex flex-col items-center justify-center px-4 sm:px-8 md:px-10 py-8 md:py-12">
      <h1 className="text-2xl sm:text-4xl md:text-5xl mb-6 md:mb-8">¿En qué hemos trabajado?</h1>
      <div className="grid max-h-auto md:max-h-175 w-full grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 p-4 md:p-5 auto-rows-fr">
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
