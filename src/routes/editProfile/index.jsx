import React from 'react';
import { useLoaderData } from 'react-router-dom';

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

    if(url_picture === ''){
      console.log("Subiendo");

      const { path } = await createFolderWithPicture(user.id, picture);         
      const key = path.split('/')[1].split('.')[0];      
      const { publicUrl } = await getPublicUrlPicture(path);
      await updateUserImgUrl(publicUrl, key);      
    }

    if(url_picture !== ''){
      console.log("Actualizando");

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

    // window.location.href = '/perfil';
  }

  return (
    <article>
      <form
        method='put'
        id='user-update'
        onSubmit={e => handleSubmit(e)}
      >
        <section>
          <div>
            {url_picture !== '' && !preview_url &&
              <img src={url_picture}/>
            }
            {preview_url &&
              <img src={preview_url}/>
            }
          </div>

          <div>
            <label htmlFor="url_picture">Sube tu foto de perfil</label>
            <p>El formato debe de ser PNG o JPG</p>
            <input 
              type="file" 
              accept='image/png, image/jpg, image/jpeg'
              name='url_picture'
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

          <div>
            <label 
              htmlFor="user_name"
            >
              Nombre de usuario
            </label>
            <input 
              type="text" 
              name="user_name" 
              id="user_name"
              value={user_name} 
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          
          <div>
            <label 
              htmlFor="email"
            >
              Nombre de usuario
            </label>
            <input 
              type="email" 
              name="email" 
              id="email"
              value={email} 
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </section>

        <button type="submit">Guardar</button>
      </form>
    </article>
  );
}
