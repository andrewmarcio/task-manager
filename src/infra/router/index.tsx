import { memo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const Router = memo(() => {
    return <RouterProvider router={createBrowserRouter(routes)} />
});

export { Router };
