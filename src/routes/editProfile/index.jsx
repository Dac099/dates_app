import React from 'react';
import { useLoaderData } from 'react-router-dom';

export const EditProfile = () => {
  const user_data = useLoaderData();
  console.log(user_data);
}
