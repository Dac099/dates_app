import React from 'react';
import { Form } from 'react-router-dom';

const NewGroupForm = () => {
  return (
    <Form method='post'>
      <input type="text" name='title' id='title'/>
      <button type='submit'>Agregar</button>
    </Form>
  );
}

export {NewGroupForm};