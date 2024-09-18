import React, { useEffect, useState } from 'react';
import Card from "../Card/Card";
import { getMeal, useAPI } from "../../../context/api/api";
import { useParams, useSearchParams } from 'react-router-dom';

const MAX_PAGE_ITEMS = 12;

export default function Cards({ url = "" })
{
    const [cardList, setCardList] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageNumber, setPageNumber] = useState(parseInt(searchParams.get("page")) || 1);
    const { meals } = useAPI();


    useEffect(() =>
    {
        (async () =>
        {
            if (!meals) return;

            const data = await Promise.all(meals.map(async (meal) =>
            {
                const mealData = await getMeal(meal.idMeal);
                return {
                    id: mealData.idMeal,
                    name: mealData.strMeal,
                    category: mealData.strCategory,
                    country: mealData.strArea,
                    tags: mealData.strTags?.split(','),
                    image: mealData.strMealThumb
                };
            }));

            setCardList(data);

        })();
    }, [meals]);

    useEffect(() =>
    {
        setSearchParams({ page: pageNumber });

        window.scroll({
            top: 0,
            behavior: 'smooth'
        });

    }, [pageNumber]);

    const start = (pageNumber - 1) * MAX_PAGE_ITEMS;
    const end = start + MAX_PAGE_ITEMS;


    return (
        <section className='mt-36 mb-20 md:mx-16 mx-8'>
            {!cardList && <div className='flex justify-center my-20'><span className="loading loading-spinner loading-lg"></span></div>}
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10'>
                {cardList?.slice(start, end).map((meal, idx) => <Card key={idx} cardData={meal}></Card>)}
            </div>
            <div className="mt-12 flex justify-center gap-2">
                {cardList && <>
                    <button className={`${pageNumber <= 1 ? "btn-disabled bg-gray-700 text-black border-black opacity-45" : 'bg-blue-600'} px-1 py-1 border-solid border-2 font-bold rounded-md text-white transition-transform duration-300 ease-in-out transform hover:scale-110`}
                        onClick={() => setPageNumber(pageNumber - 1)}>&lt; &lt; Previous Page</button>
                    <div className="rounded-btn flex items-center justify-center bg-gray-200">
                        <h1 className="font-bold text-black px-2">{pageNumber}</h1>
                    </div>
                    <button className={`${Math.ceil(cardList.length / MAX_PAGE_ITEMS) <= pageNumber ? "btn-disabled bg-gray-700 text-black border-black opacity-45" : 'bg-blue-600'} font-bold border-solid border-2 px-2 py-1 rounded-md text-white transition-transform duration-300 ease-in-out transform hover:scale-110`}
                        onClick={() => setPageNumber(pageNumber + 1)}>Next Page &gt;&gt;</button>
                </>}
            </div>
        </section>
    );
}
