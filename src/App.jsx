import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/NavBar/NavBar';
import APIProvider from './context/api/api';
import { Outlet } from 'react-router-dom';


function App()
{

  return (
    <>
      <APIProvider>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </APIProvider>
      <Footer></Footer>
    </>
  );
}

export default App;
