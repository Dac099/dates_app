import React from 'react';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BiMessageSquareEdit as Edit } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { getActivitieById } from '../../supabase/activities';

export const ActivitieCard = ({data, group_id}) => {
  const {title, comments, rating, id} = data;
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
      <p className='text-sm text-stone-600 italic mb-5 text-justify'>"{comments}"</p>
      <div 
        className='flex justify-between gap-5 items-center absolute bottom-2 right-2'
      >
        <Link
          to={`/groups/${group_id}/activities/${id}/edit`}
        >
          <Edit 
            className='text-2xl cursor-pointer'
          />
        </Link>
        <div className='flex gap-1 text-2xl'>
          {amountStars().map((value, index) => (defineStar(value, index)))}
        </div>
      </div>
    </article>
  );
}

//loader
export const fetchActivitieById = async({params}) => {
  const activitie = await getActivitieById(params.activitie_id);
  return activitie;
}