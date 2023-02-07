import React from "react";
import { useRef, useEffect } from "react";
import style from "./EnrollForm.module.css";

import { CategoryList } from "../../Data/Categories";

const EnrollForm = () => {
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
					Enroll <span className={style.Heading_hightlight}> Form</span>
				</h1>
				<h2>
					Please fill out the form below to get started. All feilds with (<span className={style.mandatory_hightlight}>*</span>) are mandatory
				</h2>
			</div>
			<form onSubmit={handlesubmit} autoComplete="off" className={style.Enrorll_FormWrappper}>
				<h1>
					Full Name
					<span className={style.mandatory_hightlight}>
						<sup>*&nbsp;</sup>
					</span>
				</h1>
				<input name="Full name" type="text" placeholder="Full Name" required ref={EnrollRef}></input>
				<h1>
					Email
					<span className={style.mandatory_hightlight}>
						<sup>*&nbsp;</sup>
					</span>
				</h1>
				<input name="Email" type="email" placeholder="your email" required></input>
				<h1>
					Mobile
					<span className={style.mandatory_hightlight}>
						<sup>*&nbsp;</sup>
					</span>
				</h1>
				<input name="mobile number" type="number" placeholder=" 987654321" required></input>

				<h1>
					Academic Level
					<span className={style.mandatory_hightlight}>
						<sup>*&nbsp;</sup>
					</span>
				</h1>
				<input name="Academic level" type="text" placeholder="Academic level" required></input>
				<h1>
					Course
					<span className={style.mandatory_hightlight}>
						<sup>*&nbsp;</sup>
					</span>
				</h1>
				<select name="dropdown">
					<option>Select Category</option>
					{CategoryList.map((Category) => (
						<option key={Category.key}>{Category.value}</option>
					))}
				</select>
				<button className={style.Spantwo}>Submit</button>
			</form>
		</div>
	);
};

export default EnrollForm;
