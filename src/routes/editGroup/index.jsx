import React from 'react';
import { useLoaderData, Form, redirect, useNavigate, Link } from 'react-router-dom';
import { updateGroup } from '../../supabase/groups';
import { MdDeleteForever } from "react-icons/md";
import { deleteGroup } from '../../supabase/groups';


export const EditGroup = () => {
  const navigate = useNavigate();
  const { title, description, id } = useLoaderData()[0];
  const [ new_title, setNewTitle ] = React.useState(title);
  const [ new_description, setNewDescription ] = React.useState(description);
  const [word_counter, setWordCounter ] = React.useState(description.length);
  
  const counter_color = (counter) => {
    let color = 'text-gray-400';
    
    if(counter > 50) color = 'text-yellow-400';

    if(counter > 150) color = 'text-orange-400';

    if(counter > 240) color = 'text-red-600';

    return color;
  }

  return(
    <article
      className='flex flex-col justify-center'
    >
      <MdDeleteForever 
        className='self-end text-rose-600 text-5xl cursor-pointer hover:bg-rose-600 rounded-full hover:text-white p-1'
        onClick={async () => {
          await deleteGroup(id);
          window.location.href = '/';
        }}
      />
      <Form
        method='put'
        id='update-group'
        className='self-center'
      >
        <div
          className='flex flex-col mb-4'
        >
          <label 
            htmlFor="title"
            className='text-lg pl-2 mb-1 font-semibold text-slate-800'
          >
            Nombre del grupo
          </label>

          <input 
            type="text" 
            name="title" 
            id="title" 
            className='h-10 w-full rounded-md bg-gray-200 text-slate-800 outline-2 outline-amber-500 px-2' 
            value={new_title}
            onChange={e => setNewTitle(e.target.value)}
          />
        </div>

        <div
          className='flex flex-col mb-4 relative'
        >
          <label 
            htmlFor="description"
            className='text-lg pl-2 mb-1 font-semibold text-slate-800'
          >
            ¿Cómo describirias a este grupo?
          </label>

          <textarea 
            name="description" 
            id="description"
            maxLength={250}
            className='w-full rounded-md h-56 bg-gray-200 text-slate-800 outline-2 outline-amber-500 px-2 resize-none pb-4' 
            value={new_description}
            onChange={e => {
              setNewDescription(e.target.value);
              setWordCounter(e.target.value.length);
            }}
          />

          <p className={'absolute bottom-2 right-2 ' + counter_color(word_counter)}>{word_counter}/250</p>

        </div>

        <div className='flex justify-between'>
          <button 
            type="submit"
            className='h-10 mx-auto my-0 bg-orange-300 p-2 rounded-lg font-semibold text-orange-800 shadow-md hover:shadow-orange-400 w-1/3'
          >
            Actualizar
          </button>

          <Link 
            to={`/`}
            type="button"
            className='h-10 mx-auto my-0 bg-red-300 p-2 rounded-lg font-semibold text-orange-800 shadow-md hover:shadow-red-400 w-1/3 text-center'
          >
            Cancelar
          </Link>
        </div>
      </Form>
    </article>
  );
}

//action
export const putGroup = async({request, params}) => {
  const form_data = await request.formData();
  const new_group_data = Object.fromEntries(form_data);
  await updateGroup(params.group_id, new_group_data);

  return redirect(`/groups/${params.group_id}`);
}
