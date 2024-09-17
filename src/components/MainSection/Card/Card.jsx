import React from 'react';
import { FaUtensils, FaWeight, FaTags, FaReact } from 'react-icons/fa';
import { FaUniversity } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Card = ({ cardData }) =>
{

    return (
        <div className="overflow-hidden rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
            style={{
                background: 'linear-gradient(to bottom right, #1a202c, #2d3748)'
            }}>
            <img
                className="w-full h-48 object-cover"
                src={cardData.image}
                alt={cardData.name}
            />
            <div className="px-6 py-4">
                <h2 className="mb-2 text-2xl font-bold text-white">{cardData.name}</h2>
                <div className="flex justify-between items-center mt-3">
                    <div>
                        <p className="mb-2 text-sm text-gray-300 flex items-center">
                            <FaUtensils className="mr-2" />
                            {cardData.category}
                        </p>
                        <p className="mb-2 text-sm text-gray-300 flex items-center">
                            <FaUniversity className="mr-2" />
                            {cardData.country}
                        </p>
                    </div>
                    <Link to={`/details/${cardData.id}`} className="btn btn-sm bg-blue-600 text-white text-lg">Detail</Link>

                </div>
            </div>
            <div className="px-6 pt-4 pb-2">
                <div className="flex items-center mb-3">
                    <FaTags className="mr-2 text-gray-300" />
                    <span className="text-sm text-gray-300">Tags:</span>
                </div>
                {cardData.tags?.map((tag, idx) => (
                    <span
                        key={idx}
                        className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Card;