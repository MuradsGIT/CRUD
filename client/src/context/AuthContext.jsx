/* eslint-disable react/prop-types */
import axios from "axios";
import React, { createContext, useEffect, useState, useContext } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  const [link, setLink] = useState("http://localhost:3001");
  const getLoggedIn = async () => {
    const loggedInRes = await axios.get(`${link}/api/user/loggedIn`, {
      withCredentials: true,
    });
    console.log(loggedInRes)
    setLoggedIn(loggedInRes.data);
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
