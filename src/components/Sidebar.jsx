import { Outlet } from "react-router-dom";
import classes from "./Sidebar.module.css";

import Logo from "./Logo";
import AppNav from "./AppNav";

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <Logo />
      <AppNav />

      {/* To can show the nested Route */}
      <Outlet />

      <footer className={classes.footer}>
        <p className={classes.copyright}>
          &copy; Copyright {new Date().getFullYear()} Worldwise Inc.
        </p>
      </footer>
    </div>
  );
};

export default Sidebar;
