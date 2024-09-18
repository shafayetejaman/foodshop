import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import App from './App';
import Cards from "./components/MainSection/Cards/Cards";
import ErrorPage from './components/ErrorPage/ErrorPage';
import DetailPanel from './components/MainSection/DetailPanel/DetailPanel';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Cards></Cards>,
      },
      {
        path: "/details/:id",
        element: <DetailPanel></DetailPanel>,
      },
      {
        path: "/categories/:categories",
        element: <Cards url="categories"></Cards>,
      },
      {
        path: "/origin/:origin",
        element: <Cards url='origin'></Cards>,
      },
      {
        path: "/ingredients/:ingredient",
        element: <Cards url='ingredients'></Cards>,
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
