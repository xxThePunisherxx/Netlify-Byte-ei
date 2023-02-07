// import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
	const { auth } = useAuth();

	const location = useLocation();

	// return auth.role.find((role) => allowedRoles.includes(role)) ? (
	return auth.Role === allowedRoles ? <Outlet /> : <Navigate to="/admin" state={{ from: location }} replace />;
};

export default RequireAuth;
