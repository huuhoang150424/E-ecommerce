import { Rating } from "@/components/user";



export const ListRating = ({ ratings }: any) => {
  const starCounts = [0, 0, 0, 0, 0]; 
  ratings?.forEach((rating: any) => {
    if (rating.rating === 1) starCounts[0]++;
    if (rating.rating === 2) starCounts[1]++;
    if (rating.rating === 3) starCounts[2]++;
    if (rating.rating === 4) starCounts[3]++;
    if (rating.rating === 5) starCounts[4]++;
  });
  console.log("Kiểm tra ",ratings)
  return (
    <ul className="flex flex-col gap-[0px] mt-[10px]">
      {starCounts.map((count, index) => {
        const starPercentage = (count / ratings?.length) * 100;
        return (
          <li key={index} className="flex items-center gap-[10px]">
            <Rating
              countStar={index + 1}
              classList="flex gap-[2px]"
              styleStar="text-[12px]"
            />
            <div className="w-[150px] h-[6px] relative rounded-[12px] bg-gray-300 overflow-hidden">
              <div
                className="absolute h-full bg-primaryColor rounded-[12px]"
                style={{ width: `${starPercentage}%` }}
              ></div>
            </div>
            <span className="text-[12px] text-gray-400">{count}</span>
          </li>
        );
      })}
    </ul>
  );
};