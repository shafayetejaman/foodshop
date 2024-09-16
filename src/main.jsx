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
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
