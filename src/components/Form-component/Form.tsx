import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import { Button } from "../Button-component/Button.tsx";
import { BackButton } from "../BackButton-component/BackButton.tsx";
import { useUrlPosition } from "../../hooks/useUrlPosition.ts";
import { convertToEmoji } from "../../utils/utils.ts";
import Message from "../Message-component/Message.tsx";
import Spinner from "../Spinner-component/Spinner.tsx";
import DatePicker from "react-datepicker";
import { CityType } from "../../types/types.ts";
import { useCities } from "../../hooks/useCities.ts";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCode, setIsLoadingGeoCode] = useState(false);
  const [lat, lng] = useUrlPosition();
  const [emoji, setEmoji] = useState("");
  const [geoCodeError, setGeoCodeError] = useState("");
  const navigate = useNavigate();

  const { createCity, isLoading } = useCities();

  useEffect(() => {
    if (!lat && !lng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeoCode(true);
        setGeoCodeError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to be a country. Click somewhere else",
          );
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        if (err instanceof Error) {
          setGeoCodeError(err.message);
        } else {
          setGeoCodeError("An unknown error occurred");
        }
      } finally {
        setIsLoadingGeoCode(false);
      }
    }
    fetchCityData().catch((error) => {
      console.error("Error in fetchCityData:", error);
    });
  }, [lat, lng]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity: CityType = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lng,
        lat,
      },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeoCode) return <Spinner />;
  if (geoCodeError) return <Message message={geoCodeError} />;
  if (!lat && !lng) return <Message message="Start by clicking on the map!" />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
