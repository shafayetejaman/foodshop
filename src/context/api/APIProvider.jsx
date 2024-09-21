import React, { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";

const CATEGORY_URL = "https://www.themealdb.com/api/json/v1/1/categories.php";
const INGREDIENT_URL = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
const COUNTRY_URL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
const GET_MEAL_ID_BY_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
const GET_MEAL_BY_CATEGORY_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
const GET_MEAL_BY_COUNTRY_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=";
const GET_MEAL_BY_INGREDIENT_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

export async function getMeal(id)
{
    const URL = GET_MEAL_ID_BY_URL + id;
    let data = null;

    await axios.get(URL)
        .then(res => data = res.data.meals[0])
        .catch(err => console.error(err));

    return data;
}

export async function getMealByCategory(category)
{
    const URL = GET_MEAL_BY_CATEGORY_URL + category;
    let data = null;

    await axios.get(URL)
        .then(res => data = res.data.meals)
        .catch(err => console.error(err));

    return data;
}

export async function getMealByCountry(country)
{
    const URL = GET_MEAL_BY_COUNTRY_URL + country;
    let data = null;

    await axios.get(URL)
        .then(res => data = res.data.meals)
        .catch(err => console.error(err));

    return data;
}

export async function getMealByIngredient(ingredient)
{
    const URL = GET_MEAL_BY_INGREDIENT_URL + ingredient;
    let data = null;

    await axios.get(URL)
        .then(res => data = res.data.meals)
        .catch(err => console.error(err));

    return data;
}


const Context = createContext();

export function useAPI()
{
    return useContext(Context);
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
            await axios.get(CATEGORY_URL)
                .then(res => setCategory(res.data.categories))
                .catch(err => console.error(err));

            await axios.get(INGREDIENT_URL)
                .then(res => setIngredient(res.data.meals))
                .catch(err => console.error(err));

            await axios.get(COUNTRY_URL)
                .then(res => setCountry(res.data.meals))
                .catch(err => console.error(err));

            setMeals(await getMealByCategory('Dessert'));

        })();

    }, []);

    return (
        <Context.Provider value={{ category, ingredient, country, meals }}>
            {children}
        </Context.Provider>
    );
}
