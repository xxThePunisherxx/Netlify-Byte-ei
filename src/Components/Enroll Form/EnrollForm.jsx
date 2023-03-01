import React from "react";
import { useRef, useEffect } from "react";
import style from "./EnrollForm.module.css";
import useFetch from "../../Utils/Hooks/fetch";
import uuid from "react-uuid";
import axios from "axios";
import { useState } from "react";

const EnrollForm = () => {
	const { data: trainingResponse } = useFetch("https://learning-management-system-kx6y.onrender.com/api/training");
	const [showSelectCat, setShowSelectCat] = useState(false);
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
			academicLevel: enterdData.Academic_level,
			phoneNumber: enterdData.mobile_number,
			course: enterdData.dropdown,
		};
		if (enterdData.dropdown !== "null") {
			try {
				const response = await axios.post("https://learning-management-system-kx6y.onrender.com/api/form/add", postData);
				if (response.status === 201) {
					// console.log("Success");
					setSuccess(true);
				}
			} catch (err) {
				// console.log("Failed");
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
							Enroll <span className={style.Heading_hightlight}> Form</span>
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
							Academic Level
							<span className={style.mandatory_hightlight}>
								<sup>*&nbsp;</sup>
							</span>
						</h1>
						<input name="Academic_level" type="text" required></input>
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
			)}
			{Success && <h1>Succesfully Enrolled</h1>}
			{Error && (
				<div className={style.err}>
					<h1>Something went wrong</h1>
				</div>
			)}
		</>
	);
};

export default EnrollForm;
