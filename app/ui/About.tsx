export default function About() {
  return (
    <section>
      <div className="flex flex-col items-center px-4 sm:px-8 md:px-10 py-8 md:py-12 text-center gap-y-4 md:gap-y-6">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
          Hola, soy un desarrollador{" "}
          <span className="hover:text-accent transition-colors">full-stack</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-justify max-w-full md:max-w-4xl leading-relaxed">
          En este momento soy un estudiante de la carrera de computación, me
          gusta desarrollar e innovar dentro del área de desarrollo. Soy muy
          apasionado y enfocado en entregar productos de alta calidad. Me enfoco
          sobre todo en el desarrollo de código <span className="font-semibold">backend</span>.
        </p>
      </div>
    </section>
  );
}
