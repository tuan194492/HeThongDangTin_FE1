const admin = [], owner = [], guest = [];

export const routes = [
    {
        path: '/admin',
        element: <div/>,
        children: admin
    },
    {
        path: '/admin/login',
        element: <div/>,
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
        children: renter
    }
];