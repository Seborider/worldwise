import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesContext.tsx"; // Adjust the path accordingly

export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of the CitiesProvider");
  return context;
}
