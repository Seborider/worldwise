import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute.tsx";
import CityList from "./components/CityList-component/CityList.tsx";
import CountryList from "./components/CountryList-component/CountryList.tsx";
import City from "./components/City-component/City.tsx";
import Form from "./components/Form-component/Form.tsx";
import { CitiesProvider } from "./contexts/CitiesContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

import { lazy, Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage-component/SpinnerFullPage.tsx";

const Product = lazy(() => import("./pages/Product/Product.tsx"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing.tsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.tsx"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout.tsx"));
const Login = lazy(() => import("./pages/Login/Login.tsx"));
const Homepage = lazy(() => import("./pages/Homepage/Homepage.tsx"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />}></Route>
              <Route path="product" element={<Product />}></Route>
              <Route path="pricing" element={<Pricing />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route index element={<CityList />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
