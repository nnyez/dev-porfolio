'use'
export function Stats() {
    return (
        <div className="flex flex-col gap-y-4 md:gap-y-5 px-4 w-full">
            <div className="flex flex-col sm:flex-row items-center gap-x-3 md:gap-x-5 justify-center gap-y-2">
                <h1 className="font-black text-2xl sm:text-3xl md:text-4xl">+2 </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl">Años programando </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-x-3 md:gap-x-5 justify-center gap-y-2">
                <h1 className="font-black text-2xl sm:text-3xl md:text-4xl">+10 </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl">Proyecto completados </h2>
            </div>

            <div className="flex flex-col items-center justify-center gap-y-3 md:gap-y-4">
                <div className="">
                    <h1 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center">100% de excelencia</h1>
                </div>
                <div className="flex items-center flex-1 w-full my-4 md:my-10 gap-x-5 hover:scale-105 md:hover:scale-110 transition-all duration-300">
                    <div className="animate-fade-rainbow h-8 md:h-10 flex-1 rounded-full bg-linear-[90deg,var(--color-a),var(--color-b),var(--color-c),var(--color-d),var(--color-e),var(--color-a)] bg-size-[300%]"></div>
                </div>
            </div>
        </div>
    );
}
