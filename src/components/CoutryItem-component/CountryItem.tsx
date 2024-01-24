import styles from "./CountryItem.module.css";
import { Country } from "../../types/types.ts";

interface CountryItemProps {
  country: Country;
}
function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
