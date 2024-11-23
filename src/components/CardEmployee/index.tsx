import { twMerge } from "tailwind-merge"

interface CardEmployeeProps {
  variant?: boolean
}
export function CardEmployee({ variant = false }: CardEmployeeProps) {
  return (
    <div
      className={twMerge(
        "p-4 bg-blue-950 rounded-sm cursor-pointer",
        variant && 'bg-red-950'
      )}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">John Doe</h2>
        <span className="text-sm">500 de prod</span>
      </div>
      <div className="flex justify-between items-center gap-4 mt-4 ">
        <div>
          <h3 className="text-lg font-semibold">
            Escala de 4x3
          </h3>
          <div className="flex items-center flex-col">
            <span>500 por hora</span>
            <span>500 por mês</span>
          </div>
        </div>
        <div className={twMerge("after:block after:h-[70px] after:w-[2px] after:bg-blue-500/80",
          variant && 'after:bg-red-700'
        )} />
        <div>
          <h3 className="text-lg font-semibold">
            Escala de 6x1
          </h3>
          <div className="flex items-center flex-col">
            <span>500 por hora</span>
            <span>500 por mês</span>
          </div>
        </div>
      </div>
    </div>
  )
}
