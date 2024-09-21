import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import App from './App';
import Cards from "./components/MainSection/Cards/Cards";
import PageNotFound from './components/PageNotFound/PageNotFound';
import DetailPanel from './components/MainSection/DetailPanel/DetailPanel';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <PageNotFound></PageNotFound>,
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
        path: "/category/:category",
        element: <Cards url="category"></Cards>,
      },
      {
        path: "/origin/:origin",
        element: <Cards url='origin'></Cards>,
      },
      {
        path: "/ingredient/:ingredient",
        element: <Cards url='ingredient'></Cards>,
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(

  <RouterProvider router={router}></RouterProvider>

);
