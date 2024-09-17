import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import MainSection from "./components/MainSection/Cards/Cards";
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
        element: <MainSection></MainSection>,

      },
      {
        path: "/details/:id",
        element: <DetailPanel></DetailPanel>,

      },
      {
        path: "/categories/:name",
        element: <h1 className="my-96">"/categories/:name",</h1>,
      },
      {
        path: "/origin/:name",
        element: <h1 className="my-96">"/origin/:name",</h1>,
      },
      {
        path: "/ingredients/:name",
        element: <h1 className="my-96">"/ingredients/:name",</h1>,
      },
      {
        path: "/details",
        element: <h1 className="my-96">"/details",
          element:</h1>,

      },
      {
        path: "/categories",
        element: <h1 className="my-96">"/categories",
          element:</h1>,
      },
      {
        path: "/origin",
        element: <h1 className="my-96">"/origin",
          element:</h1>,
      },
      {
        path: "/ingredients",
        element: <h1 className="my-96">"/ingredients",
          element:</h1>,
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
