import React, { useState, useEffect } from 'react';
import { FaHome, FaCarrot, FaList, FaSearch, FaBars, FaTimes, FaUniversity } from 'react-icons/fa';
import { NavLink, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAPI } from '../../context/api/APIProvider';
import { FaAngleRight } from 'react-icons/fa6';
import { RiArrowDownSLine } from "react-icons/ri";
import { useSearchBox } from '../../context/search/SearchProvider';


function NavBar() 
{
    const [isOpen, setIsOpen] = useState(false);
    const { category, country, ingredient } = useAPI();
    const location = useLocation();
    const path = [... new Set(location.pathname.split("/"))];
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const navigate = useNavigate();
    const { searchBox, setSearchBox } = useSearchBox();

    const changeSearchBox = (event) =>
    {
        setSearchBox(event.target.value);
    };

    const navItems = [
        { name: 'Home', to: "/", icon: <FaHome />, dropdownItems: [] },
        {
            name: 'Ingredient', to: "/ingredient", icon: <FaCarrot />, dropdownItems: ingredient ? ingredient.map(ing => ing.strIngredient
            ) : []
        },
        { name: 'Origin', to: "/origin", icon: <FaUniversity />, dropdownItems: country ? country.map(cou => cou.strArea) : [] },
        { name: 'Category', to: "/category", icon: <FaList />, dropdownItems: category ? category.map(cat => cat.strCategory) : [] },
    ];


    useEffect(() =>
    {
        const handleScroll = () =>
        {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY)
            {
                setIsScrollingUp(false);
                setIsOpen(false);
            }
            else
            {
                setIsOpen(false);
                setIsScrollingUp(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);


        return () =>
        {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [lastScrollY]);

    const toggleMenu = () =>
    {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = (idx) =>
    {
        if (idx == 0)
        {
            navigate('/?page=1');
        }
        else
        {
            setActiveDropdown(activeDropdown === idx ? null : idx);
            setIsOpen(isOpen === idx ? null : idx);
        }
    };


    return (

        <nav
            className={`fixed top-0 w-full bg-gray-900 text-white z-50 transition-all duration-200 ease-in-out ${isScrollingUp ? `transform md:-translate-y-14 ${isOpen ? "-translate-y-3/4" : "-translate-y-14"}` : 'transform translate-y-0'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    <div className="flex items-center">
                        <Link to={'/?page=1'} className="flex-shrink-0 text-2xl font-bold">FoodShop</Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item, idx) => (
                                <div key={idx} className="relative group">
                                    <NavLink
                                        to={"/?page=1"}
                                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-75 hover:text-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-black flex items-center transition-all duration-200 ease-in-out"
                                    >
                                        {item.icon}
                                        <span className="mx-2">{item.name}</span>
                                        {item.dropdownItems.length > 0 && <RiArrowDownSLine />}
                                    </NavLink>
                                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-slate-600 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out max-h-96 overflow-auto">
                                        <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            {item.dropdownItems.map((dropdownItem, idx) => (
                                                <Link
                                                    key={idx}
                                                    to={`${item.to}/${dropdownItem.replace(/\s+/g, "-").toLowerCase()}/?page=1`}

                                                    className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                >
                                                    {dropdownItem}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    type="text"
                                    className="block pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-white placeholder-gray-400 focus:border-white sm:text-sm transition-all duration-200 ease-in-out"
                                    placeholder="Search"
                                    value={searchBox}
                                    onChange={changeSearchBox}
                                />
                            </div>

                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-all duration-200 ease-in-out"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <FaTimes className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <FaBars className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navItems.map((item, idx) => (
                        <div key={idx} className="relative">
                            <button
                                onClick={() => toggleDropdown(idx)}
                                className="flex w-full p-3 rounded-md justify-between items-center font-medium hover:bg-gray-700 transition-all duration-200 ease-in-out"
                            >
                                <div className="flex items-center">
                                    {item.icon}
                                    <span className="ml-3">{item.name}</span>
                                </div>
                                {
                                    item.dropdownItems.length > 0 &&
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${isOpen === idx ? "transform rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                }
                            </button>
                            <div
                                className={`mt-2 w-full rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out overflow-scroll ${isOpen === idx ? "opacity-100 visible max-h-60" : "max-h-0 opacity-0 invisible"}`}
                            >
                                <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {item.dropdownItems.map((dropdownItem, idx) => (
                                        <Link key={idx} to={`${item.to}/${dropdownItem.replace(/\s+/g, "-").toLowerCase()}/?page=1`}>
                                            <div className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600 transition-all duration-200"
                                                role="menuitem"
                                            >
                                                {dropdownItem}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                // border border-transparent rounded-md leading-5 bg-gray-700 text-white placeholder-gray-400 focus:border-white sm:text-sm transition-all duration-200 ease-in-out
                                className="block w-full pl-10 pr-3 py-2 border-2 border-transparent rounded-md leading-5 bg-gray-700 text-white placeholder-gray-400 focus:border-white sm:text-sm transition-all duration-200 ease-in-out"
                                placeholder="Search"
                                value={searchBox}
                                onChange={changeSearchBox}
                            />
                        </div>

                    </div>
                </div>

            </div>

            <div className="bg-gray-800 text-gray-300 p-2 text-sm">
                <div className="container mx-auto">
                    {path.map((val, idx) => <span key={idx}>{val ? val.replace(/-/g, " ") : "Home"}<FaAngleRight className='inline-block mx-2'></FaAngleRight></span>)}
                </div>
            </div>
        </nav>

    );
};

export default NavBar;;