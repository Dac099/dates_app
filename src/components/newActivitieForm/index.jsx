import React from 'react';
import { Form } from 'react-router-dom';
import { createNewActivitie } from '../../supabase/activities';

export const NewActivitieForm = () => {


  return (
    <Form
      id='activitie-form'
      method='post'
      className='p-3 bg-gray-100 rounded-lg'
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
        />

      </section>

      <section className='flex flex-col mb-4'>

        <label 
          className='text-lg pl-2 mb-1 font-semibold text-slate-800' 
          htmlFor="rating"
        >
          ¿Cuántas estrellas le das?
        </label>

        <input 
          className='h-10 w-full rounded-md bg-gray-200 text-slate-800 outline-2 outline-amber-500 px-2' 
          type="number" 
          name="rating" 
          id="rating" 
        />

      </section>

      <section className='flex flex-col mb-4'>

        <label 
          className='text-lg pl-2 mb-1 font-semibold text-slate-800' 
          htmlFor="comments"
        >
          ¿Porqué la calificaste con estrellas?
        </label>

        <textarea 
          className='w-full rounded-md h-72 bg-gray-200 text-slate-800 outline-2 outline-amber-500 px-2 resize-none' 
          type="text" 
          name="comments" 
          id="comments" 
        />

      </section>      

      <div className='flex justify-center'>
        <button 
          type="submit"
          className='h-10 mx-auto my-0 bg-orange-300 p-2 rounded-lg font-semibold text-orange-800 shadow-md hover:shadow-orange-400'
        >
          Agregar
        </button>
      </div>

    </Form>
  );
}


//action
export const insertNewActivite = async({request, params}) => {
  const group_id = params.group_id;
  const form_data = await request.formData();
  const activitie_data = Object.fromEntries(form_data);

  const new_activitie = await createNewActivitie(activitie_data, group_id);


  return new_activitie;
}