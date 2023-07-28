import {IMAGES} from "../utils/images/images";
import UserManage from "../components/pages/admin/user/UserManage";

export const adminRoute = [
    {
        title: 'Dashboard',
        path: '/admin/dashboard',
        element: <div/>,
        icon: IMAGES.icon.table,
        subRoute: [],
        able : 1
    },
    {
        title: 'User',
        path: '/admin/user/',
        icon: IMAGES.icon.personal,
        element: <UserManage/>,
        subRoute: [],
        able : 1
    },
    {
        title: 'Post',
        path: '/admin/post',
        icon: IMAGES.icon.voucher,
        subRoute: [],
        element: <div/>,
        able : 1
    },
]

export const adminExtraRoute = [
    
]