import {IMAGES} from "../utils/images/images";
import PostCreate from "../components/pages/owner/Post/PostCreate";
import PostManager from "../components/pages/owner/Post/PostManager";
import { PostDetail } from "../components/pages/owner/Post/PostDetail";
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
        subRoute: [
            
        ],
        element: <PostManager/>,
        able : 1
    },
]

export const ownerExtraRoute = [
    {
        path: '/owner/post/create',
        element: <PostCreate/>
    },
    {
        path: '/owner/post/:id',
        element: <PostDetail />
    }
]