import React from "react";
import { NavLink } from "react-router-dom";
import style from "./AdminSidebar.module.css";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineAppstoreAdd, AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { IoPersonAddOutline } from "react-icons/io5";
import Logo from "../../assets/Logo.png";

const AdminSidebar = () => {
	const handleClick = () => {
		localStorage.clear();
	};
	return (
		<div className={style.AdminSidebarWrapper}>
			<div className={style.AdminSidebar}>
				<div className={style.Logo}>
					<img src={Logo} alt="" />
				</div>
				<div className={style.DashboardLinks}>
					<NavLink
						className={({ isActive }) => {
							return "AdminDash-" + (isActive ? "Active" : "Inactive");
						}}
						to={"/admin/dashboard"}
					>
						<h1>
							<RxDashboard /> &nbsp;Dashboard
						</h1>
					</NavLink>
					<NavLink
						className={({ isActive }) => {
							return "AdminDash-" + (isActive ? "Active" : "Inactive");
						}}
						to={"/admin/addCourse"}
					>
						<h1>
							<AiOutlineAppstoreAdd /> &nbsp;Add Course
						</h1>
					</NavLink>
					<NavLink
						className={({ isActive }) => {
							return "AdminDash-" + (isActive ? "Active" : "Inactive");
						}}
						to={"/admin/addAdmin"}
					>
						<h1>
							<IoPersonAddOutline /> &nbsp;Add Admin
						</h1>
					</NavLink>
					<NavLink
						className={({ isActive }) => {
							return "AdminDash-" + (isActive ? "Active" : "Inactive");
						}}
						to={"/admin/addCategory"}
					>
						<h1>
							<AiOutlineAppstoreAdd /> &nbsp;Add Training Category
						</h1>
					</NavLink>

					<NavLink
						className={({ isActive }) => {
							return "AdminDash-" + (isActive ? "Active" : "Inactive");
						}}
						to={"/"}
					>
						<h1>
							<AiFillHome />
							&nbsp; HomePage
						</h1>
					</NavLink>
					<NavLink
						className={({ isActive }) => {
							return "AdminDash-" + (isActive ? "Active" : "Inactive");
						}}
						to={"/"}
						onClick={handleClick}
					>
						<h1>
							<BiLogOut />
							&nbsp; Logout
						</h1>
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default AdminSidebar;
