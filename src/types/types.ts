export interface CityType {
  cityName: string;
  country: string;
  emoji: string;
  date: string | Date;
  notes: string;
  position: {
    lat: number | null | string;
    lng: number | null | string;
  };
  id?: number | null | string;
}

export interface Country {
  country: string;
  emoji: string;
  id?: number | null | string;
}

export interface CitiesContextState {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType;
  errorMessage: string;
}

export type CitiesContextAction =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: CityType[] }
  | { type: "city/loaded"; payload: CityType }
  | { type: "city/created"; payload: CityType }
  | { type: "city/deleted"; payload: string }
  | { type: "rejected"; payload: string };

export interface AuthContextState {
  user: FAKE_USER_TYPE | null;
  isAuthenticated: boolean;
}

export type AuthContextAction =
  | { type: "logout" }
  | { type: "login"; payload: FAKE_USER_TYPE };

export interface FAKE_USER_TYPE {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
