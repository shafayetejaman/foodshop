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
        element: <Navigate to="page/1" />,
      },
      {
        path: "page/:page",
        element: <Cards></Cards>,
      },
      {
        path: "/details/:id",
        element: <DetailPanel></DetailPanel>,
      },
      {
        path: "/categories/",
        element: <Cards url="/categories"></Cards>,

        children: [
          {
            path: ":category/page/:page",
            element: <Cards url="/categories"></Cards>,
          }
        ]
      },
      {
        path: "/origin/",
        element: <Cards url='origin'></Cards>,
        children: [
          {
            path: ":origin/page/:page",
            element: <Cards url='/origin'></Cards>,
          }
        ]
      },
      {
        path: "/ingredients/",
        element: <Cards url='/ingredients'></Cards>,
        children: [
          {
            path: ":ingredient/page/:page",
            element: <Cards url='/ingredients'></Cards>,
          }
        ]
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
