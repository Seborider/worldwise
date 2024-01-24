import Sidebar from "../../components/Sidebar-component/Sidebar.tsx";
import styles from "./AppLayout.module.css";
import Map from "../../components/Map-component/Map.tsx";
import User from "../../components/User-component/User.tsx";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
