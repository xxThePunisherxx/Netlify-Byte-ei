// import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
	const { auth } = useAuth();
	const location = useLocation();

	return allowedRoles.includes(auth.Role) ? (
		// navigate to  path  if authoized and authenticated
		<Outlet />
	) : auth.Role ? (
		//  redirect to unauthorized  page if the user is not authorized to visit the specified link
		<Navigate to="/unauthorized" state={{ from: location }} replace />
	) : (
		//  if not logged in reirect to login page.
		<Navigate to="/adminLogin" state={{ from: location }} replace />
	);
};

export default RequireAuth;
