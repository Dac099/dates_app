import React from 'react';
import { TbMoodSadDizzy } from "react-icons/tb";
import { GroupCard } from '../../components/groupCard';
import { ModalContainer } from '../../components/modal';
import { useLoaderData } from 'react-router-dom';
import { NewGroupForm } from '../../components/newGroupForm';
import { getGroups } from '../../supabase/groups';

const Groups = () => {
  const groups = useLoaderData();
  const [ show_modal, setShowModal ] = React.useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  React.useEffect(() => {
    closeModal();
  }, [groups]);


  return (
    <article>

      {show_modal &&
        <ModalContainer onClose={closeModal}>
          <NewGroupForm />         
        </ModalContainer>
      }

      <section className='flex justify-center sm:justify-end'>
        <button 
          type='button'
          className='cursor-pointer bg-zinc-300 w-28 h-10 rounded-md shadow-md hover:shadow-zinc-500 font-semibold'
          onClick={openModal}
        >
          Nuevo grupo
        </button>
      </section>

      {groups.length < 1 &&      
        <section className='flex flex-wrap items-center justify-center'>
          <span className='text-9xl text-rose-500'><TbMoodSadDizzy className='inline'/></span> 
          <p className='text-2xl text-slate-800 font-semibold text-center'>Aun no cuentas con grupos creados</p>
        </section>
      }

      {groups.length > 0 &&
        <section
          className='flex flex-wrap gap-4 mt-5 justify-center sm:justify-normal'
        >
          {groups.map(group => (
            <GroupCard 
              key={group.id}
              title={group.title}
              date={group.created_at}
              group_id={group.id}
            />
          ))}
        </section>

      }

    </article>
  );
}

//loader
export const fetchGroups = async() => {
  const groups = await getGroups();
  return groups;
}


export {Groups};