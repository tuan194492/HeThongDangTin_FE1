import AdminLayout from "../components/layout/admin/AdminLayout";
import { adminRoute } from "./adminRoutes";

const admin = [...adminRoute], owner = [], guest = [];
adminRoute.map((e) => {
    if (e.subRoute.length) {
        e.subRoute.map((sub) => {
            admin.push({path: sub.path, element: sub.element})
        })
    }
    else admin.push({path: e.path, element: e.element})
})
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