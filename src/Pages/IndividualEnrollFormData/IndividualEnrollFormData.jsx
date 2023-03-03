import React from "react";
import style from "./IndividualEnrollFormData.module.css";
import { useParams } from "react-router-dom";
import useFetchAuth from "../../Utils/Hooks/fetchAuth";

const IndividualEnrollFormData = () => {
	const { EnrollID } = useParams();
	const { data: EnrollFormData, ispending } = useFetchAuth(`https://learning-management-system-kx6y.onrender.com/api/form/${EnrollID}`);

	return (
		<>
			<div className={style.EnrollData_Wrapper}>
				<h1>Enrolled Trainees Detail</h1>
				{!ispending && (
					<div className={style.EnrollForm_Data}>
						<h1>Name</h1>
						<h2>{EnrollFormData.registerForm.legalName}</h2>
						<h1>Academic Level</h1>
						<h2>{EnrollFormData.registerForm.academicLevel}</h2>
						<h1>Email</h1>
						<h2>{EnrollFormData.registerForm.email}</h2>
						<h1>Phone Number</h1>
						<h2>{EnrollFormData.registerForm.phoneNumber}</h2>
					</div>
				)}
			</div>
		</>
	);
};

export default IndividualEnrollFormData;
