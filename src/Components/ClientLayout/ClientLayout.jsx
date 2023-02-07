import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

const ClientLayout = () => {
	return (
		<>
			<Navigation />
			<Outlet />
			<Footer />
		</>
	);
};

export default ClientLayout;
