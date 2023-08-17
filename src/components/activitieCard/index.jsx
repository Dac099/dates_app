import React from 'react';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export const ActivitieCard = ({data}) => {
  const {title, comments, rating} = data;
  const [ big_card, setBigCard ] = React.useState(false);

  React.useEffect(() => {
    if(comments.length > 60){
      setBigCard(true);
    }
  }, []);

  const amountStars = () => {
    const max_rating = new Array(5).fill(0);

    if(rating > 0){
      max_rating.fill(1, 0, rating);
    }

    return max_rating
  }

  const defineStar = (value, index) => {
    if(value === 0) {
      return (
        <AiOutlineStar 
          key={index * rating}
        />
      );
    }

    return (
      <AiFillStar 
        key={index * rating}
        className='text-yellow-400'
      />
    );
  }


  return (
    <article 
      className={big_card
        ? 'activitie-card bg-stone-100 p-3 rounded-lg shadow-md relative flex-shrink row-span-2'
        : 'activitie-card bg-stone-100 p-3 rounded-lg shadow-md relative flex-shrink'
      }
      // className='activitie-card bg-stone-100 p-3 rounded-lg shadow-md relative flex-shrink'
    >
      <p className='text-xl font-semibold text-rose-500 mb-2'>{title}</p>
      <p className='text-sm text-stone-600 italic mb-2 text-justify'>"{comments}"</p>
      <div className='flex gap-1 text-2xl float-right mt-2'>
        {amountStars().map((value, index) => (defineStar(value, index)))}
      </div>
    </article>
  );
}