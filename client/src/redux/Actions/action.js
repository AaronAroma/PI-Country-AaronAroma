import {
    CREATE_ACTIVITY,
    FILTER_BY_ACTIVITY,
    FILTER_BY_CONTINENT,
    GET_ACTIVITIES,
    GET_COUNTRIES,
    GET_COUNTRY_BY_NAME,
    RESET,
    SORT_AZ,
    SORT_POPULATION,
} from "./action-type";
import axios from "axios";


export const detalle  = async (id) => {
    try {
    const { data } = await axios(`http://localhost:3001/countries/${id}`)
    return data
    } catch (error) {
        throw new Error ("No hay paises con ese ID")
    }
}
export const getCountries = () => {
    const endpoint = "http://localhost:3001/countries";
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);

            return dispatch({
                type: GET_COUNTRIES,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getCountryByName = (searchTerm) => {
    const endpoint = `http://localhost:3001/countries?name=${searchTerm}`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);

            return dispatch({
                type: GET_COUNTRY_BY_NAME,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getActivities = () => {
    const endpoint = "http://localhost:3001/activities";
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);

            return dispatch({
                type: GET_ACTIVITIES,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const addActivity = (activityDetail) => {
    const endpoint = `http://localhost:3001/activities`;
    return async (dispatch) => {
        try {
            const { data } = await axios.post(endpoint, activityDetail);

            return dispatch({
                type: CREATE_ACTIVITY,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const filterByContinent = (continent) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload: continent,
    };
};

export const filterByActivity = (activity) => {
    return {
        type: FILTER_BY_ACTIVITY,
        payload: activity
    }
}

export const sortCountries = (order) => {
    return {
        type: SORT_AZ,
        payload: order,
    };
};

export const sortCountriesByPopulation = (order) => {
    return {
        type: SORT_POPULATION,
        payload: order,
    };
};

export const resetCountries = () => {
    return {
        type: RESET,
    };
};