import React, { createContext, useReducer } from "react";
import {
  AuthContextAction,
  AuthContextState,
  FAKE_USER_TYPE,
} from "../types/types.ts";
import { FAKE_USER } from "../utils/utils.ts";

interface AuthContextType {
  user: FAKE_USER_TYPE | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: (email: string, password: string) => {
    console.log(email, password);
  },
  logout: () => {
    // no-op
  },
});

const initialState: AuthContextState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state: AuthContextState, action: AuthContextAction) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("unknown action");
  }
}
function AuthProvider({ children }: React.PropsWithChildren<object>) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      console.log("Login successful");
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      console.log("Login failed");
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
