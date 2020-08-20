import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import React, { useReducer } from "react";
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //load user

  const loadUser = () => {
    console.log("loadUser");
  };

  // register user

  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (error) {
      console.log(`Error in register user ${error.msg}`);
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
  };

  // login user

  const login = () => {
    console.log("login");
  };

  // logout

  const logout = () => {
    console.log("logout");
  };

  // clear error

  const clearErrors = () => {
    console.log("clearErrors");
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
