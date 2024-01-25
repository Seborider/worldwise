import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import {
  CitiesContextAction,
  CitiesContextState,
  CityType,
} from "../types/types.ts";
import { isCityType } from "../utils/utils.ts";

interface CitiesContextValue {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType;
  getCity: (id: string) => void;
  createCity: (newCity: CityType) => void;
  deleteCity: (id: string) => void;
  errorMessage?: string;
}

const defaultCity: CityType = {
  cityName: "",
  country: "",
  date: "",
  emoji: "",
  notes: "",
  id: null,
  position: { lat: null, lng: null },
};

const URL = "http://localhost:8000";
export const CitiesContext = createContext<CitiesContextValue>({
  cities: [],
  isLoading: false,
  currentCity: defaultCity,

  getCity: (id: string) => {
    console.warn(`Default getCity function called with id: ${id}`);
  },
  createCity: (newCity: CityType) => {
    console.warn(`New City ${JSON.stringify(newCity)} added`);
  },
  deleteCity: (id: string) => {
    console.warn(`City with id ${id} was deleted`);
  },
  errorMessage: "",
});

const initialState: CitiesContextState = {
  cities: [],
  isLoading: false,
  currentCity: defaultCity,
  errorMessage: "",
};

function reducer(state: CitiesContextState, action: CitiesContextAction) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: defaultCity,
      };
    case "rejected":
      return { ...state, isLoading: false, errorMessage: action.payload };
    default:
      return state;
  }
}
function CitiesProvider({ children }: React.PropsWithChildren<object>) {
  const [{ cities, currentCity, isLoading, errorMessage }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${URL}/cities`);
        const data = (await res.json()) as CityType[];
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the data",
        });
      }
    }

    fetchCities().catch((error) => {
      console.error("Error in fetchCities:", error);
    });
  }, []);

  const getCity = useCallback(
    async function getCity(id: string) {
      if (isCityType(currentCity) && Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${URL}/cities/${id}`);
        const data = (await res.json()) as CityType;

        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error fetching the city",
        });
      }
    },
    [currentCity],
  );

  async function createCity(newCity: CityType) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await res.json()) as CityType;
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city",
      });
    }
  }

  async function deleteCity(id: string) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        errorMessage,
        getCity: (id) => {
          void (async () => {
            try {
              await getCity(id);
            } catch (error) {
              console.error("Failed to get city:", error);
            }
          })();
        },
        createCity: (newCity: CityType) => {
          void (async () => {
            try {
              await createCity(newCity);
            } catch (error) {
              console.error("Failed to add city");
            }
          })();
        },
        deleteCity: (id: string) => {
          void (async () => {
            try {
              await deleteCity(id);
            } catch (error) {
              console.warn("Failed to delete City");
            }
          })();
        },
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider };
