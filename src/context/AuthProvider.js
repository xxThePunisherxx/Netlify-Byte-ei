import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const d = new Date();
	const LoginTime = d.getTime();
	// initilize auth object  values
	let parsedLocalData = { Role: "", Token: "" };
	// get user details from localstorage.
	const localStoredData = localStorage.getItem("User Info");
	// store first login time
	const FirstLoginTime = JSON.parse(localStorage.getItem("User time"));
	let Expire = false;
	if (localStoredData) {
		Expire = LoginTime - FirstLoginTime.StoreLoginTime >= 86400000;
		// check how much time passed since first login.
	}
	if (Expire) {
		localStorage.clear();
	}

	if (localStoredData && !Expire) {
		// set auth values if the token in not expired
		parsedLocalData = JSON.parse(localStoredData);
	}

	const [auth, setAuth] = useState({
		// set vaule of auth provider form localstorage. If data are not availiable in localstorage use value initilized above
		Role: parsedLocalData.LocalRole,
		Token: parsedLocalData.LocalToken,
	});

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
