import React from 'react';
import { signUp } from '../../supabase/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { retrieveUserSession } from '../../utils/verifySession';

const SignUp = () => {
  const navigate = useNavigate();
  const [ email, setEmail ] = React.useState('');
  const [ emailEmpty, setEmailEmpty ] = React.useState(false);
  const [ isAnEmail, setIsAnEmail ] = React.useState(true);
  const [ password, setPassword ] = React.useState('')
  const [ capitalPassword, setCapitalPassword ] = React.useState(false);
  const [ numberPassword, setNumberPassword ] = React.useState(false);
  const [ lengtPassword, setLenghtPassword ] = React.useState(false);
  const [ userName, setUserName ] = React.useState('');
  const [ userNameEmpty, setUserNameEmpty ] = React.useState(false)


  React.useEffect(() =>  {
    // retrieveUserSession('/', navigate);
  }, []);

  const defineValidPassword = (password) => {
    const regexCapital = /[A-Z]/;
    const regexNumber = /[1-9]/;

    if(password.length > 7){
      setLenghtPassword(true);
    }else{
      setLenghtPassword(false);
    }

    if(regexCapital.test(password)){
      setCapitalPassword(true);
    }else{
      setCapitalPassword(false);
    }  

    if(regexNumber.test(password)){
      setNumberPassword(true);
    }else{
      setNumberPassword(false);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(email)){
      setIsAnEmail(false);
    }

    if(email.length < 1){
      setEmailEmpty(true)
    }

    if(userName.length < 1){
      setUserNameEmpty(true);
    }

    if(
      emailRegex.test(email) && 
      !emailEmpty && 
      !userNameEmpty &&
      capitalPassword &&
      numberPassword &&
      lengtPassword
    ){
      const res = await signUp(email, password, userName);
      if(res !== undefined){
        navigate('/');
      }
    }
  }

  return (
    <article
      className='grid place-content-center h-screen'
    >
      <p
        className='font-bold font-sans text-3xl text-center absolute w-full top-2'
      >
        Registrate
      </p>
      <form
        onSubmit={e => handleSubmit(e)}
        className='flex flex-col gap-5'
      >

        <input 
          type="text" 
          name="user_name" 
          id="user_name" 
          placeholder="Nombre de usuario"
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
            setUserNameEmpty(false);
          }}
          className={userNameEmpty
            ? 'bg-slate-200 h-10 pl-3 text-lg rounded-md w-72 outline-amber-500 shadow-md border-red-400 border-2'
            : 'bg-slate-200 h-10 pl-3 text-lg rounded-md w-72 outline-amber-500 shadow-md'
          }
        />
        {userNameEmpty &&
          <p
            className='text-center text-red-400 text-lg'
          >
            Debes de ingresar un nombre de usuario
          </p>
        }

        <input 
          type="email" 
          name="email" 
          id="email" 
          placeholder="Correo electrónico"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setIsAnEmail(true);
            setEmailEmpty(false);
          }}
          className={(emailEmpty || !isAnEmail)
            ? 'bg-slate-200 h-10 pl-3 text-lg rounded-md w-72 outline-amber-500 shadow-md border-red-400 border-2'
            : 'bg-slate-200 h-10 pl-3 text-lg rounded-md w-72 outline-amber-500 shadow-md'
          }
        />
        {emailEmpty &&
          <p className='text-center text-red-400 text-lg'>
            Debes de ingresar un correo
          </p>
        }
        {!isAnEmail && !emailEmpty &&
          <p className='text-center text-red-400 text-lg'>
            Debes de ingresar un correo válido
          </p>
        }

        <div>
          <input 
            type="password" 
            name="password" 
            id="password"
            placeholder="Contraseña" 
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              defineValidPassword(e.target.value);
            }}
            className='bg-slate-200 h-10 pl-3 text-lg rounded-md w-72 outline-amber-500 shadow-md mb-4'
          />
          <p className='text-gray-400'>
            {lengtPassword ? '✅' : '❌'} Al menos 8 caracteres
          </p>

          <p className='text-gray-400'>
            {capitalPassword ? '✅' : '❌'} Al menos una mayúscula
          </p>

          <p className='text-gray-400'>
            {numberPassword ? '✅' : '❌'} El menos un número (1-9)
          </p>
        </div>

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
            self-center
            hover:shadow-xl
          '
        >
          Crear cuenta
        </button>
      </form>

      <section
        className='absolute bottom-5 w-full text-center'
      >
        <p className='text-lg'>¿Ya tienes una cuenta?</p>
        <p
          className='text-sm underline text-orange-600 cursor-pointer'
        >
          <Link to={'/signin'}>Iniciar sesión</Link>
        </p>
      </section>
    </article>
  );
}

export {SignUp};