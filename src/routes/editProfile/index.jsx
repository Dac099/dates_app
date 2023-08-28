import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { FiUser } from "react-icons/fi";

import { 
  createFolderWithPicture,
  getPublicUrlPicture,
  deleteUserPicture,
} from '../../supabase/storage';

import { 
  updateUserImgUrl, 
  updateUserEmail, 
  updateUserName 
} from '../../supabase/user';

export const EditProfile = () => {
  const { user } = useLoaderData();
  const { name, url_picture, key } = user.user_metadata;

  const [ picture, setPicture ] = React.useState(null);
  const [ user_name, setUserName ] = React.useState(name);
  const [ email, setEmail ] = React.useState(user.email);
  const [ preview_url, setPreviewUrl ] = React.useState(null);
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(url_picture === '' && picture){

      const { path } = await createFolderWithPicture(user.id, picture);         
      const key = path.split('/')[1].split('.')[0];      
      const { publicUrl } = await getPublicUrlPicture(path);
      await updateUserImgUrl(publicUrl, key);      
    }

    if(url_picture !== '' && picture){

      await deleteUserPicture(user.id, key);
      const { path } = await createFolderWithPicture(user.id, picture);
      const new_key = path.split('/')[1].split('.')[0];      
      const { publicUrl } = await getPublicUrlPicture(path);
      await updateUserImgUrl(publicUrl, new_key);
    }

    if(user_name !== '' && user_name !== name){
      await updateUserName(user_name);
    }

    if(email !== '' && email !== user.email){
      await updateUserEmail(email);
    }

    window.location.href = '/perfil';
  }

  return (
    <article
      className='flex justify-center'
    >
      <form
        method='put'
        id='user-update'
        onSubmit={e => handleSubmit(e)}
        className='m-2 text-slate-800'      
      >
        <section
          className='shadow-md rounded-md bg-slate-200 flex flex-col gap-2 justify-center items-center py-2 sm:px-3'
        >

          <div
            className='w-32 h-32 sm:w-60 sm:h-60 bg-center bg-no-repeat bg-cover'
          >
            {url_picture !== '' && !preview_url &&
              <img 
                src={url_picture}
                className='rounded-full w-full h-full'
              />
            }
            {preview_url &&
              <img 
                src={preview_url}
                className='rounded-full w-full h-full'
              />
            }
            {url_picture === '' && !preview_url &&
              <div
                className='text-9xl border-2 bg-rose-500 w-60 h-60 grid place-content-center rounded-full text-rose-200'
              >
                <FiUser />
              </div>
            }
          </div>

          <div>
            <label 
              htmlFor="url_picture"
              className='font-semibold text-2xl text-center block'
            >
              Sube tu foto de perfil
            </label>
            <p
              className='text-center text-xs text-rose-400 font-semibold mb-4 -mt-1'
            >
              El formato debe de ser PNG o JPG
            </p>
            <input 
              type="file" 
              accept='image/png, image/jpg, image/jpeg'
              name='url_picture'
              className='text-sm'
              onChange={e => {
                setPicture(e.target.files[0]);

                const reader = new FileReader()
                reader.readAsDataURL(e.target.files[0]);

                reader.onload = (e) => {
                  setPreviewUrl(e.target.result);
                }
              }}
            />
          </div>
        </section>

        <div
          className='flex flex-col items-center'
        >
          <label 
          htmlFor="user_name"
          className='text-2xl block text-center mt-3 mb-2 font-semibold'
        >
          Nombre de usuario
        </label>
        <input 
          type="text" 
          name="user_name" 
          id="user_name"
          className='bg-slate-200 p-2 h-10 w-full max-w-sm rounded-md text-xl outline-amber-500 text-center'
          value={user_name} 
          onChange={e => setUserName(e.target.value)}
        />
      </div>
      
      <div
          className='flex flex-col items-center'
      >
        <label 
          htmlFor="email"
          className='text-2xl block text-center mt-3 mb-2 font-semibold'
        >
          Nombre de usuario
        </label>
        <input 
          type="email" 
          name="email" 
          id="email"
          className='bg-slate-200 p-2 h-10 w-full max-w-sm rounded-md text-xl outline-amber-500 text-center'
          value={email} 
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div
        className='flex justify-center'
      >
        <button 
          type="submit"
          className='
            w-40 
            h-10
            bg-amber-500 
            text-neutral-900 
            font-bold 
            rounded-lg 
            cursor-pointer 
            self-center
            hover:shadow-xl
            mt-3
          '
        >
          Guardar
        </button>
      </div>
      </form>
    </article>
  );
}
