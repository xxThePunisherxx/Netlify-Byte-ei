import React from "react";
import { useRef, useEffect } from "react";
import style from "./InquireyForm.module.css";
import useFetch from "../../Utils/Hooks/fetch";
import uuid from "react-uuid";
import axios from "axios";
import { useState } from "react";

const InquireyForm = () => {
	const { data: trainingResponse } = useFetch("https://learning-management-system-kx6y.onrender.com/api/training");
	const [showSelectCat, setShowSelectCat] = useState(false);

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
		// console.log(enterdData);
		console.log(postData);
		if (enterdData.dropdown !== "null") {
			try {
				const response = await axios.post("https://learning-management-system-kx6y.onrender.com/api/enquiry/add", postData);
				if (response.status === 201) {
					console.log("Success");
					// setShowSuccess(true);
					// setTimeout(() => {
					// 	setTimeout(() => {
					// 		setShowSuccess(false);
					// 	}, 1000);
					// 	navigate("/admin/dashboard");
					// }, 2000);
				}
			} catch (err) {
				console.log("Failed");
				// setShowFailed(true);
				// setTimeout(() => {
				// 	setShowFailed(false);
				// }, 1000);
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
				<button className={style.Spantwo}>Submit</button>
			</form>
		</div>
	);
};

export default InquireyForm;
