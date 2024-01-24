import styles from "./Sidebar.module.css";
import Logo from "../Logo-component/Logo.tsx";
import AppNav from "../AppNav-component/AppNav.tsx";
import Footer from "../Footer-component/Footer.tsx";
import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}
