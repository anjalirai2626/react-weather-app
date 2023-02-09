export const OPEN_WEATHER_API: string = 'https://api.openweathermap.org';
// Add APP_ID key before requesting OPEN_WEATHER_API
export const APP_ID: string = '';

export const CITIES_SEARCH_LIMIT = 100;

export const GEOCODING_API = `${OPEN_WEATHER_API}/geo/1.0/direct`
export const WEATHER_INFO_API = `${OPEN_WEATHER_API}/data/2.5/weather`

export const COUNTRY_NAMES = new Intl.DisplayNames(['en'], { type: 'region' });