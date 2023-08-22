import React from 'react';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export const StarsInput = ({setAmountStars, prevAmountStars}) => {
  const [rating, setRating] = React.useState(prevAmountStars || 0);
  const stars = [1,2,3,4,5];

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
    setAmountStars(clickedRating);
  };

  return (
    <div className="flex text-3xl justify-around">
      {stars.map((index) => (
        <span
          key={index * 2}
          onClick={() => handleStarClick(index)}          
        >
          {index <= rating 
            ? <AiFillStar 
                className='text-amber-500'
              /> 
            : <AiOutlineStar 
              />
          }
        </span>
      ))}
    </div>
  );
}
