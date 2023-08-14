import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import classes from "./AppLayout.module.css";

const AppLayout = () => {
  return (
    <div className={classes.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
};

export default AppLayout;
