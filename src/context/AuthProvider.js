import { createContext, useState } from "react";
import { Cookies } from "react-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const cookie = new Cookies();
  const access_token = cookie.get("access_token");
  const cookie_auth = cookie.get("user_data");
  const logoutData = { login: false, data: {} };
  const [Auth, setAuth] = useState(() => {
    return access_token ? { login: true, data: cookie_auth } : logoutData;
  });

  const AuthActionLogout = () => {
    cookie.remove("user_data", { path: "/" });
    cookie.remove("access_token", { path: "/" });
    setAuth(logoutData);
  };
  const AuthActionLogin = (userData, expireDate) => {
    cookie.set("user_data", userData, {
      expires: expireDate,
    });
    setAuth({ login: true, data: userData });
  };

  const AuthActionSetToken = (token, expireDate) => {
    cookie.set("access_token", token, {
      expires: expireDate,
    });
  };

   return (
    <AuthContext.Provider
      value={{
        Auth,
        AuthActionLogout,
        AuthActionLogin,
        AuthActionSetToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
