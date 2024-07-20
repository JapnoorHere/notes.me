import React, { useState } from 'react'
import signUpImg from '../assets/signup.png'
import { ReactComponent as Pen } from '../assets/pen.svg'
import { CiLogin, CiLogout } from 'react-icons/ci'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'

const SignUp = () => {
    
    const [form,setForm] = useState([]);
    const navigate = useNavigate();
    const handleFormData = (event)=>{
        setForm({...form,
            [event.target.name] : event.target.value
        })
    }

    const handleSignUp = (event) => {
        event.preventDefault()
        fetch('http://localhost:4000/signup', {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify(form),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.message === 'User already exists') {
              alert('User already exists')
            } else if (json.message === 'User registered successfully') {
              navigate('/home',{ state: { email: form.email } });
            } else {
              // console.log(json);
            }
          })
          .catch((error) => {
            console.log('Error registering user');
            console.error('Error:', error);
          });
      };
    
    return (
        <div className='flex flex-col md:flex-row gap-4  max-w-5xl m-auto md:gap-[13rem] max-h-screen items-center'>
            <div className='w-full flex flex-col gap-5 justify-center p-4'>
                <img src={signUpImg} alt="" className='h-[300px] w-[400px]'/>
                <h1 className='text-4xl font-medium'>Keep life simple</h1>
                <p className='text-justify'>Store all your notes in a simple and intuitive app that helps you enjoy what is most important in life .</p>
                <Link className='bg-red-400 gap-2 py-5 rounded-lg text-white flex items-center justify-center' to='/login'>
                    <CiLogin fontSize={26} />
                    <span className='font-medium'>Login</span>
                </Link>
            </div>

            <div className='flex flex-col m-0 md:mt-20 gap-6 p-4 w-full'>

                <div className='flex'>
                    <Pen />
                    <span className='text-6xl'><span className='font-semibold'>Note</span><span>.me</span></span>
                </div>

                <button className='bg-red-400 gap-2 py-5 rounded-lg text-white flex items-center justify-center'>
                    <FaGoogle fontSize={26} />
                    <span className='font-medium'>Join with Google</span>
                </button>
                <div className=''>
                    -------------------
                    <span>or join using email</span>
                    -------------------

                </div>
                <div>
                    <form action="" className='flex flex-col gap-4'>
                        <input type="text" onChange={handleFormData} name="name" value={form.name} id="" placeholder='your name...' className='w-full rounded-lg h-12 border border-gray-500 p-2' /> 
                        
                        <input onChange={handleFormData} type="email" name="email" value={form.email} id="" placeholder='email...' className='w-full rounded-lg h-12 border border-gray-500 p-2' />
                        <input onChange={handleFormData} type="password" name="password" value={form.password} id="" placeholder='password...' className='w-full rounded-lg h-12 border border-gray-500 p-2' />
                        
                        <input type="password" onChange={handleFormData} name="confirmPassword" value={form.confirmPassword} id="" placeholder='confirm password...' className='w-full rounded-lg h-12 border border-gray-500 p-2' />

                        <button onClick={handleSignUp} className='bg-[#30c58d] gap-2 py-5 rounded-lg text-white flex items-center justify-center' type="submit"><CiLogin fontSize={26} />
                            <span className='font-medium'>SignUp</span></button>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default SignUp;
