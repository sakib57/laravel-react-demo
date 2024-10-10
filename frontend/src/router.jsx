import { createBrowserRouter } from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";
import DefaultLayout from "./components/layouts/default";
import GuestLayout from "./components/layouts/guest";
import Users from "./views/users";
import UserForm from "./views/forms/userForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/users/new",
                element: <UserForm key="UserCreate" />,
            },
            {
                path: "/users/:id",
                element: <UserForm key="UserUpdate"/>,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    }
]);

export default router;
