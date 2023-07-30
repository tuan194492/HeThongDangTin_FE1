import Navbar from '../../organisms/admin/Navbar';
import Sidebar from '../../organisms/admin/Sidebar';
import {useState} from "react";
import { WrapperAll, WrapperContent} from '../../../style/styled';
import {Outlet} from "react-router-dom";

export default function OwnerLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
    };
    return (
        <WrapperAll>
            <div className=''>
                <Navbar />
                <WrapperContent className='fixed top-[8%]'>
                    <Sidebar  menuCollapse = {collapsed} setMenuCollapse = {handleCollapsedChange} />
                </WrapperContent>
                <div className='fixed top-[8%] left-[235px] h-[92%] w-[85%] py-[50px] px-[50px] overflow-auto' >
                    <Outlet />
                </div>
            </div>
        </WrapperAll>
    );
}
