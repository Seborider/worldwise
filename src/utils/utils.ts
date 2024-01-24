import { CityType } from "../types/types.ts";

export const formatDate = (date: string | number | Date) => {
  if (!date || isNaN(Date.parse(date.toString()))) {
    return "Invalid date";
  }
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

export function convertToEmoji(countryCode: string) {
  if (!countryCode) {
    return "";
  }
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function isCityType(city: {} | CityType): city is CityType {
  return (city as CityType).id !== undefined;
}

export const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
