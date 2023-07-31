import {WrapperOwnerSideBar} from '../../../style/styled';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {useNavigate} from "react-router-dom";
import {ownerRoute, ownerExtraRoute} from "../../../routes/ownerRoute";




const Sidebar = ({ menuCollapse, setMenuCollapse }) => {
    const navigate = useNavigate()
    const arrayRoute = ownerRoute;
    return (
        <WrapperOwnerSideBar style={{ width: !menuCollapse ? '250px' : '100px'}}>
            <ProSidebar collapsed={menuCollapse}>
                <SidebarContent
                    style={{
                        marginTop: '5px',
                    }}
                >
                    { arrayRoute.map((item, index) => {
                        return (<Menu iconShape="square" key={item.path}>
                            <MenuItem
                                active={window.location.pathname.includes(item.path) || (index === 0 && window.location.pathname === '/')}
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
                        {ownerExtraRoute.map((item) => (
                            <MenuItem
                                active={window.location.pathname.includes(item.path)}
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

