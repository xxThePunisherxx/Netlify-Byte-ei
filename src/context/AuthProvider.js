import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	let parsedLocalData = { Role: "", Token: "" };
	const localStoredData = localStorage.getItem("User Info");
	if (localStoredData) {
		parsedLocalData = JSON.parse(localStoredData);
	}
	const [auth, setAuth] = useState({ Role: parsedLocalData.LocalRole, Token: parsedLocalData.LocalToken });
	// const [auth, setAuth] = useState({});

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
