import {IMAGES} from "../utils/images/images";
import UserManage from "../components/pages/admin/user/UserManage";
import PostManager from "../components/pages/admin/post/PostManager";
import { PostDetail } from "../components/pages/owner/Post/PostDetail";
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
        element: <PostManager/>,
        able : 1
    },
]

export const adminExtraRoute = [
    {
        path: '/admin/post/:id',
        element: <PostDetail />
    }
]