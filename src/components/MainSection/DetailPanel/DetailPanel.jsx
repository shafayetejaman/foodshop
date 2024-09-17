import React, { useEffect, useState } from 'react';
import { FaYoutube, FaTag, FaGlobeAmericas, FaUtensils } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getMeal } from "../../../context/api/api";

function getIngredients(mealData)
{
    let result = [];
    for (let idx = 1; idx <= 20; idx++)
    {
        if (!mealData.get(`strIngredient${idx}`)) return result;

        result.concat({ name: mealData.get(`strIngredient${idx}`), measurement: mealData.get(`strMeasure${idx}`) });
    }
    return result;
}

const DetailPanel = () =>
{
    const [isIngredientExpanded, setIsIngredientExpanded] = useState(false);
    const [isRecipeExpanded, setIsRecipeExpanded] = useState(false);
    const params = useParams();
    const [meal, setMeal] = useState(null);

    useEffect(() =>
    {
        (async () =>
        {
            const mealData = await getMeal(params.id);

            setMeal({
                name: mealData?.strMeal,
                image: mealData?.strMealThumb,
                youtubeId: mealData?.strYoutube,
                ingredients: getIngredients(mealData),
                recipe: mealData?.strInstructions.split("."),
                tags: mealData?.strTags?.split(','),
                origin: mealData?.strArea,
                category: mealData?.strCategory
            });

        })();
    }, []);


    return (
        <>
            {!meal && <div className='flex justify-center my-40'><span className="loading loading-spinner loading-lg"></span></div>}
            {meal && <>
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
                                <div className={`transition-all duration-500 ${isIngredientExpanded ? 'max-h-96' : 'max-h-24'} overflow-hidden`}>
                                    <ul className="list-disc list-inside">
                                        {meal.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient.name} - {ingredient.measurement}</li>
                                        ))}
                                    </ul>
                                </div>
                                {meal.ingredients.length > 4 &&

                                    <button
                                        onClick={() => setIsIngredientExpanded(!isIngredientExpanded)}
                                        className="text-blue-400 hover:text-blue-300 mt-2 focus:outline-none"
                                    >
                                        {isIngredientExpanded ? 'Show Less' : 'Show More'}
                                    </button>
                                }
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-2">Recipe</h2>
                                <div className={`transition-all duration-500 ${isRecipeExpanded ? 'max-h-96' : 'max-h-24'} overflow-hidden`}>
                                    <ol className="list-decimal list-inside">
                                        {meal.recipe.map((step, index) => (
                                            <li key={index} className="mb-2">{step}</li>
                                        ))}
                                    </ol>
                                </div>
                                {meal.recipe.length > 4 &&

                                    <button
                                        onClick={() => setIsRecipeExpanded(!isRecipeExpanded)}
                                        className="text-blue-400 hover:text-blue-300 mt-1 focus:outline-none"
                                    >
                                        {isRecipeExpanded ? 'Show Less' : 'Show More'}
                                    </button>
                                }
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
            </>}
        </>
    );
};

export default DetailPanel;