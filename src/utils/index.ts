/**
 * This Utility checks if user has saved/browsed any locations earlier, 
 * if not show current location (if allowed) along with two default locations i.e. Austin & Delhi
 * @returns defaultSavedLocation 
 */
export const getDefaultSavedLocations = () => {
  const storedLocations = localStorage.getItem('savedLocation');
  let defaultSavedLocation: number[][] = [];

  if (storedLocations) {
    let parsedStoredLocations: number[][] = JSON.parse(storedLocations);
    if (parsedStoredLocations && parsedStoredLocations.length === 0) {
      // (parsedStoredLocations && parsedStoredLocations?.length === 2)
      defaultSavedLocation = [[30.2711,
        -97.7437],
      [
        28.6517, 77.2219]];
    } else {
      defaultSavedLocation = parsedStoredLocations;
    }
  }

  return { defaultSavedLocation };
}

// Utility to fetch current location without using 'react-hook-geolocation'
export const getMyLocationCoords = () => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location: any) => {
        if (location && location?.coords) {
          const { coords } = location;
          const myLocation = [coords?.latitude, coords?.longitude];

      return myLocation;
        }

      });
    } 
    return [];
}