export interface WeatherAppState {
  searchQuery: string | undefined,
  setSearchQuery: (searchQuery: string | undefined) => void,
  debouncedQuery: string | undefined,

  isSearchDropdownVisible: boolean,
  setIsSearchDropdownVisible: (isSearchDropdownVisible: boolean) => void,

  isDefaultLocationLoading: boolean,
  setDefaultLocationLoadingState: (isLoading: boolean) => void,
  defaultLocation: number[];
  setDefaultLocation: (defaultLocation: number[]) => void;

  savedLocation: number[][];
  setSavedLocation: (savedLocation: number[][]) => void;

  detailedLocation: number[],
  setDetailedLocation: (location: number[])=> void;
}
