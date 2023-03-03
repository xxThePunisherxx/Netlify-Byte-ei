import React from "react";
import style from "./IndividualContactFormData.module.css";
import { useParams } from "react-router-dom";
import useFetchAuth from "../../Utils/Hooks/fetchAuth";

const IndividualContactFormData = () => {
	const { ContactID } = useParams();
	const { data: IndividualContactData, ispending } = useFetchAuth(`https://learning-management-system-kx6y.onrender.com/api/feedback/${ContactID}`);

	return (
		<>
			<div className={style.EnrollData_Wrapper}>
				<h1>Enrolled Trainees Detail</h1>
				{!ispending && (
					<div className={style.EnrollForm_Data}>
						<h1>Name</h1>
						<h2>{IndividualContactData.feedback.legalName}</h2>

						<h1>Email</h1>
						<h2>{IndividualContactData.feedback.email}</h2>
						<h1>Phone Number</h1>
						<h2>{IndividualContactData.feedback.phoneNumber}</h2>
						<h1>Message</h1>
						<h2>{IndividualContactData.feedback.message}</h2>
					</div>
				)}
			</div>
		</>
	);
};

export default IndividualContactFormData;
