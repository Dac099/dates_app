import React from 'react';
import { Form, redirect } from 'react-router-dom';
import { createNewActivitie } from '../../supabase/activities';

export const NewActivitieForm = () => {


  return (
    <Form
      id='activitie-form'
      method='post'
    >
      <section>
        <label htmlFor="title">Nombre de la actividad</label>
        <input type="text" name="title" id="title" />
      </section>

      <section>
        <label htmlFor="rating">¿Cuántas estrellas le das?</label>
        <input type="number" name="rating" id="rating" />
      </section>

      <section>
        <label htmlFor="comments">¿Porqué la calificaste con estrellas?</label>
        <input type="text" name="comments" id="comments" />
      </section>      

      <div>
        <button type="submit">Agregar</button>
      </div>

    </Form>
  );
}


//action
export const insertNewActivite = async({request, params}) => {
  const group_id = params.group_id;
  const form_data = await request.formData();
  const activitie_data = Object.fromEntries(form_data);
  console.log(activitie_data);
  const new_activitie = await createNewActivitie(activitie_data, group_id);

  console.log(new_activitie);

  return new_activitie;
}