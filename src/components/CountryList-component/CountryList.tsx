import styles from "./CountryList.module.css";
import Spinner from "../Spinner-component/Spinner.tsx";
import { Country } from "../../types/types.ts";
import Message from "../Message-component/Message.tsx";
import CountryItem from "../CoutryItem-component/CountryItem.tsx";
import { useCities } from "../../hooks/useCities.ts";

export default function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!Array.isArray(cities) || cities.length === 0)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((acc: Country[], city) => {
    if (!acc.some((el) => el.country === city.country)) {
      return [
        ...acc,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    } else return acc;
  }, [] as Country[]);

  return (
    <ul className={styles.countryList}>
      {(countries as unknown as Country[]).map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}
