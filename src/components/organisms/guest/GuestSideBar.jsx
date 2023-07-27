import {adminExtraRoute, adminRoute} from '../../../routes/adminRoute';
import {CollapseIconButton, collapseIcon, expandIcon, WrapperSideBar, WrapperOwnerSideBar} from '../../../style/styled';
import {FC, useContext} from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import { renterRoute, renterDetailRoute, renterExtraRoute } from '../../../routes/renterRoute';




const Sidebar = ({ menuCollapse, setMenuCollapse }) => {
    const navigate = useNavigate()
    const arrayRoute = renterRoute;
    return (
        <WrapperOwnerSideBar style={{ width: !menuCollapse ? '250px' : '100px'}}>
            <ProSidebar collapsed={menuCollapse}>
                <SidebarContent
                    style={{
                        marginTop: '5px',
                        flexGrow: '0.9'
                    }}
                >
                    { arrayRoute.map((item, index) => {
                        return (<Menu iconShape="square" key={item.path}>
                            <MenuItem
                                active={item.path === window.location.pathname || (index === 0 && window.location.pathname === '/')}
                                key = {item.path}
                                icon={item.icon}
                                onClick = {() => navigate(item.path || '')}
                                style={{
                                    font: 'normal normal normal 12px',
                                }}
                            >
                                {item.title}
                            </MenuItem>
                        </Menu>)
                    })}
                </SidebarContent>
                <SidebarFooter>
                    <Menu iconShape="square">
                        {renterExtraRoute.map((item) => (
                            <MenuItem
                                active={item.path === window.location.pathname}
                                onClick = {() => navigate(item.path || '')}
                                key={item.path}
                                icon={item.icon}
                                style={{
                                    font: 'normal normal normal 12px '
                                }}
                            >
                                {item.title}
                            </MenuItem>
                        ))}
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        </WrapperOwnerSideBar>
    );
};

export default Sidebar;

