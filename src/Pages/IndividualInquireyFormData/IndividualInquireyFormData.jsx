import React from "react";
import style from "./IndividualInquireyFormData.module.css";
import { useParams } from "react-router-dom";
import useFetchAuth from "../../Utils/Hooks/fetchAuth";

const IndividualInquireyFormData = () => {
	const { InquireyID } = useParams();
	const { data: InquireyFormData, ispending } = useFetchAuth(`https://backendapp.up.railway.app/api/enquiry/${InquireyID}`);
	return (
		<>
			{!ispending && (
				<div className={style.EnrollData_Wrapper}>
					<h1>{InquireyFormData.enquiry.legalName} sent</h1>
					<div className={style.EnrollForm_Data}>
						<h1>Name</h1>
						<h2>{InquireyFormData.enquiry.legalName}</h2>

						<h1>Email</h1>
						<h2>{InquireyFormData.enquiry.email}</h2>
						<h1>Phone Number</h1>
						<h2>{InquireyFormData.enquiry.phoneNumber}</h2>
						<h1>Message</h1>
						<h2>{InquireyFormData.enquiry.message}</h2>
					</div>
				</div>
			)}
		</>
	);
};

export default IndividualInquireyFormData;
