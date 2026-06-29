import {createBrowserRouter} from "react-router";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../layouts/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/authentication/Login";
import Registration from "../pages/authentication/Registration";

const routes = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        errorElement: ErrorPage,
        children: [
            { index: true, Component: Home },
            {path: "login", Component: Login},
            {path: "registration",Component: Registration}
        ]
    }
]);

export default routes;