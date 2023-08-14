import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useReducer,
} from "react";

const CitiesContext = createContext({
  cities: [],
  isLoading: false,
  currentCity: {},
  error: null,
  getCity: async function (cityId) {},
  createCity: async function (newCity) {},
  deleteCity: async function (cityId) {},
});

const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: null,
};

const reducer = (state, action) => {
  if (action.type === "loading") {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === "cities/loaded") {
    return {
      ...state,
      isLoading: false,
      cities: action.payload,
    };
  }

  if (action.type === "city/loaded") {
    return {
      ...state,
      isLoading: false,
      currentCity: action.payload,
    };
  }

  if (action.type === "city/created") {
    return {
      ...state,
      isLoading: false,
      cities: [...state.cities, action.payload],
      currentCity: action.payload,
    };
  }

  if (action.type === "city/deleted") {
    return {
      ...state,
      isLoading: false,
      cities: state.cities.filter((city) => city.id !== action.payload),
      currentCity: {},
    };
  }

  if (action.type === "rejected") {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  }

  // return initialState;
  throw new Error("Unknown Action");
};

const CitiesProvider = ({ children }) => {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        console.log(err);
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function (cityId) {
      if (+cityId === currentCity.id) return;

      try {
        // setIsLoading(true);
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities/${cityId}`);
        const data = await res.json();
        // setCurrentCity(data);
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        console.log(err);
        dispatch({
          type: "rejected",
          payload: "There was an error loading city data...",
        });
      }
    },
    [currentCity.id]
  );

  const createCity = async (newCity) => {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // setCities((cities) => [...cities, data]);
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city...",
      });
    }
  };

  const deleteCity = async (cityId) => {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: "DELETE",
      });

      // setCities((cities) => cities.filter((city) => city.id !== cityId));
      dispatch({ type: "city/deleted", payload: cityId });
    } catch (err) {
      console.log("There was an error deleting city.");
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city...",
      });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext is used outside the CitiesProvider");

  return context;
}

export { CitiesProvider, useCities };
