import React from 'react';
import { Link } from 'react-router-dom';
import { signIn } from '../../supabase/auth';
import { useNavigate } from 'react-router-dom';
import { retrieveUserSession } from '../../utils/verifySession';

const SignIn = () => {
  const navigate = useNavigate();
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');
  const [ emailError, setEmailError ] = React.useState(false);
  const [ passwordError, setPasswordError ] = React.useState(false);
  const [ isAnEmail, setIsAnEmail ] = React.useState(true);

  React.useEffect(() => {
    retrieveUserSession(false, navigate, '/');
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    //regular expresion to validate the pattern of the string email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if(email === ''){
      setEmailError(true);
    }
    
    if(!emailRegex.test(email) && email !== ''){
      setIsAnEmail(false);
    }

    if(password === ''){
      setPasswordError(true);
    }

    if(!emailError && !passwordError && isAnEmail){
      const res = await signIn(email, password);
      
      if(res !== undefined){
        navigate('/');
      }
    }

    setEmail('');
    setPassword('');
  }

  return (
    <article
      className='grid place-content-center h-screen'
    >
      <p 
        className='font-bold font-sans text-3xl text-center absolute w-full top-2'
      >
        Iniciar sesión
      </p>
      <form
        onSubmit={e => handleSubmit(e)}
        className='grid grid-rows-3 gap-3'
      >                
        <input 
          type="text" 
          name="email" 
          id="email" 
          placeholder="Correo"
          value={email}
          onChange={e => {
            setEmail(e.target.value)
            setEmailError(false);
            setIsAnEmail(true);
          }}
          className={(emailError || !isAnEmail)
            ? 'bg-slate-200 h-10 pl-3 text-lg rounded-md w-72 outline-amber-500 shadow-md border-red-400 border-2'
            : 'bg-slate-200 h-10 pl-3 text-lg rounded-md w-72 outline-amber-500 shadow-md'
          }
        />
        {emailError && 
          <p className='text-center text-red-400 text-lg'>
            El correo no debe de estar vacío
          </p>
        }
        {!isAnEmail &&
          <p className='text-center text-red-400 text-lg'>
            Debes de ingresar un correo válido
          </p>
        }

        <input 
          type="password" 
          name="password" 
          id="password" 
          placeholder="Contraseña"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
            setPasswordError(false);
          }}
          className={passwordError
            ? 'bg-slate-200 h-10 pl-3 text-lg rounded-md w-72 outline-amber-500 shadow-md border-red-400 border-2'
            : 'bg-slate-200 h-10 pl-3 text-lg rounded-md w-72 outline-amber-500 shadow-md'
          }
        />
        {passwordError && 
          <p className='text-center text-red-400 text-lg'>
            La contraseña no debe de estar vacía
          </p>
        }
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
            justify-self-center
            hover:shadow-xl
          '
        >
          Iniciar
        </button>
      </form>

      <section
        className='absolute bottom-5 w-full text-center'
      >
        <p className='text-lg'>¿No tienes cuenta?</p>
        <p
          className='text-sm underline text-orange-600 cursor-pointer'
        >
          <Link
            to={'/signup'}
          >
            Crea tu cuenta
          </Link>
        </p>
      </section>
    </article>
  );
}

export {SignIn};