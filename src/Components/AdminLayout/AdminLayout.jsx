import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Admin Side Bar/AdminSidebar";
import style from "./AdminLayout.module.css";

const AdminLayout = () => {
	return (
		<div className={style.AdminLayout}>
			<div className={style.stickeySide}>
				<AdminSidebar />
			</div>
			<Outlet />
		</div>
	);
};

export default AdminLayout;
