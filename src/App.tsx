import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Locations from './container/Locations';
import Details from './container/Details';
import { WeatherAppContextProvider } from './context';
import './App.css';


// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherAppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Locations />}
            />
            <Route
              path="/details"
              element={<Details />}
            />
          </Routes>
        </BrowserRouter>
      </WeatherAppContextProvider>
    </QueryClientProvider>
  );
}

export default App;

/**
 * Don't add duplicates
 * test example 
 * responsive
 */
