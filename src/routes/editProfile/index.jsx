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
  updateUserName,
  updateUserPassword,
  updatePublicEmail,
  updatePublicURLPicture,
  updatePublicUserName
} from '../../supabase/user';

export const EditProfile = () => {
  const { data: { user } } = useLoaderData();
  const { name, url_picture, key } = user.user_metadata;

  const [ picture, setPicture ] = React.useState(null);
  const [ preview_url, setPreviewUrl ] = React.useState(null);

  const [ user_name, setUserName ] = React.useState(name);
  const [ user_name_error, setUserNameError ] = React.useState(false);

  const [ email, setEmail ] = React.useState(user.email);
  const [ email_error, setEmailError ] = React.useState(false);
  const [ is_an_email, setIsAnEmail ] = React.useState(true);
  
  const [ password, setPassword ] = React.useState('');
  const [ capitalPassword, setCapitalPassword ] = React.useState(false);
  const [ numberPassword, setNumberPassword ] = React.useState(false);
  const [ lengtPassword, setLenghtPassword ] = React.useState(false);

  const defineValidPassword = (password) => {
    const regexCapital = /[A-Z]/;
    const regexNumber = /[1-9]/;

    if(password.length > 7){
      setLenghtPassword(true);
    }else{
      setLenghtPassword(false);
    }

    if(regexCapital.test(password)){
      setCapitalPassword(true);
    }else{
      setCapitalPassword(false);
    }  

    if(regexNumber.test(password)){
      setNumberPassword(true);
    }else{
      setNumberPassword(false);
    }
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    //Set profile picture for the first time
    if(url_picture === '' && picture){

      const { path } = await createFolderWithPicture(user.id, picture);         
      const key = path.split('/')[1].split('.')[0];      
      const { publicUrl } = await getPublicUrlPicture(path);
      await Promise.all([
        updateUserImgUrl(publicUrl, key),
        updatePublicURLPicture(publicUrl, user.id)
      ]);
    }

    //Update current profile picture
    if(url_picture !== '' && picture){

      await deleteUserPicture(user.id, key);
      const { path } = await createFolderWithPicture(user.id, picture);
      const new_key = path.split('/')[1].split('.')[0];      
      const { publicUrl } = await getPublicUrlPicture(path);
      await Promise.all([
        updateUserImgUrl(publicUrl, new_key),
        updatePublicURLPicture(publicUrl, user.id)
      ]);
    }

    //Update user_name
    if(user_name !== ''){
      if(user_name !== name){        
        await Promise.all([
          updateUserName(user_name),
          updatePublicUserName(user_name, user.id)
        ]);
      }
    }else{
      setUserNameError(true);
      return;
    }

    if(!emailRegex.test(email)){
      setIsAnEmail(false);
    }

    //udpate email
    if(email !== '' && is_an_email){
      if(email !== user.email){
        await Promise.all([
          updateUserEmail(email),
          updatePublicEmail(email, user.id)
        ]);
      }
    }
    else{
      setEmailError(true);
      return;
    }

    //update password
    if(
      lengtPassword && 
      capitalPassword &&
      numberPassword
    ){
      await updateUserPassword(password);
    }

    window.location.href = '/profile';
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
                className='rounded-full w-full h-full object-cover'
              />
            }
            {preview_url &&
              <img 
                src={preview_url}
                className='rounded-full w-full h-full object-cover'
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
                console.log(e.target.files[0].type)

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
          className='text-2xl block text-center mt-3 font-semibold'
        >
          Nombre de usuario
        </label>

        {user_name_error &&
          <p
            className='text-rose-600 text-xs mb-2'
          >
            El nombre de usuario no puede quedar vacío
          </p>
        }

        <input 
          type="text" 
          name="user_name" 
          id="user_name"
          className={`bg-slate-200 p-2 h-10 w-full max-w-sm rounded-md text-xl outline-amber-500 text-center border-2 ${user_name_error ? 'border-rose-600' : 'border-0'}`}
          value={user_name} 
          onChange={e => setUserName(e.target.value)}
        />
      </div>
      
      <div
          className='flex flex-col items-center'
      >
        <label 
          htmlFor="email"
          className='text-2xl block text-center mt-3 font-semibold'
        >
          Correo electrónico
        </label>

        {email_error &&
          <p
            className='text-rose-600 text-xs mb-2'
          >
            El email no puede quedar vacío
          </p>
        }

        {!is_an_email && !email_error &&
          <p
            className='text-rose-600 text-xs mb-2'
          >
            El email debe de ser válido
          </p>
        }
        
        <input 
          type="email" 
          name="email" 
          id="email"
          className={`bg-slate-200 p-2 h-10 w-full max-w-sm rounded-md text-xl outline-amber-500 text-center border-2 ${
            email_error || !is_an_email ? 'border-rose-600 text-rose-500' : 'border-0'
          }`}
          value={email} 
          onChange={e => setEmail(e.target.value)}
        />
      </div>
     
      <div
          className='flex flex-col items-center'
      >
        <label 
          htmlFor="password"
          className='text-2xl block text-center mt-3 font-semibold'
        >
          Constraseña
        </label>

        <p 
          className='text-xs text-slate-500 mb-2 text-center '
        >
          Si el campo de abajo lo dejas vacío, entonces se coservará tu vieja contraseña
        </p>

        <input 
          type="password" 
          name="password" 
          id="password"
          className='bg-slate-200 p-2 h-10 w-full max-w-sm rounded-md text-xl outline-amber-500 text-center mb-2'
          value={password} 
          onChange={e => {
            setPassword(e.target.value);
            defineValidPassword(e.target.value);
          }}
        />

        <p className='text-gray-400 self-start'>
            {lengtPassword ? '✅' : '❌'} Al menos 8 caracteres
        </p>

        <p className='text-gray-400 self-start'>
          {capitalPassword ? '✅' : '❌'} Al menos una mayúscula
        </p>

        <p className='text-gray-400 self-start'>
          {numberPassword ? '✅' : '❌'} El menos un número (1-9)
        </p>
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
