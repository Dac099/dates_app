import React from 'react';

export const OnError = () => {
  return (
    <div
      className='w-full h-full flex flex-col items-center justify-center max-sm:mt-28'
    >
      <span className='text-6xl font-black animate-bounce mb-12 text-rose-500'>Upps!</span>
      <p className='text-center text-xl font-semibold'>Tuvimos un error para traer tus conexiones.</p>
      <span className='text-md text-orange-600/40 max-sm:mt-2'>Intentalo más tarde</span>
    </div>

  );
}