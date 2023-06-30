import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({size, rate, callback}) {
  const [hoverRating, setHoverRating] = useState(rate);
  const [rating, setRating] = useState(rate);

  const handleRatingHover = (hoveredStar) => {
    setHoverRating(hoveredStar);
    console.log("hoveredStar::", hoveredStar);
  };
  
  const handleRatingLeave = () => {
    setHoverRating(rating);
  }

  const handleRatingClick = (clickedStar) => {
    setHoverRating(clickedStar);
    setRating(clickedStar);
    console.log("clickedStar::", clickedStar);
    if(callback){
      callback(clickedStar)
    }
  };

  return (
    <div className="flex justify-center">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoverRating || rating);

        return (
          <FaStar
            size={size}
            key={index}
            className={`fill-current mr-1 focus:outline-none ${
              isFilled ? "dark:text-white text-black" : "dark:text-gray-700 text-gray-200"
            }`}
            onMouseEnter={() => handleRatingHover(starValue)}
            onMouseLeave={() => handleRatingLeave()}
            onClick={() => handleRatingClick(starValue)}
          />
        );
      })}
    </div>
  );
}