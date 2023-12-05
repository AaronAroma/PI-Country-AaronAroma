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

let initialState = { allCountries: [], countriesCopy: [], filteredCountries: [], activities: [] };

function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries: payload,
                countriesCopy: payload,
                filteredCountries: payload,
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
                activities: payload,
            };

        case FILTER_BY_CONTINENT:
            const countries = state.countriesCopy;

            return {
                ...state,
                allCountries: countries.filter(
                    (country) => country.continent === payload
                ),
            };

        case FILTER_BY_ACTIVITY:
            const toFilter = state.countriesCopy

            return {
                ...state,
                allCountries: toFilter.filter((country) => {
                    return country.Activities ? country.Activities.some((activity) => activity.name === payload) : false;
                }),
            };

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
                ordered = [...state.allCountries].sort((a, b) =>
                    a.population > b.population ? 1 : -1
                );
            } else {
                ordered = [...state.allCountries].sort((a, b) =>
                    b.population > a.population ? 1 : -1
                );
            }

            return {
                ...state,
                allCountries: ordered,
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

export default reducer;