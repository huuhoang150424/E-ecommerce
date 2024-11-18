import { cn } from "@/lib/utils"

interface Props {
  className?: String
}

export default function LoadingSpinner({className}:Props) {
  return (
    /* From Uiverse.io by Fresnel11 */
    <div
      className={cn('w-10 h-10 border-4  border-gray-200 rounded-full border-b-blue-500 animate-spin ' ,className)} 
    ></div>
  )
}
