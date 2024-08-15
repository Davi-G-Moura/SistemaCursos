import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// IdiomaFast React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";

// IdiomaFast React routes
import { onAuthStateChanged } from "firebase/auth";
import routes from "routes";
import { auth } from "./Firebase";
import { useState } from "react";
import { AddProducts } from "components/AddProducts";
import { ProductGallery } from "components/ProductGallery";
import Main from "Main/Main";
import SignIn from "layouts/pages/authentication/sign-in";
import Admin from "Admin/Admin";
import MCursos from "MCursos/MCursos";
// import SignInBasic from "pages/LandingPages/SignIn";

export default function App() {
  const { pathname } = useLocation();
  const [LoggedIn, setLoggedIn] = useState(false);
  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/presentation" element={<Presentation />} />
        {LoggedIn ? (
          <>
            <Route path="/main" element={<Main />} />
            <Route path="/productgallery" element={<ProductGallery />} />
            <Route path="/addproducts" element={<AddProducts />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/mais-cursos" element={<MCursos />} />
          </>
        ) : (
          <Route path="/pages/authentication/sign-in" element={<SignIn />} />
        )}
        <Route path="*" element={<Navigate to="/presentation" />} />
      </Routes>
    </ThemeProvider>
  );
}
