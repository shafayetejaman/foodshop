import React, { useState, useEffect } from "react";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";

const Navbar = () =>
{
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() =>
    {
        const handleResize = () =>
        {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleNavbar = () =>
    {
        setIsOpen(!isOpen);
        setActiveDropdown(null);
    };

    const toggleDropdown = (index) =>
    {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const navItems = [
        { title: "Home", link: "#" },
        {
            title: "Products",
            items: ["Electronics", "Clothing", "Books", "Home & Garden", "Toys", "Sports", "Automotive", "Health & Beauty", "Jewelry", "Food & Beverages"]
        },
        {
            title: "Services",
            items: ["Web Development", "Mobile Apps", "UI/UX Design", "Cloud Computing", "Data Analytics", "Cybersecurity", "AI & Machine Learning", "IoT Solutions", "Blockchain", "DevOps"]
        },
        { title: "About", link: "#" },
        { title: "Contact", link: "#" }
    ];

    return (
        <nav className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <span className="text-2xl font-bold">Logo</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item, index) => (
                                <div key={index} className="relative">
                                    {item.items ? (
                                        <button
                                            onClick={() => toggleDropdown(index)}
                                            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition duration-150 ease-in-out flex items-center"
                                        >
                                            {item.title}
                                            <FaChevronDown className="ml-1" />
                                        </button>
                                    ) : (
                                        <a
                                            href={item.link}
                                            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition duration-150 ease-in-out"
                                        >
                                            {item.title}
                                        </a>
                                    )}
                                    {item.items && activeDropdown === index && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 max-h-60 overflow-y-auto">
                                            {item.items.map((subItem, subIndex) => (
                                                <a
                                                    key={subIndex}
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {subItem}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleNavbar}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-95 overflow-y-auto">
                    <div className="px-2 pt-2 pb-3 sm:px-3">
                        {navItems.map((item, index) => (
                            <div key={index} className="mt-1">
                                {item.items ? (
                                    <div>
                                        <button
                                            onClick={() => toggleDropdown(index)}
                                            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition duration-150 ease-in-out w-full text-left flex justify-between items-center"
                                        >
                                            {item.title}
                                            <FaChevronDown />
                                        </button>
                                        {activeDropdown === index && (
                                            <div className="pl-4 mt-2 space-y-1 max-h-60 overflow-y-auto">
                                                {item.items.map((subItem, subIndex) => (
                                                    <a
                                                        key={subIndex}
                                                        href="#"
                                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
                                                    >
                                                        {subItem}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <a
                                        href={item.link}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition duration-150 ease-in-out"
                                    >
                                        {item.title}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-700">
                        <button
                            onClick={toggleNavbar}
                            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:bg-gray-600 transition duration-150 ease-in-out w-full text-center"
                        >
                            Close Menu
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;