import React from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@/hooks/auth';

function Login() {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const { login, isLoading } = useLogin();

    async function handleLogin(data) {
        login({
          email: data.email,
          password: data.password,
          redirectTo: "/",
        });
      }

  return (
    <div className='w-full h-screen bg-black flex justify-center items-center'>

        <form onSubmit={handleSubmit(handleLogin)}>
            <div className='w-[300px] h-[400px] border-solid border-gray-200 border-[1px] rounded-2xl flex flex-col items-start gap-4'>
                <p className='text-3xl font-[apple-semibold]' style={{ fontSize: '2rem', fontWeight: 600 }}>Login</p>

                <input 
                    type="email" 
                    {...register("email")} 
                    style={{ backgroundColor: '#333333',paddingLeft: '12px', borderRadius: '8px', marginTop: '30px' }} 
                    className='border-gray-500 border border-solid border-b-1 border-l-0 border-r-0 border-t-0 w-full h-[40px] focus:outline-none focus:border-black' 
                    placeholder='E-mail' 
                />


                <input 
                    type="password" 
                    {...register("password")} 
                    style={{ backgroundColor: '#333333',paddingLeft: '12px', borderRadius: '8px' }} 
                    className='border-gray-500 border border-solid border-b-1 border-l-0 border-r-0 border-t-0 w-full h-[40px] focus:outline-none focus:border-black' 
                    placeholder='Password' 
                />

                <Button sx={{
                        backgroundColor: "#032fe8",
                        height: "40px",
                        width: "full",
                        borderRadius: "8px",
                        textColor: "white",
                        cursor: "pointer",
                        fontWeight:"thin",
                    }} 
                    _hover={{}} 
                    isLoading={isLoading} 
                    type='submit' 
                    className='w-full h-[40px] flex justify-center items-center text-white cursor-pointer mt-5' style={{ borderRadius: '8px' }}>
                    <p className='font-[apple]'>Log In</p>
                </Button>

                <p className='text-center text-gray-400 mt-2' style={{ fontSize: '0.8rem' }}>Don't have an account? <span className='text-white cursor-pointer' onClick={() => navigate("/register")}>Sign Up</span></p>
            </div>
        </form>
      
    </div>
  )
}

export default Login
