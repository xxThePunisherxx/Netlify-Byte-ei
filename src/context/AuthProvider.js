import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const d = new Date();
	const LoginTime = d.getTime();
	let parsedLocalData = { Role: "", Token: "" };
	const localStoredData = localStorage.getItem("User Info");
	const previousLoginTime = localStorage.getItem("User time");

	//! ---------------------------------- store login time to auto logout after 24hr ---------------------------------------------------------------
	const FirstLoginTime = JSON.parse(previousLoginTime);
	let Expire = false;
	if (previousLoginTime) {
		Expire = LoginTime - FirstLoginTime.StoreLoginTime >= 86400000;
	}
	if (Expire) {
		localStorage.clear();
		// ! ------------------------------------ clear data on localstorage if last login was more than 1 day ago -------------------------------------------------
	}

	if (localStoredData && !Expire) {
		parsedLocalData = JSON.parse(localStoredData);
	}

	const [auth, setAuth] = useState({
		//!------- set vaule of auth provider form localstorage. If data are not availiable in localstorage use value initilized above--------------------
		Role: parsedLocalData.LocalRole,
		Token: parsedLocalData.LocalToken,
	});

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
