import {IMAGES} from "../utils/images/images";


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
        element: <div/>,
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