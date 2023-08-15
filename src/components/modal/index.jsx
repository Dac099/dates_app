import React from 'react';
import ReactDOM from 'react-dom';
import { IoMdClose } from "react-icons/io";

const ModalContainer = ({children, onClose}) => {  
  return ReactDOM.createPortal(
    <article className='absolute top-0 left-0 bg-zinc-700/60 grid place-content-center w-screen h-screen'>
      <section>
        <button
          onClick={onClose}
        >
          <IoMdClose className='text-rose-600 text-xl cursor-pointer'/>
        </button>
        {children}
      </section>
    </article>,
    document.getElementById('modal')
  );
}

export {ModalContainer};