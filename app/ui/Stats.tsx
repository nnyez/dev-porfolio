'use'
export function Stats() {
    return (
        <div className="flex flex-col gap-y-5 ">
            <div className="flex items-center gap-x-5 justify-center">
                <h1 className="font-black">+2 </h1>
                <h2>Años programando </h2>
            </div>

            <div className="flex items-center gap-x-5  justify-center">
                <h1 className="font-black">+10 </h1>
                <h2>Proyecto completados </h2>
            </div>

            <div className="flex flex-col items-center justify-center">
                <div className="">
                    <h1 className="font-black text-6xl">100% de excelencia</h1>
                </div>
                <div className="flex items-center flex-1 w-full my-10 gap-x-5">
                    <div className="animate-fade-rainbow h-10 flex-1 rounded-full bg-linear-[90deg,var(--color-a),var(--color-b),var(--color-c),var(--color-d),var(--color-e),var(--color-a)] bg-size-[300%]"></div>
                </div>
            </div>
        </div>
    );
}
