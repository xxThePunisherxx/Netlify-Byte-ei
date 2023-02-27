import React from "react";
import { useRef, useEffect } from "react";
import style from "./InquireyForm.module.css";
import useFetch from "../../Utils/Hooks/fetch";
import uuid from "react-uuid";

const InquireyForm = () => {
	const { data: trainingResponse } = useFetch("https://learning-management-system-kx6y.onrender.com/api/training");

	const EnrollRef = useRef();
	const handlesubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());

		console.log(enterdData);
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
				<input name="Full name" type="text" required ref={EnrollRef}></input>
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
				<input name="mobile number" type="text" required></input>

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
				<select name="dropdown">
					<option>Select Category</option>
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
