import { cn } from "@/lib/utils";

interface Props {
  onRatingClick?: () => void;
  classList?: string;
  countStar: number;
  styleStar?: string;
  styleText?: string;
  text?: string;
  styleLine?: string;
  styleText1?: string;
  text1?: string;
}

export default function Rating({
  onRatingClick = () => {},
  classList = "",
  countStar,
  styleStar = "",
  styleText = "",
  text = "",
  styleLine = "",
  styleText1 = "",
  text1 = ""
}: Props) {

  return (
    <ul className={cn("flex", classList)} onClick={onRatingClick} role="presentation">
      {Array.from({ length: 5 }).map((_, index) => {
        const isFilled = index < countStar;
        return (
          <li key={index} className="cursor-pointer" aria-label={`Star ${index + 1}`}>
            <i className={cn("fa-solid fa-star", isFilled ? "text-starColor" : "text-lineColor", styleStar)}></i>
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
