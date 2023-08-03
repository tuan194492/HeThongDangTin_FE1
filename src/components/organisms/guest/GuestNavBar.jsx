import {HeaderWrapper, Image} from "../../../style/styled";
import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {IMAGES} from "../../../utils/images/images";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const projectName = process.env.PROJECT_NAME || 'HOME RENTER';
  const navigate = useNavigate()
  return (
      <HeaderWrapper className="w-full fixed top-0">
        <nav className='border-0 flex w-screen justify-between px-10 py-5 items-center z-10 bg-white'>
          <div className='flex items-center'>
            <img height={55} width={55} src={IMAGES.icon.appLogo}/>
            <h1 className='text-2xl text-black font-bold' style={{marginLeft : 10}}> {projectName}</h1>
          </div>
          <div className='flex items-center'>
            <div className='md:flex items-center border-2 hover:border-gray-400  px-2 py-1 border-gray-200  rounded-md bg-white hidden mr-[20px]'>
              <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 pt-0.5 text-gray-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='5' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
              <input className='ml-2  bg-white outline-0 ' type='text' name='search' id='search' placeholder='Search...' />

              
            </div>
            <button className="md:flex bg-slate-100 items-center  border-2 hover:border-gray-400  px-2 py-1 border-gray-200  rounded-md bg-white hidden">
                <p className="text-blue-400  mr-[10px]">Login</p>
                <FontAwesomeIcon icon={faSignIn} className="ml-[10px]"/>
            </button>
          </div>
        </nav>
      </HeaderWrapper>
  );
}
