import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props {
  onRatingClick?: () => void;
  onRatingChange?: (rating: number) => void; 
  classList?: string;
  countStar?: number;
  styleStar?: string;
  styleText?: string;
  text?: string;
  styleLine?: string;
  styleText1?: string;
  text1?: string;
  isHover?: boolean;
}

export default function Rating({
  onRatingClick = () => {},
  classList = "",
  countStar = 0,
  styleStar = "",
  styleText = "",
  text = "",
  styleLine = "",
  styleText1 = "",
  text1 = "",
  isHover = true,
  onRatingChange = () => {},
}: Props) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedStar, setSelectedStar] = useState<number>(countStar);

  return (
    <ul
      className={cn("flex", classList)}
      onClick={onRatingClick}
      role="presentation"
    >
      {Array.from({ length: 5 }).map((_, index:number) => {
        const isFilled =
          isHover
            ? index < countStar 
            : index < selectedStar || (hoveredStar !== null && index <= hoveredStar); 

        return (
          <li
            key={index}
            className="cursor-pointer"
            aria-label={`Star ${index + 1}`}
            onMouseEnter={() => {
              if (!isHover) setHoveredStar(index); 
            }}
            onMouseLeave={() => {
              if (!isHover) setHoveredStar(null);
            }}
            onClick={() => {
              if (!isHover){
                onRatingChange(index+1);
                setSelectedStar(index + 1);
              }  
            }}
          >
            <i
              className={cn(
                "fa-solid fa-star transition-all duration-300 ease-linear",
                isFilled ? "text-starColor" : "text-lineColor",
                styleStar
              )}
            ></i>
          </li>
        );
      })}
      <>
        <p className={cn(styleText1)}>{text1}</p>
        <div className={cn(styleLine)}></div>
        <p className={cn(styleText)}>{text}</p>
      </>
    </ul>
  );
}
