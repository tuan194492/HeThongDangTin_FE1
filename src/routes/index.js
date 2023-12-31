import AdminLayout from "../components/layout/admin/AdminLayout";
import AdminLoginPage from "../components/pages/admin/Login";
import OwnerLayout from "../components/layout/owner/OwnerLayout";
import OwnerLoginPage from "../components/pages/owner/Auth/OwnerLogin";
import OwnerRegisterPage from "../components/pages/owner/Auth/OwnerRegister";
import { adminRoute, adminExtraRoute } from "./adminRoutes";
import { ownerRoute, ownerExtraRoute } from "./ownerRoute";
import { guestRoute } from "./guestRoutes";
import GuestLayout from "../components/layout/guest/GuestLayout";
const admin = [...adminRoute], owner = [], guest = [];
adminRoute.map((e) => {
    if (e.subRoute.length) {
        e.subRoute.map((sub) => {
            admin.push({path: sub.path, element: sub.element})
        })
    }
    else admin.push({path: e.path, element: e.element})
})

guestRoute.map((e) => {
    guest.push({path: e.path, element: e.element})
})


adminExtraRoute.map((e) => {
    admin.push({path: e.path, element: e.element})
})

ownerRoute.map((e) => {
    if (e.subRoute.length) {
        e.subRoute.map((sub) => {
            owner.push({path: sub.path, element: sub.element})
        })
    }
    else owner.push({path: e.path, element: e.element})
})

ownerExtraRoute.map((e) => {
    owner.push({path: e.path, element: e.element})
})

export const routes = [
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: admin
    },
    {
        path: '/admin/login',
        element: <AdminLoginPage/>,
    },
    {
        path: '/owner',
        element: <OwnerLayout/>,
        children: owner
    },
    {
        path: '/owner/login',
        element: <OwnerLoginPage/>
    },
    {
        path: '/owner/register',
        element: <OwnerRegisterPage/>
    },
    {
        path: '/guest',
        element: <GuestLayout/>,
        children: guest
    },
    
];