import AdminLayout from "../components/layout/admin/AdminLayout";
const admin = [], owner = [], guest = [];

export const routes = [
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: admin
    },
    {
        path: '/admin/login',
        element: <AdminLayout/>,
    },
    {
        path: '/owner',
        element: <div/>,
        children: owner
    },
    {
        path: '/owner/login',
        element: <div/>,
        subRoute: []
    },
    {
        path: '/owner/register',
        element: <div/>,
        subRoute: []
    },
    {
        path: '/',
        element: <div/>,
        children: guest
    }
];