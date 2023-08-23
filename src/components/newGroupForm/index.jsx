import React from 'react';
import { Form, redirect } from 'react-router-dom';
import { createGroup } from '../../supabase/groups';

const NewGroupForm = () => {
  const [word_counter, setWordCounter ] = React.useState(0);
  
  const counter_color = (counter) => {
    let color = 'text-gray-400';
    
    if(counter > 50) color = 'text-yellow-400';

    if(counter > 150) color = 'text-orange-400';

    if(counter > 240) color = 'text-red-600';

    return color;
  }

  return (
    <Form 
      method='post'
      className='p-3 bg-gray-100 rounded-lg'
      id='group-form'
    >
      <div className='my-4'>
        <label 
          htmlFor="title"
          className='text-lg pl-2 mb-1 font-semibold text-slate-800'
        >
          Nombre del grupo
        </label>

        <input 
          type="text" 
          name='title' 
          id='title'
          autoCapitalize='on'
          className='h-10 w-full rounded-md bg-gray-200 text-slate-800 outline-2 outline-amber-500 px-2'
          required={true}
        />
      </div>

      <div className='my-4 relative'>
        <label 
          htmlFor="description"
          className='text-lg pl-2 mb-1 font-semibold text-slate-800'
        >
          ¿Cómo describirias este grupo?
        </label>

        <textarea
          type="" 
          name="description" 
          id="description" 
          maxLength={250}
          autoCapitalize='on'
          className='w-full rounded-md bg-gray-200 text-slate-800 outline-2 outline-amber-500 p-2 h-72 resize-none text-justify'
          onChange={e => {
            setWordCounter(e.target.value.length)
          }}
        />

        <span 
          className={`absolute bottom-2 right-3 ${counter_color(word_counter)} italic`}
        >
          {`${word_counter}/250`}
        </span>
      </div>

      <div className='flex justify-center'>
        <button 
          type='submit'
          className='h-10 mx-auto my-0 bg-orange-300 p-2 rounded-lg font-semibold text-orange-800 shadow-md hover:shadow-orange-400'
        >
          Agregar
        </button>
      </div>

    </Form>
  );
}

//action
export const postGroup = async({request}) => {
  const formData = await request.formData();
  const new_group_data = Object.fromEntries(formData);
  await createGroup(new_group_data);

  return redirect(`/`);
}


export {NewGroupForm};