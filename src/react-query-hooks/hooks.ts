import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDebounce } from 'use-debounce';
import { getCitiesByTextSearch, getWeatherInfoByLocation } from "../api/location";
import { WeatherAppContext } from "../context";

export const useCitySearch = () => {
    const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
    const [debouncedQuery] = useDebounce(searchQuery, 500);

    // While this looks like it's unnecessary, we actually need it in order for the
    // dropdown to be visible when it has a query, rather than always being triggered
    // with a 'click'. We can't rely just on the search query to display the state.
    const [isSearchDropdownVisible, setIsSearchDropdownVisible] = useState(false);

    useEffect(() => {
        const newVisibility = Boolean(searchQuery?.length);
        setIsSearchDropdownVisible(newVisibility);
    }, [searchQuery]);

    return {
        searchQuery,
        setSearchQuery,
        debouncedQuery,
        isSearchDropdownVisible,
        setIsSearchDropdownVisible,
    };

}

export const useCitySearchResults = (searchQuery: string | undefined) => {
    const enabled = !!searchQuery && searchQuery.length > 0;

    return useQuery({
        queryKey: ['search', 'cities', searchQuery],
        queryFn: () => getCitiesByTextSearch(searchQuery),
        enabled
    });
};

export const useCityWeatherInfo = (location: number[]) => {
    const enabled = !!location && location.length > 0;

    return useQuery({
        queryKey: ['weather', 'city', location[0], location[1]],
        queryFn: () => getWeatherInfoByLocation(location),
        enabled
    });
};

// Utility hooks for accessing states set/saved in context
export const useWeatherAppState = () => {
    const {
        searchQuery,
        setSearchQuery,
        debouncedQuery,

        isSearchDropdownVisible,
        setIsSearchDropdownVisible,

        isDefaultLocationLoading,
        setDefaultLocationLoadingState,
        defaultLocation,
        setDefaultLocation,

        savedLocation,
        setSavedLocation,
        
        detailedLocation,
        setDetailedLocation
    } = useContext(WeatherAppContext);

    return {
        searchQuery,
        setSearchQuery,
        debouncedQuery,
        isSearchDropdownVisible,
        setIsSearchDropdownVisible,
        defaultLocation,
        setDefaultLocation,
        savedLocation,
        setSavedLocation,
        isDefaultLocationLoading,
        setDefaultLocationLoadingState,
        detailedLocation,
        setDetailedLocation
    };
};