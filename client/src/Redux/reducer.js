import {
    GET_COUNTRIES,
    GET_COUNTRY,
    SEARCH_COUNTRY,
    GET_ACTIVITIES,
    CREATE_ACTIVITY,
    GET_FILTERED_COUNTRIES,
} from "./actions";

const initialState = {
    countries: [],
    activities: [],
    country: [],
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
            action.payload.sort((a, b) => {
                let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();
                if (fa < fb) return -1;
                if (fa > fb) return 1;
                return 0;
            });

            return { ...state, countries: action.payload };

        case GET_FILTERED_COUNTRIES:
            if (action.payload.length) {
                return { ...state, countries: action.payload.response };
            }

            if (action.payload.state.sort === "asc") {
                action.payload.response.sort((a, b) => {
                    let fa = a.name.toLowerCase(),
                        fb = b.name.toLowerCase();
                    if (fa < fb) return -1;
                    if (fa > fb) return 1;
                    return 0;
                });
            }
            if (action.payload.state.sort === "desc") {
                action.payload.response.sort((a, b) => {
                    let fa = a.name.toLowerCase(),
                        fb = b.name.toLowerCase();
                    if (fa > fb) return -1;
                    if (fa < fb) return 1;
                    return 0;
                });
            }

            if (action.payload.state.sort === "most") {
                action.payload.response.sort((a, b) => {
                    let fa = a.population,
                        fb = b.population;
                    if (fa > fb) return -1;
                    if (fa < fb) return 1;
                    return 0;
                });
            }
            if (action.payload.state.sort === "least") {
                action.payload.response.sort((a, b) => {
                    let fa = a.population,
                        fb = b.population;
                    if (fa < fb) return -1;
                    if (fa > fb) return 1;
                    return 0;
                });
            }

            return { ...state, countries: action.payload.response };

        case GET_COUNTRY:
            //console.log(action.payload, "REDUCER country");
            return { ...state, country: action.payload };

        case SEARCH_COUNTRY:
            console.log(action.payload, "REDUCER SEARCH");
            return { ...state, countries: action.payload };

        case GET_ACTIVITIES:
            return { ...state, activities: action.payload };

        case CREATE_ACTIVITY:
            return { ...state, activities: action.payload };

        default:
            return { ...state };
    }
}
