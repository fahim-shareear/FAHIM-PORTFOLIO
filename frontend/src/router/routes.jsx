import {createBrowserRouter} from "react-router";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../layouts/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/authentication/Login";
import Authlayout from "../layouts/Authlayout";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/components/Dashboard/DashboardHome";
import ProjectsPost from "../pages/components/Dashboard/ProjectsPost";
import CertificationPost from "../pages/components/Dashboard/CertificationPost";

const routes = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        errorElement: ErrorPage,
        children: [
            { index: true, Component: Home },
        ]
    },
    {
        path: "/", Component: Authlayout,
        children: [
            {path: "login", Component: Login},
        ]
    },
    {
        path: "/dashboard", element: <DashboardLayout></DashboardLayout>,
        children: [
            {index: true, Component: DashboardHome},
            {path: "projects-post", Component: ProjectsPost},
            {path: "certification-post", Component: CertificationPost}
        ]
    }
]);

export default routes;