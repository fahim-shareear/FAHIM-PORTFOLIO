import {createBrowserRouter} from "react-router";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../layouts/ErrorPage";
import Home from "../pages/Home";


const routes = createBrowserRouter([
    {
        path: '/', Component: RootLayout,
        errorElement: ErrorPage,
        children: [
            {index: true, Component: Home}
        ]
    }
]);

export default routes;