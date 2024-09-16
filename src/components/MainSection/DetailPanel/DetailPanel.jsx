import React, { useState } from 'react';
import { FaYoutube, FaTag, FaGlobeAmericas, FaUtensils } from 'react-icons/fa';

const DetailPanel = () =>
{
    const [isIngredientExpanded, setIsIngredientExpanded] = useState(false);
    const [isRecipeExpanded, setIsRecipeExpanded] = useState(false);

    const meal = {
        name: 'Spicy Thai Basil Chicken',
        image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        youtubeId: 'dQw4w9WgXcQ',
        ingredients: [
            { name: 'Chicken', measurement: '500g' },
            { name: 'Thai Basil', measurement: '1 cup' },
            { name: 'Garlic', measurement: '4 cloves' },
            { name: 'Chili', measurement: '2-3 pcs' },
            { name: 'Fish Sauce', measurement: '2 tbsp' },
            { name: 'Oyster Sauce', measurement: '1 tbsp' },
            { name: 'Sugar', measurement: '1 tsp' },
        ],
        recipe: [
            'Mince the garlic and chili.',
            'Cut the chicken into bite-sized pieces.',
            'Heat oil in a wok or large skillet over high heat.',
            'Add garlic and chili, stir-fry until fragrant.',
            'Add chicken and stir-fry until it changes color.',
            'Add fish sauce, oyster sauce, and sugar. Stir well.',
            'Add Thai basil leaves and stir-fry until wilted.',
            'Serve hot with steamed rice.'
        ],
        tags: ['Spicy', 'Thai Cuisine', 'Quick Meal'],
        origin: 'Thailand',
        category: 'Dinner'
    };

    return (
        <div className="lg:my-32 my-20 mx-2 lg:mx-auto text-white p-6 rounded-lg shadow-lg" style={{
            background: 'linear-gradient(to bottom right, #1a202c, #2d3748)'
        }}>
            <h1 className="text-3xl font-bold mb-4">{meal.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="relative group overflow-hidden rounded-lg">
                        <img
                            src={meal.image}
                            alt={meal.name}
                            className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-110"
                        />
                    </div>
                    <div className='h-64'>
                        <iframe
                            src={`https://www.youtube.com/embed/${meal.youtubeId}`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
                            allowFullScreen
                            className="w-full h-full rounded-lg"
                        ></iframe>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2 flex items-center">
                            <FaUtensils className="mr-2" /> Ingredients
                        </h2>
                        <div className={`transition-all duration-300 ${isIngredientExpanded ? 'max-h-96' : 'max-h-32'} overflow-hidden`}>
                            <ul className="list-disc list-inside">
                                {meal.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient.name} - {ingredient.measurement}</li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => setIsIngredientExpanded(!isIngredientExpanded)}
                            className="text-blue-400 hover:text-blue-300 mt-2 focus:outline-none"
                        >
                            {isIngredientExpanded ? 'Show Less' : 'Show More'}
                        </button>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Recipe</h2>
                        <div className={`transition-all duration-300 ${isRecipeExpanded ? 'max-h-96' : 'max-h-32'} overflow-hidden`}>
                            <ol className="list-decimal list-inside">
                                {meal.recipe.map((step, index) => (
                                    <li key={index} className="mb-2">{step}</li>
                                ))}
                            </ol>
                        </div>
                        <button
                            onClick={() => setIsRecipeExpanded(!isRecipeExpanded)}
                            className="text-blue-400 hover:text-blue-300 mt-2 focus:outline-none"
                        >
                            {isRecipeExpanded ? 'Show Less' : 'Show More'}
                        </button>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2 flex items-center">
                            <FaTag className="mr-2" /> Tags
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {meal.tags.map((tag, index) => (
                                <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <FaGlobeAmericas className="mr-2" />
                        <span className="font-semibold">Origin:</span>
                        <span className="ml-2">{meal.origin}</span>
                    </div>

                    <div className="flex items-center">
                        <FaUtensils className="mr-2" />
                        <span className="font-semibold">Category:</span>
                        <span className="ml-2">{meal.category}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPanel;