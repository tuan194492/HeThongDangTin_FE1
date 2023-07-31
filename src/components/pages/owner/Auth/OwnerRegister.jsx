import { useContext, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {appendErrors, Controller, useForm} from 'react-hook-form';
import './style.css'
import { AuthContext } from '../../../../context/AuthContext';
import { IMAGES } from '../../../../utils/images/images';
import DatePicker from "react-datepicker";
import { ownerRegister } from '../../../../api/owner/auth';
export default function OwnerRegisterPage() { 
    const navigate = useNavigate();
    const { setAuthData, clearAuthData } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm();

    useEffect(() => {
        clearAuthData();
    }, []);

    const onSubmit = async (data) => {
        console.log("Submit")
        const createResult = await ownerRegister(data);
        if (createResult.success) {
            toast.success(createResult.message)
            navigate('/owner/login')
        }
        else toast.error(createResult.message)
    };

    const handleClickLogin = () => { 
        navigate('/owner/login')
    }
    const handleClickBack = () => {
        navigate('/owner/login')
    }
    return (

        <div className='h-screen flex'>
            <div className='flex w-full items-center bg-white space-y-8'>
                <div className='w-full flex flex-rol space-x-5  px-8 md:px-32 lg:px-24'>
                    <form className='bg-white rounded-md shadow-2xl p-5 w-1/3 h-1/3' onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='text-gray-800 font-bold text-2xl mb-5 underline'>REGISTER</h1>
                        <div className='grid grid-cols-3 gape-2'>
                            <div className='mb-3 col-span-2'>
                                <div className='space-y-2 items-center'>
                                    <div className=''> Name </div>
                                    <div className='px-2'>
                                        <input
                                            id='name'
                                            className=' w-full pl-2 outline-none text-base text-[#757575] border-2 py-1 px-3 rounded-lg'
                                            type='text'
                                            placeholder='name'
                                            {...register('name', { required: true })}
                                        />
                                    </div>
                                </div>
                                {errors.name && errors.name.type === 'required' && <p>⚠ This field is required!</p>}
                            </div>
                            <div className='mb-3 col-span-1'>
                                <div className='space-y-2 items-center'>
                                    <div className=''> Phone number </div>
                                    <div className='px-2'>
                                        <input
                                            id='phone_number'
                                            className=' w-full pl-2 outline-none text-base text-[#757575] border-2 py-1 px-3 rounded-lg'
                                            type='text'
                                            placeholder='Phone number'
                                            {...register('phone_number', { required: true, minLength: 6 })}
                                        />
                                    </div>
                                </div>
                                {errors.phone_number && errors.phone_number.type === 'required' && <p>⚠ This field is required!</p>}
                                {errors.phone_number && errors.phone_number.type === 'minLength' && <p>⚠ Zalo number cannot be less than 6 characters!</p>}
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-2'>
                            <div className='mb-3 col-span-1'>
                                <div className='space-y-2 items-center'>
                                    <div className=''> Zalo number </div>
                                    <div className='px-2'>
                                        <input
                                            id='zalo_number'
                                            className=' w-full pl-2 outline-none text-base text-[#757575] border-2 py-1 px-3 rounded-lg'
                                            type='text'
                                            placeholder='Zalo number'
                                            {...register('zalo_number', { required: true, minLength: 6 })}
                                        />
                                    </div>
                                </div>
                                {errors.zalo_number && errors.zalo_number.type === 'required' && <p>⚠ This field is required!</p>}
                                {errors.zalo_number && errors.zalo_number.type === 'minLength' && <p>⚠ Zalo number cannot be less than 6 characters!</p>}
                            </div>
                            
                            <div className='mb-3 col-span-2'>
                                <div className='mb-3 col-span-2'>
                                    <div className='space-y-2 items-center'>
                                        <div className=''> Facebook </div>
                                        <div className='px-2'>
                                            <input
                                                id='facebook'
                                                className=' w-full pl-2 outline-none text-base text-[#757575] border-2 py-1 px-3 rounded-lg'
                                                type='text'
                                                placeholder='Facebook'
                                                {...register('facebook', { required: true })}
                                            />
                                        </div>
                                    </div>
                                    {errors.facebook && errors.facebook.type === 'required' && <p>⚠ This field is required!</p>}
                                </div>
                            </div>
                        </div>

                        <div className='mb-3 col-span-2'>
                                <div className='space-y-2 items-center'>
                                    <div className=''> Email address </div>
                                    <div className='px-2'>
                                        <input
                                            id='email'
                                            className=' w-full pl-2 outline-none text-base text-[#757575] border-2 py-1 px-3 rounded-lg'
                                            type='email'
                                            placeholder='Email'
                                            {...register('email', { required: true })}
                                        />
                                    </div>
                                </div>
                                {errors.email && errors.email.type === 'required' && <p>⚠ This field is required!</p>}
                            </div>

                        <div className='grid grid-cols-2 gap-2 '>
                            <div className='mb-3'>
                                <div className='space-y-2 items-center'>
                                    <div className=''> Password </div>
                                    <div className='px-2'>
                                        <input
                                            id='password'
                                            className=' w-full pl-2 outline-none text-base text-[#757575] border-2 py-1 px-3 rounded-lg'
                                            type='password'
                                            placeholder='Password'
                                            {...register('password', { required: true, minLength: 6 })}
                                        />
                                    </div>
                                </div>
                                {errors.password && errors.password.type === 'required' && <p>⚠ This field is required!</p>}
                                {errors.password && errors.password.type === 'minLength' && <p>⚠ Password cannot be less than 6 characters!</p>}

                            </div>
                        </div>

                        <div className='mt-5 w-full flex justify-between'>
                            <div className='flex flex-col justify-between'>
                                <span className='text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all' onClick={handleClickBack}>
                                    Back to home page
                                </span>
                                <span className='text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all' onClick={handleClickLogin}>
                                Have account?
                              </span>
                            </div>
                            <button                               
                                type='submit'
                                className='block w-1/2 bg-indigo-600 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2'
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <img className='w-2/3 max-h-[800px]' src={"https://images.unsplash.com/photo-1563889362352-b0492c224f62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"}/>
                </div>
            </div>
        </div>
    );
}