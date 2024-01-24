import styles from "./CityList.module.css";
import Spinner from "../Spinner-component/Spinner.tsx";
import CityItem from "../CityItem-component/CityItem.tsx";
import Message from "../Message-component/Message.tsx";
import { useCities } from "../../hooks/useCities.ts";

export default function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (cities !== undefined && !cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map"></Message>
    );
  return (
    <ul className={styles.cityList}>
      {cities?.map((city) => <CityItem city={city} key={city.id}></CityItem>)}
    </ul>
  );
}
