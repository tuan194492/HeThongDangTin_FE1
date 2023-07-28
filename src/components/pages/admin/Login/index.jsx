import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../../../api/admin/auth/request';
import { appendErrors, useForm } from 'react-hook-form';
import { AuthContext } from '../../../../context/AuthContext';
import {RoleEnum} from "../../../../utils/enum/roles.enum";
import {IMAGES} from "../../../../utils/images/images";
export default function AdminLoginPage() {
    const navigate = useNavigate();
    const { setAuthData, clearAuthData } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        clearAuthData();
    });

    const onSubmit = async (data) => {
        const response = await adminLogin(data);
        if (response.success) {
            console.log(response.data)
            const { token, user, role} = response.data
            if (role === RoleEnum.ADMIN) {
                toast.success(response.message);
                setAuthData(token, role, user);
                navigate('/admin');
            }
            else {
                toast.error("Customer cannot login in this page!");
            }
        } else {
            toast.error(response.message);
        }
    };

    return (
        <div className='h-screen flex flex-row justify-center items-center w-4/5 mx-auto' >
            <div>
                <img className="h-72" src={IMAGES.icon.appLogo} />
            </div>
            <div className='flex w-full lg:w-1/2 justify-center items-center space-y-8'>
                <div className='w-full px-8 md:px-32 lg:px-24'>
                    <form className='bg-white rounded-md shadow-xl p-5' onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='text-gray-800 font-bold text-2xl mb-14 underline'>Admin login</h1>
                        <p className='text-sm font-normal text-gray-600 mb-8'></p>
                        <div className='mb-5 text-red-500 text-xs'>
                            <div className='flex items-center border-2 mb-1 py-2 px-3 rounded-md'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5 text-gray-400'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                                    />
                                </svg>
                                <input
                                    id='email'
                                    className='ml-2 bg-white pl-2 w-full outline-none border-none text-base text-[#757575]'
                                    type='username'
                                    placeholder='User name'
                                    {...register('email', { required: true, minLength: 6 })}
                                />
                            </div>
                            {errors?.email?.type === 'required' && <p>⚠ This field is required!</p>}
                            {errors?.email?.type === 'minLength' && <p>⚠ Username cannot be less than 6 characters!</p>}
                        </div>
                        <div className=' text-red-500 text-xs mb-9'>
                            <div className='flex items-center border-2 mb-1 py-2 px-3 rounded-md '>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-gray-400' viewBox='0 0 20 20' fill='currentColor'>
                                    <path
                                        fillRule='evenodd'
                                        d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                                <input
                                    className='ml-2 pl-2 w-full outline-none border-none text-base text-[#757575]'
                                    type='password'
                                    id='password'
                                    placeholder='Password'
                                    {...register('password', { required: true })}
                                />
                            </div>
                            {errors?.password?.type === 'required' && <p>⚠ This field is required!</p>}
                            {errors?.password?.type === 'minLength' && <p>⚠ Password cannot be less than 6 characters!</p>}
                        </div>
                        <div className='w-full flex justify-between'>
                            <button
                                type='submit'
                                className='block w-2/3 bg-indigo-600 py-2 rounded-md hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2'
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}