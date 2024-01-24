import styles from "./CityItem.module.css";
import { CityType } from "../../types/types.ts";
import { formatDate } from "../../utils/utils.ts";
import { Link } from "react-router-dom";
import { useCities } from "../../hooks/useCities.ts";
import React from "react";

interface CityItemProps {
  city: CityType;
}
export default function CityItem({ city }: CityItemProps) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    if (id !== undefined && id !== null) {
      deleteCity(id as string);
    }
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}> {cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}
