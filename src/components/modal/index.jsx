import React from 'react';
import ReactDOM from 'react-dom';
import { IoMdClose } from "react-icons/io";

const ModalContainer = ({children, onClose}) => {  

  return ReactDOM.createPortal(
    <article className='absolute top-0 left-0 bg-zinc-700/60 grid justify-center w-screen h-screen'>
      <section className='p-3'>
        <button
          onClick={onClose}
        >
          <IoMdClose 
            className='text-rose-600 text-xl cursor-pointer bg-neutral-100 rounded-full hover:border-rose-600 border-2 border-neutral-100'
          />
        </button>
        {children}
      </section>
    </article>,
    document.getElementById('modal')
  );
}

export {ModalContainer};