import React from "react";
import style from "./UpdateCourseCategory.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

const UpdateCourseCategory = () => {
	const navigate = useNavigate();
	const editcatRef = useRef();
	const { categoryID } = useParams();
	const [responseCategory, setresponseCategory] = useState([{}]);
	useEffect(() => {
		//set focus to first form input
		editcatRef.current.focus();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			// get request to get pre-update value of the course.
			try {
				let response = await axios.get("http://localhost:8080/api/category/" + categoryID);
				setresponseCategory(response.data); //  data feilds of individual course
			} catch (error) {
				if (error.response) {
					console.log(error.response.status);
					console.log(error.response.headers);
				} else {
					console.log(`Error: ${error.message}`);
				}
			}
		};
		fetchData();
	}, [categoryID]);
	console.log(responseCategory);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());
		console.log(enterdData);
		const postData = {
			course_type: enterdData.course_Category,
		};
		try {
			const response = await axios.put(`http://localhost:8080/api/category/update/${categoryID}`, postData);
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
		<div className={style.UpdateCourseCategoryWrapper}>
			<div className={style.UpdateCourseCategory}>
				<div className={style.heading}>
					<h1>
						Update <span className={style.Headinghighlight}> Course Category</span>
					</h1>
				</div>
				<form onSubmit={handleSubmit} autoComplete="off" className={style.FormWrapper}>
					<h1>Category Name:</h1>
					<input
						defaultValue={responseCategory.course_type}
						name="course_Category"
						type="text"
						placeholder="Course Category"
						required
						ref={editcatRef}
					></input>
					<button className={style.Spantwo}>Submit</button>
				</form>
			</div>
		</div>
	);
};

export default UpdateCourseCategory;
