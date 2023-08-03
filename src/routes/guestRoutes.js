import PostManager from "../components/pages/guest/post/PostManager"
import { PostDetail } from "../components/pages/guest/post/PostDetail"

export const guestRoute = [
    {
        path: '/guest/post',
        element: <PostManager/>,
    },
    {
        path: '/guest/post/:id',
        element: <PostDetail/>,
    }
]