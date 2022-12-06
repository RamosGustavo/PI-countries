import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_FILTERED_COUNTRIES = "GET_FILTERED_COUNTRIES";
export const GET_COUNTRY = "GET_COUNTRY";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";

export const getCountries = () => {
    return async (dispatch) => {
        axios
            .get(`http://localhost:3001/countries`)
            .then((response) => response.data)
            .then((response) => dispatch({ type: GET_COUNTRIES, payload: response }));
    };
};

export const getFilteredCountries = (
    state /* = { sort: "", continent: "", activity: "" } */
) => {
    return async (dispatch) => {
        axios
            .get(
                `http://localhost:3001/countries/filter/${state.continent}-${state.activity}`
            )
            .then((response) => response.data)
            .then((response) =>
                dispatch({
                    type: GET_FILTERED_COUNTRIES,
                    payload: { response, state },
                })
            )
            .catch((err) =>
                dispatch({ type: GET_COUNTRIES, payload: ["404 not found"] })
            );
    };
};

export const getCountry = (payload) => {
    return async (dispatch) => {
        axios
            .get(`http://localhost:3001/countries/${payload}`)
            .then((response) => response.data)
            .then((response) => dispatch({ type: GET_COUNTRY, payload: response }));
    };
};

export const searchCountry = (payload) => {
    return async (dispatch) => {
        axios
            .get(`http://localhost:3001/countriesSearch?name=${payload}`)
            .then((response) => response.data)
            .then((response) => dispatch({ type: SEARCH_COUNTRY, payload: response }))
            .catch((err) =>
                dispatch({ type: SEARCH_COUNTRY, payload: ["404 not found"] })
            );
    };
};

export const getActivities = () => {
    return async (dispatch) => {
        axios
            .get("http://localhost:3001/activities")
            .then((response) => response.data)
            .then((response) =>
                dispatch({ type: GET_ACTIVITIES, payload: response })
            );
    };
};

export const createActivity = (payload) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(
                "http://localhost:3001/activities",
                payload
            );
            window.alert("Activity created!");

            return response;
        } catch (error) {
            console.log(error);
            window.alert(error.response.data.message);
        }
    };

    /* return (dispatch) => {
    dispatch({ type: CREATE_ACTIVITY, payload: response });
    }; */
};

export const deleteActivity = (payload) => {
    return async function (dispatch) {
        try {
            await axios.delete(`http://localhost:3001/activities/${payload}`);
        } catch (error) {
            console.log(error);
            window.alert(error.message);
        }
    };
};
