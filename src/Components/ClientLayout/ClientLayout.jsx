import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

const ClientLayout = () => {
	//  ------------------------------------------------------------------ Common style for all client side pages.------------------------------------------------------------------
	return (
		<>
			<Navigation />
			<Outlet />
			<Footer />
		</>
	);
};

export default ClientLayout;
