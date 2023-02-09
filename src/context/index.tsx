import { createContext, ReactNode, useEffect, useState } from 'react';
import { getDefaultSavedLocations } from '../utils';
import { WeatherAppState } from './types';
import useGeolocation from "react-hook-geolocation";
import { useDebounce } from 'use-debounce';

export const WeatherAppContextDefault: WeatherAppState = {
  searchQuery: undefined,
  setSearchQuery: () => null,
  debouncedQuery: undefined,

  isSearchDropdownVisible: false,
  setIsSearchDropdownVisible: () => null,

  isDefaultLocationLoading: false,
  setDefaultLocationLoadingState: () => null,
  defaultLocation: [],
  setDefaultLocation: () => null,

  savedLocation: [],
  setSavedLocation: () => null,
  
  detailedLocation: [],
  setDetailedLocation: () => null
};

export const WeatherAppContext = createContext<WeatherAppState>(
  WeatherAppContextDefault
);

export const WeatherAppContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const geolocation = useGeolocation();

  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  // While this looks like it's unnecessary, we actually need it in order for the
  // dropdown to be visible when it has a query, rather than always being triggered
  // with a 'click'. We can't rely just on the search query to display the state.
  const [isSearchDropdownVisible, setIsSearchDropdownVisible] = useState(false);


  const [defaultLocation, setDefaultLocation] = useState<number[]>([]);
  const [isDefaultLocationLoading, setDefaultLocationLoadingState] = useState<boolean>(false);

  const { defaultSavedLocation } = getDefaultSavedLocations();
  const [savedLocation, setSavedLocation] = useState<number[][]>(defaultSavedLocation);

  const [detailedLocation, setDetailedLocation] = useState<number[]>([])


  useEffect(() => {
    const newVisibility = Boolean(searchQuery?.length);
    setIsSearchDropdownVisible(newVisibility);
  }, [searchQuery]);

  useEffect(() => {
    if (geolocation && geolocation?.latitude && geolocation?.longitude) {
      setDefaultLocation([geolocation.latitude, geolocation.longitude])
    }
  }, [geolocation])

  // update savedLocation in local storage
  useEffect(() => {
    localStorage.setItem("savedLocation", JSON.stringify(savedLocation));
  }, [savedLocation])

  return (
    <WeatherAppContext.Provider
      value={{
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
      }}
    >
      {children}
    </WeatherAppContext.Provider>
  );
};

