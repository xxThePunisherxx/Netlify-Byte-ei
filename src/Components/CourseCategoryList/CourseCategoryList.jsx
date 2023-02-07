import React from "react";

import style from "./CourseCategoryList.module.css";
import { MdModeEditOutline, MdDeleteSweep } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { Link } from "react-router-dom";

const CourseCategoryList = () => {
	const [trainingCategoryList, setTrainingCategoryList] = useState([{}]);

	useEffect(() => {
		//get list of all training categories from  the db
		const fetchData = async () => {
			try {
				let response = await axios.get("http://localhost:8080/api/category");
				setTrainingCategoryList(response.data.categorys);
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
	}, []);

	const handleDelete = async (id, e) => {
		try {
			let response = await axios.delete("http://localhost:8080/api/category/delete/" + id);
			console.log(response.data);
			if (response.status === 201) {
				setTimeout(() => {
					window.location.reload();
				}, 500);
			}
		} catch (error) {
			console.log("Error" + error.message);
		}
	};
	return (
		<div className={style.Categories_Wrapper}>
			<h1>Course Categories</h1>
			<div className={style.Categories_Grid}>
				{trainingCategoryList.map((category) => (
					<div key={uuid()} className={style.Categories_Card}>
						<h1>{category.course_type}</h1>
						<Link to={`/admin/updateCourseCategory/${category._id}`}>
							<button className={style.Edit_Btn}>
								<MdModeEditOutline />
							</button>
						</Link>
						<button className={style.Delete_Btn} onClick={(e) => handleDelete(category._id, e)}>
							<MdDeleteSweep />
						</button>
					</div>
				))}
			</div>
			<button className={style.new}>Add Course Category</button>
		</div>
	);
};

export default CourseCategoryList;
