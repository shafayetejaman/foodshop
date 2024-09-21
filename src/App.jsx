import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/NavBar/NavBar';
import APIProvider from './context/api/APIProvider';
import { Outlet } from 'react-router-dom';
import SearchProvider from './context/search/SearchProvider';


function App()
{

  return (
    <>
      <APIProvider>
        <SearchProvider>
          <Navbar></Navbar>
          <Outlet></Outlet>
        </SearchProvider>
      </APIProvider>
      <Footer></Footer>
    </>
  );
}

export default App;
