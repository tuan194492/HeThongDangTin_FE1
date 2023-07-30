import {IMAGES} from "../utils/images/images";

export const ownerRoute = [
    {
        title: 'Dashboard',
        path: '/owner/dashboard',
        element: <div/>,
        icon: IMAGES.icon.table,
        subRoute: [],
        able : 1
    },
    {
        title: 'Post',
        path: '/owner/post',
        icon: IMAGES.icon.voucher,
        subRoute: [],
        element: <div/>,
        able : 1
    },
]

export const ownerExtraRoute = [
    
]