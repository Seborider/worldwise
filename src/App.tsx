import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product/Product.tsx";
import Pricing from "./pages/Pricing/Pricing.tsx";
import Homepage from "./pages/Homepage/Homepage.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import AppLayout from "./pages/AppLayout/AppLayout.tsx";
import Login from "./pages/Login/Login.tsx";
import CityList from "./components/CityList-component/CityList.tsx";
import CountryList from "./components/CountryList-component/CountryList.tsx";
import City from "./components/City-component/City.tsx";
import Form from "./components/Form-component/Form.tsx";
import { CitiesProvider } from "./contexts/CitiesContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute.tsx";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
