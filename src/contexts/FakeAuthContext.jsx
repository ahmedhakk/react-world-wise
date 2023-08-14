import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext({
  user: {},
  isAuthedticated: false,
  login: (email, password) => {},
  logout: () => {},
});

const initialState = {
  user: null,
  isAuthedticated: false,
};

const reducer = (state, action) => {
  if (action.type === "login") {
    return {
      ...state, // we don't need this here because we update all the states, but if we add in the future more state we will be in the safe side as we add all the previous states before we update anything
      user: action.payload,
      isAuthedticated: true,
    };
  }
  if (action.type === "logout") {
    return initialState;
  }

  throw new Error("Unknown Action");
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthProvider = ({ children }) => {
  const [{ user, isAuthedticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  };
  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthedticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Authcontext used outside AuthProvider");
  return context;
};

export { AuthProvider, useAuth };
