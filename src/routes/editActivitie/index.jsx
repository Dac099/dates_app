import React from 'react';
import { Form, Link, useParams, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { StarsInput } from '../../components/starsInput';
import { deleteActivitie, updateActivitie } from '../../supabase/activities';
import { MdDeleteForever } from "react-icons/md";

export const EditActivitie = () => {
  const activitie_data = useLoaderData();
  const navigate = useNavigate();
  const URLparams = useParams();

  const [ rating, setRating ] = React.useState(activitie_data.rating);
  const [ word_counter, setWordCounter ] = React.useState(activitie_data.comments.length);

  const [ title, setTitle ] = React.useState(activitie_data.title);
  const [ comments, setComments ] = React.useState(activitie_data.comments);

  const counter_color = (counter) => {
    let color = 'text-gray-400';
    
    if(counter > 50) color = 'text-yellow-400';

    if(counter > 150) color = 'text-orange-400';

    if(counter > 240) color = 'text-red-600';

    return color;
  }

  const setAmountStars = (amount) => {
    setRating(amount);
  }

  return (
    <article className='flex flex-col justify-center gap-4'>
      <MdDeleteForever 
        className='self-end text-rose-600 text-5xl cursor-pointer hover:bg-rose-600 rounded-full hover:text-white p-1'
        onClick={async () => {
          await deleteActivitie(activitie_data.id);
          navigate(`/groups/${URLparams.group_id}`);
        }}
      />
      <Form
        method='put'
        id='activitie-update' 
        className='self-center'       
      >

        <section className='flex flex-col mb-4'>

        <label 
          className='text-lg pl-2 mb-1 font-semibold text-slate-800' 
          htmlFor="title"
        >
          Nombre de la actividad
        </label>

        <input 
          className='h-10 w-full rounded-md bg-gray-200 text-slate-800 outline-2 outline-amber-500 px-2' 
          type="text" 
          name="title" 
          id="title" 
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        </section>

        <section className='flex flex-col mb-4'>

        <label 
          className='text-lg pl-2 mb-1 font-semibold text-slate-800' 
          htmlFor="rating"
        >
          ¿Cuántas estrellas le das?
        </label>

        <StarsInput 
          setAmountStars={setAmountStars}
          prevAmountStars={activitie_data.rating}
        />

        <input 
          className='hidden' 
          type="number" 
          max={5}
          min={0}
          name="rating" 
          id="rating" 
          value={rating}
          readOnly
        />

        </section>

        <section 
          className='flex flex-col mb-4 relative'
        >
          <label 
            className='text-lg pl-2 mb-1 font-semibold text-slate-800 text-center' 
            htmlFor="comments"
          >
            ¿Porqué la calificaste con {rating} estrellas?
          </label>

        <textarea 
          className='w-full rounded-md h-56 bg-gray-200 text-slate-800 outline-2 outline-amber-500 px-2 resize-none pb-4' 
          type="text" 
          maxLength={250}
          name="comments" 
          id="comments" 
          onChange={(e) => {
            setComments(e.target.value);
            setWordCounter(e.target.value.length)
          }}
          value={comments}
        />

        <p className={'absolute bottom-2 right-2 ' + counter_color(word_counter)}>{word_counter}/250</p>

        </section>      

        <div className='flex justify-between'>
          <button 
            type="submit"
            className='h-10 mx-auto my-0 bg-orange-300 p-2 rounded-lg font-semibold text-orange-800 shadow-md hover:shadow-orange-400 w-1/3'
          >
            Actualizar
          </button>

          <Link
            to={`/groups/${URLparams.group_id}`}
            className='h-10 mx-auto my-0 bg-orange-300 p-2 rounded-lg font-semibold text-orange-800 shadow-md hover:shadow-orange-400 w-1/3 text-center'  
          >
            Cancelar
          </Link>
        </div>
      </Form>
    </article>
  );
}

//action
export const editActivitie = async({request, params}) => {
  const form_data = await  request.formData();
  const new_data = Object.fromEntries(form_data);
  await updateActivitie(params.activitie_id, new_data);

  return redirect(`/groups/${params.group_id}`);
}