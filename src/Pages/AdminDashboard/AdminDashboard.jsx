import React from "react";
import style from "./AdminDashboard.module.css";

import AdminList from "../../Components/AdminList/AdminList";
import AdminCourseList from "../../Components/AdminCourseList/AdminCourseList";
import CourseCategoryList from "../../Components/CourseCategoryList/CourseCategoryList";
import useAuth from "../../hooks/useAuth";
import AdminTestomonialList from "../../Components/AdminTestomonialList/AdminTestomonialList";
import AdminTeamList from "../../Components/AdminTeamList/AdminTeamList";
import AdminStudentProjectList from "../../Components/AdminStudentProjectList/AdminStudentProjectList";
import AdminPlacementPartnerList from "../../Components/AdminPlacementPartnerList/AdminPlacementPartnerList";

const AdminDashboard = () => {
	const { auth } = useAuth();
	return (
		<div className={style.Dashboard}>
			<AdminCourseList />
			{auth.Role === "superAdmin" && <AdminList />}
			<CourseCategoryList />
			<AdminTestomonialList />
			<AdminTeamList />
			<AdminStudentProjectList />
			<AdminPlacementPartnerList />
		</div>
	);
};

export default AdminDashboard;
