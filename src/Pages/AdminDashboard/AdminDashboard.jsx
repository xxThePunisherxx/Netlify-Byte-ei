import React from "react";
import style from "./AdminDashboard.module.css";

import AdminList from "../../Components/AdminList/AdminList";
import AdminCourseList from "../../Components/AdminCourseList/AdminCourseList";
import CourseCategoryList from "../../Components/CourseCategoryList/CourseCategoryList";

const AdminDashboard = () => {
	return (
		<div className={style.Dashboard}>
			<AdminCourseList />
			<AdminList />
			<CourseCategoryList />
		</div>
	);
};

export default AdminDashboard;
