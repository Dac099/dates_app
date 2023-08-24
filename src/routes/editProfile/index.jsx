import React from 'react';
import { useLoaderData, Form, redirect } from 'react-router-dom';
import { uploadProfilePicture } from '../../supabase/storage';

export const EditProfile = () => {
  const { user } = useLoaderData();
  const { name, url_picture } = user.user_metadata;
  const [ user_name, setUserName ] = React.useState(name);
  const [ picture, setPicture ] = React.useState(url_picture);
  const [ email, setEmail ] = React.useState(user.email);


  return (
    <article>
      <Form
        method='put'
        id='user-update'
      >
        <section>
          <div>
            {url_picture !== ''
              ? <img src={picture} alt="Your profile picture" />
              : ''
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
              }}
            />
          </div>
        </section>

        <button type="submit">Subir</button>
      </Form>
    </article>
  );
}

//action
export const updateUserData = async({request, params}) => {
  const res = await uploadProfilePicture(params.url_picture, params.user_id);
  return redirect(`/perfil/`);
}