import React, { useEffect, useState } from 'react';
import Card from "../Card/Card";
import { getMeal, useAPI, getMealByCategory, getMealByCountry, getMealByIngredient } from "../../../context/api/APIProvider";
import { useParams, useSearchParams } from 'react-router-dom';
import { useSearchBox } from '../../../context/search/SearchProvider';
import { useMemo } from 'react';

const MAX_PAGE_ITEMS = 12;

function scrollTop()
{
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
}

export default function Cards({ url })
{
    const [cardList, setCardList] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageNumber, setPageNumber] = useState(1);
    const [mealList, setMealList] = useState(null);
    const params = useParams();
    const { meals } = useAPI();
    const { searchBox, setSearchBox } = useSearchBox();
    const [filteredList, setFilteredList] = useState(null);


    useEffect(() =>
    {
        (async () =>
        {
            switch (url)
            {
                case "ingredient":
                    setMealList(await getMealByIngredient(params.ingredient.replace(/-/g, "_")));
                    break;

                case "origin":
                    setMealList(await getMealByCountry(params.origin.replace(/-/g, "_")));
                    break;

                case "category":
                    setMealList(await getMealByCategory(params.category.replace(/-/g, "_")));
                    break;

                default:
                    if (meals)
                    {
                        setMealList(meals);
                    }
                    break;
            }
        })();

    }, [meals, params[url]]);


    useEffect(() =>
    {
        (async () =>
        {
            if (!mealList) return;

            scrollTop();
            setPageNumber(1);
            setCardList(null);

            const data = await Promise.all(mealList.map(async (meal) =>
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
            setFilteredList(data);

        })();

    }, [mealList]);


    useEffect(() =>
    {
        if (searchBox.length == 0)
        {
            setSearchParams({ page: pageNumber });
            setFilteredList(cardList);
            return;
        }

        let search = searchBox.toLowerCase();
        setSearchParams({ page: pageNumber, search: search });

        const newList = useMemo(() =>
        {
            return cardList.filter(item => (
                item.name?.toLowerCase().includes(search) ||
                item.category?.toLowerCase().includes(search) ||
                item.country?.toLowerCase().includes(search) ||
                item.tags?.includes(val => val.toLowerCase().includes(search))
            ));
            
        }, [searchBox, cardList]);

        setFilteredList(newList);

    }, [searchBox]);



    useEffect(() =>
    {
        setSearchParams({ page: pageNumber });
        scrollTop();

    }, [pageNumber]);

    const start = (pageNumber - 1) * MAX_PAGE_ITEMS;
    const end = start + MAX_PAGE_ITEMS;


    return (
        <section className='mt-36 mb-20 md:mx-16 mx-8'>
            {!cardList && <div className='flex justify-center my-20'><span className="loading loading-spinner loading-lg"></span></div>}
            {filteredList && <>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10'>
                    {filteredList?.slice(start, end).map((meal, idx) => <Card key={idx} cardData={meal}></Card>)}
                </div>
                <div className="mt-12 flex justify-center gap-2">
                    {filteredList && <>
                        <button className={`${pageNumber <= 1 ? "btn-disabled bg-gray-700 text-black border-black opacity-45" : 'bg-blue-600'} text-sm px-2 py-1 border-solid border-2 font-bold rounded-md text-white transition-transform duration-300 ease-in-out transform hover:scale-110`}
                            onClick={() => setPageNumber(pageNumber - 1)}>&lt;&lt; Previous</button>
                        <div className="rounded-btn flex items-center justify-center bg-gray-200">
                            <h1 className="font-bold text-black px-2">Page {pageNumber} / {Math.ceil(filteredList.length / MAX_PAGE_ITEMS)}</h1>
                        </div>
                        <button className={`${Math.ceil(filteredList.length / MAX_PAGE_ITEMS) <= pageNumber ? "btn-disabled bg-gray-700 text-black border-black opacity-45" : 'bg-blue-600'} text-sm font-bold border-solid border-2 px-2 py-1 rounded-md text-white transition-transform duration-300 ease-in-out transform hover:scale-110`}
                            onClick={() => setPageNumber(pageNumber + 1)}>Next &gt;&gt;</button>
                    </>}
                </div>
            </>}
        </section>
    );
}
