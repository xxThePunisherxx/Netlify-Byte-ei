import React, { useState } from "react";
import style from "./AddCourseCate.module.css";
import { useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessageBoard from "../../Components/Message Board/MessageBoard";
import useAuth from "../../hooks/useAuth";

const AddCourseCate = () => {
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);
	const { auth } = useAuth();

	const cateRef = useRef();
	const navigate = useNavigate();
	useEffect(() => {
		cateRef.current.focus();
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());
		const postData = {
			course_type: enterdData.course_Category,
		};
		try {
			const response = await axios.post("https://learning-management-system-kx6y.onrender.com/api/category/add", postData, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});

			if (response.status === 201) {
				setShowSuccess(true);
				setTimeout(() => {
					setShowSuccess(false);
					navigate("/admin/dashboard");
				}, 1000);
			}
		} catch (error) {
			setShowFail(true);
			setTimeout(() => {
				setShowFail(false);
				navigate("/admin/dashboard");
			}, 1000);
		}
	};
	return (
		<>
			<div className={style.AddCourseCategoryWrapper}>
				<div className={style.AddCourseCategory}>
					<div className={style.heading}>
						<h1>
							Add <span className={style.Headinghighlight}> Course Category</span>
						</h1>
					</div>
					<form onSubmit={handleSubmit} autoComplete="off" className={style.FormWrapper}>
						<h1>Category Category</h1>
						<input name="course_Category" type="text" required ref={cateRef}></input>
						<button className={style.Spantwo}>Add category</button>
					</form>
				</div>
			</div>
			{showSuccess && (
				//* Success Message
				<MessageBoard Message_type="successBoard" Message="Course category Added successfully" />
			)}
			{showFail && (
				//* Fail Message
				<MessageBoard Message_type="FailedBoard" Message="Something went wrong. Please try again." />
			)}
		</>
	);
};

export default AddCourseCate;
