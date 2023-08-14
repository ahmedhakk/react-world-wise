import classes from "./Button.module.css";

const Button = ({ children, onClick, type }) => {
  return (
    <button className={`${classes.btn} ${classes[type]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
