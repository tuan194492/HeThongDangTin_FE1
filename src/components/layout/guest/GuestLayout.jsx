import { WrapperAll, WrapperContent} from '../../../style/styled';
import {Outlet} from "react-router-dom";
import Navbar from '../../organisms/guest/GuestNavBar';
export default function GuestLayout() {
    return (
        <WrapperAll>
            <div className=''>     
                <Navbar />
                <div className='fixed top-[8%] left-[235px] h-[92%] w-[85%] py-[50px] px-[50px] overflow-auto' >
                    <Outlet />
                </div>
            </div>
        </WrapperAll>
    );
}
