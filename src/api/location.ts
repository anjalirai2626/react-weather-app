import { GEOCODING_API, APP_ID, CITIES_SEARCH_LIMIT, WEATHER_INFO_API } from "../utils/constants";

const getCitiesByTextSearch = async (searchText: string | undefined) => {
    if (searchText) {
        const response = await fetch(`${GEOCODING_API}?q=${searchText}&limit=${CITIES_SEARCH_LIMIT}&appid=${APP_ID}`);
        let locationsInfo = await response.json();
        return locationsInfo;
    }

}

const getWeatherInfoByLocation = async (location: number[]) => {
    if (location && location?.length) {
        try {
            // make unit dynamic
            const response = await fetch(`${WEATHER_INFO_API}?lat=${location[0]}&lon=${location[1]}&units=Metric&appid=${APP_ID}`);
            let weatherInfo = await response.json();

            return weatherInfo;
        }
        catch (ex) {
            throw ex;
        }
    }
}

export { getCitiesByTextSearch, getWeatherInfoByLocation };