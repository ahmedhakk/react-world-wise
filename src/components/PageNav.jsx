import { NavLink } from "react-router-dom";
import classes from "./PageNav.module.css";

import Logo from "./Logo";

const PageNav = () => {
  return (
    <nav className={classes.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={classes.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
