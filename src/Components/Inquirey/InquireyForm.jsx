import React from "react";
import { useRef, useEffect } from "react";
import style from "./InquireyForm.module.css";
import useFetch from "../../Utils/Hooks/fetch";
import uuid from "react-uuid";
import axios from "axios";
import { useState } from "react";

const InquireyForm = () => {
	const { data: trainingResponse } = useFetch("https://backendapp.up.railway.app/api/training");
	const [showSelectCat, setShowSelectCat] = useState(false);

	//  ------------------------------------------------------------------ Message Board things ------------------------------------------------------------------
	const [Error, setError] = useState(false);
	const [Success, setSuccess] = useState(false);

	const EnrollRef = useRef();
	const handlesubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());
		const postData = {
			legalName: enterdData.Full_name,
			email: enterdData.Email,
			message: enterdData.Message,
			phoneNumber: enterdData.mobile_number,
			course: enterdData.dropdown,
		};
		if (enterdData.dropdown !== "null") {
			try {
				const response = await axios.post("https://backendapp.up.railway.app/api/enquiry/add", postData);
				if (response.status === 201) {
					setSuccess(true);
				}
			} catch (err) {
				setError(true);
				setTimeout(() => {
					setError(false);
				}, 1000);
			}
		} else if (enterdData.dropdown === "null") {
			setShowSelectCat(true);
			setTimeout(() => {
				setShowSelectCat(false);
			}, 2000);
		}
	};

	useEffect(() => {
		EnrollRef.current.focus();
	}, []);

	return (
		<>
			{!Success && (
				<div className={style.EnrollFormComp_Wrapper}>
					<div className={style.form_Headings}>
						<h1>
							Inquirey <span className={style.Heading_hightlight}> Form</span>
						</h1>
						<h2>
							Please fill out the form below to get started. All feilds with (<span className={style.mandatory_hightlight}>*</span>) are mandatory
						</h2>
					</div>
					<form onSubmit={handlesubmit} autoComplete="off" className={style.Enrorll_FormWrappper}>
						<h1>
							Legal Name
							<span className={style.mandatory_hightlight}>
								<sup>*&nbsp;</sup>
							</span>
						</h1>
						<input name="Full_name" type="text" required ref={EnrollRef}></input>
						<h1>
							Email
							<span className={style.mandatory_hightlight}>
								<sup>*&nbsp;</sup>
							</span>
						</h1>
						<input name="Email" type="email" required></input>
						<h1>
							Mobile
							<span className={style.mandatory_hightlight}>
								<sup>*&nbsp;</sup>
							</span>
						</h1>
						<input name="mobile_number" type="text" required></input>

						<h1>
							Message
							<span className={style.mandatory_hightlight}>
								<sup>*&nbsp;</sup>
							</span>
						</h1>
						<textarea name="Message" type="text" rows={10} required></textarea>
						<h1>
							Course
							<span className={style.mandatory_hightlight}>
								<sup>*&nbsp;</sup>
							</span>
						</h1>
						{showSelectCat && <h1 style={{ color: "red" }}>Select a course category</h1>}

						<select name="dropdown">
							<option value="null">Select Course</option>
							{trainingResponse.training.map((Category) => (
								<option key={uuid()} value={Category.title}>
									{Category.title}
								</option>
							))}
						</select>
						{Error && (
							<div className={style.err}>
								<h1>Something went wrong</h1>
							</div>
						)}
						<button className={style.Spantwo}>Submit</button>
					</form>
				</div>
			)}
			{Success && (
				<div className={style.SuccesFormSubmit_Message}>
					{/* Feeback form  response */}
					{/* <h1>
						Thank you for taking the time to share your feedback with us. We appreciate your honest and constructive comments about our website.
					</h1>
					<h1>
						Your feedback helps us improve our service and deliver a better experience for you and other customers. We are always looking for ways to
						make our website more user-friendly, informative, and engaging.
					</h1>
					<h1>
						We have noted your suggestions and we will work on implementing them as soon as possible. If you have any additional questions or
						concerns, please feel free to contact us anytime.
					</h1>
					<h1>Thank you again for your valuable feedback and your continued support.</h1> */}
					{/* Contact form response */}
					<h1>Thank you for your inquiry regarding our service. We appreciate your interest and we are happy to assist you.</h1>
					<h1>
						We have received your inquiry form and we will get back to you with more details as soon as possible. In the meantime, please feel free to
						browse our website or contact us if you have any questions.
					</h1>
					{/*
					//! ------------------------------------- Uncomment h1 below if we ever add FAQ section-------------------------------------------------
					<h1>
						In the meantime, you can check out our FAQ page for some common questions and answers. You can also follow us on social media to stay
						updated on our latest news and offers.
					</h1> */}
					<h1>In order to provide you with more details, we have sent you an email that contains further information.</h1>

					<h1>We look forward to hearing from you soon and providing you with the best solution for your needs.</h1>
					<h1>Thank you for choosing us and have a great day!</h1>
				</div>
			)}
		</>
	);
};

export default InquireyForm;
