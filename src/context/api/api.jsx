import React, { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";

const CategoryURL = "https://www.themealdb.com/api/json/v1/1/categories.php";
const IngredientURL = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
const CountryURL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

export async function getMeal(id)
{
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    let data = null;

    await axios.get(URL)
        .then(res => data = res.data.meals[0])
        .catch(err => console.error(err));

    return data;
}

export async function getMealByCategory(category)
{
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    let data = null;

    await axios.get(URL)
        .then(res => data = res.data.meals)
        .catch(err => console.error(err));

    return data;
}


const ContextProvider = createContext();

export function useAPI()
{
    return useContext(ContextProvider);
}

export default function APIProvider({ children })
{
    const [category, setCategory] = useState(null);
    const [ingredient, setIngredient] = useState(null);
    const [country, setCountry] = useState(null);
    const [meals, setMeals] = useState(null);


    useEffect(() =>
    {
        (async () =>
        {
            console.log("api used")

            await axios.get(CategoryURL)
                .then(res => setCategory(res.data.categories))
                .catch(err => console.error(err));

            await axios.get(IngredientURL)
                .then(res => setIngredient(res.data.meals))
                .catch(err => console.error(err));

            await axios.get(CountryURL)
                .then(res => setCountry(res.data.meals))
                .catch(err => console.error(err));
            
            setMeals((await getMealByCategory("Chicken")))  

        })();

    }, []);

    return (
        <ContextProvider.Provider value={{ category, ingredient, country, meals }}>
            {children}
        </ContextProvider.Provider>
    );
}
