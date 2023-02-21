import React from "react";
import style from "./AdminDashboard.module.css";

import AdminList from "../../Components/AdminList/AdminList";
import AdminCourseList from "../../Components/AdminCourseList/AdminCourseList";
import CourseCategoryList from "../../Components/CourseCategoryList/CourseCategoryList";
import useAuth from "../../hooks/useAuth";
import AdminTestomonialList from "../../Components/AdminTestomonialList/AdminTestomonialList";

const AdminDashboard = () => {
	const { auth } = useAuth();
	return (
		<div className={style.Dashboard}>
			<AdminCourseList />
			{auth.Role === "superAdmin" && <AdminList />}
			<CourseCategoryList />
			<AdminTestomonialList />
		</div>
	);
};

export default AdminDashboard;
