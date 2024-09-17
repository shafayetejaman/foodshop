import React, { useEffect, useState } from 'react';
import Card from "../Card/Card";
import { getMeal, useAPI } from "../../../context/api/api";
import { useNavigate, useSearchParams } from 'react-router-dom';

const MAX_PAGE_ITEMS = 12;

export default function Cards()
{
    const [cardList, setCardList] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const { meals } = useAPI();
    const navigate = useNavigate();

    useEffect(() =>
    {
        (async () =>
        {
            if (!meals) return;

            const data = await Promise.all(meals.map(async (meal) =>
            {
                const mealData = await getMeal(meal?.idMeal);
                return {
                    name: mealData?.strMeal,
                    category: mealData?.strCategory,
                    country: mealData?.strArea,
                    tags: mealData?.strTags?.split(','),
                    image: mealData?.strMealThumb
                };
            }));

            setCardList(data);

        })();
    }, [meals]);

    useEffect(() =>
    {
        navigate(`/?page=${pageNumber}`);

    }, [pageNumber]);

    const start = (pageNumber - 1) * MAX_PAGE_ITEMS;
    const end = start + MAX_PAGE_ITEMS;


    return (
        <section className='my-24 md:mx-16 mx-8'>
            {!cardList && <div className='flex justify-center my-20'><span className="loading loading-spinner loading-lg"></span></div>}
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10'>
                {cardList?.slice(start, end).map((meal, idx) => <Card key={idx} cardData={meal}></Card>)}
            </div>
            <div className="mt-12 flex justify-center gap-2">
                {cardList && <>
                    <button className={`${pageNumber <= 1 ? "btn-disabled" : 'btn-info'} btn-sm font-bold rounded-md btn-outline border-3 border-solid transition-transform duration-300 ease-in-out transform hover:scale-110`}
                        onClick={() => setPageNumber(pageNumber - 1)}>&lt; &lt; Previous Page</button>
                    <div className="px-2 border-solid font-bold rounded-md text-red-500">{pageNumber}</div>
                    <button className={`${Math.ceil(cardList.length / MAX_PAGE_ITEMS) <= pageNumber ? "btn-disabled" : 'btn-success'} font-bold btn-sm rounded-md btn-outline border-3 border-solid transition-transform duration-300 ease-in-out transform hover:scale-110`}
                        onClick={() => setPageNumber(pageNumber + 1)}>Next Page &gt;&gt;</button>
                </>}
            </div>
        </section>
    );
}
