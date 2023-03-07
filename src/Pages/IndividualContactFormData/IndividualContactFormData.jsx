import React from "react";
import style from "./IndividualContactFormData.module.css";
import { useParams } from "react-router-dom";
import useFetchAuth from "../../Utils/Hooks/fetchAuth";

const IndividualContactFormData = () => {
	const { ContactID } = useParams();
	const { data: IndividualContactData, ispending } = useFetchAuth(`https://backendapp.up.railway.app/api/feedback/${ContactID}`);

	return (
		<>
			{!ispending && (
				<div className={style.EnrollData_Wrapper}>
					<h1>{IndividualContactData.feedback.legalName} sent</h1>
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
				</div>
			)}
		</>
	);
};

export default IndividualContactFormData;
