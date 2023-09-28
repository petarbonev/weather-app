import React, { FC, memo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Root route</div>,
    },
]);

const Router: FC = () => <RouterProvider router={router} />;

export default memo(Router);

