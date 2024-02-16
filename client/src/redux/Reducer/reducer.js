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
} from "../Actions/action-type.js";

let initialState = { allCountries: [], countriesCopy: [], activities: [] };

function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries: payload,
                countriesCopy: payload,
            };

        case GET_COUNTRY_BY_NAME:
            const allCountriesCopy = payload;

            return {
                ...state,
                allCountries: allCountriesCopy,
                countriesCopy: allCountriesCopy,
            };

        case GET_ACTIVITIES:
            return {
                ...state,
                activities: payload,
            };

        case CREATE_ACTIVITY:
            return {
                ...state,
                activities: [...state.activities, payload],
            };

        case FILTER_BY_CONTINENT:
            const countries = state.countriesCopy;
            console.log(payload);
            return {
                ...state,
                allCountries: countries.filter(
                    (country) => country.continent === payload
                ),
            };

        case FILTER_BY_ACTIVITY:
            const toFilter = state.countriesCopy;
            const toActivities = state.activities;
            let Coinsidencia = [];


            const pepe = toActivities.filter((activity) => activity.name == payload);
            pepe[0].Countries?.map((country) => toFilter.map(x => country.name == x.name ? Coinsidencia.push(x) : false));
            
            return {
                ...state,
                allCountries: Coinsidencia
            };

        // const countrAct = toFilter.filter((country) => {
        //     console.log(country);
        //     const filterByAct = country.activities.find((activity) => activity.name === payload);
        //     return filterByAct;
        // });
        // console.log(countrAct);
        // return { ...state, allCountries: countrAct };

        // return {
        //     ...state,
        //     allCountries: toFilter.filter((country) => {
        //         if (country.Activities && Array.isArray(country.Activities)) {
        //             return country.Activities.some(
        //                 (activity) => activity.name === payload
        //             );
        //         } else {
        //             console.log("aca esta el error");
        //             return false;
        //         }
        //     }),
        // };


        case SORT_AZ: {
            let ordered;

            if (payload === "Sort A to Z") {
                ordered = state.allCountries.sort((a, b) =>
                    a.name.localeCompare(b.name, { sensitivity: "base" })
                );
            } else {
                ordered = state.allCountries.sort((a, b) =>
                    b.name.localeCompare(a.name, { sensitivity: "base" })
                );
            }

            return {
                ...state,
                allCountries: [...ordered],
            };
        }

        case SORT_POPULATION: {
            let ordered;

            if (payload === "Population: Lowest First") {
                ordered = state.allCountries.sort((a, b) =>
                    a.population > b.population ? 1 : -1
                );
            } else {
                ordered = state.allCountries.sort((a, b) =>
                    b.population > a.population ? 1 : -1
                );
            }

            return {
                ...state,
                allCountries: [...ordered],
            };
        }

        case RESET:
            return {
                ...state,
                allCountries: state.countriesCopy,
            };

        default:
            return {
                ...state,
            };
    }
}

export default rootReducer;