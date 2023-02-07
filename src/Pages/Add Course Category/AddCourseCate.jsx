import React from "react";
import style from "./AddCourseCate.module.css";
import { useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCourseCate = () => {
	const cateRef = useRef();
	const navigate = useNavigate();
	useEffect(() => {
		cateRef.current.focus();
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());
		console.log(enterdData);
		const postData = {
			course_type: enterdData.course_Category,
		};
		try {
			const response = await axios.post("http://localhost:8080/api/category/add", postData);
			console.log(response);
			setTimeout(() => {
				navigate("/admin/dashboard");
			}, 1000);

			// if (response.status === 201) {
			// 	setTimeout(() => {
			// 		navigate("/admin/dashboard");
			// 	}, 1000);
			// }
		} catch (error) {
			console.log("error " + error);
		}
	};
	return (
		<div className={style.AddCourseCategoryWrapper}>
			<div className={style.AddCourseCategory}>
				<div className={style.heading}>
					<h1>
						Add <span className={style.Headinghighlight}> Course Category</span>
					</h1>
				</div>
				<form onSubmit={handleSubmit} autoComplete="off" className={style.FormWrapper}>
					<h1>Category Name:</h1>
					<input name="course_Category" type="text" placeholder="Course Category" required ref={cateRef}></input>
					<button className={style.Spantwo}>Submit</button>
				</form>
			</div>
		</div>
	);
};

export default AddCourseCate;
