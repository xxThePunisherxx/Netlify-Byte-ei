import React from "react";
import style from "./UpdateCourseCategory.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useFetchAuth from "../../Utils/Hooks/fetchAuth";
import MessageBoard from "../../Components/Message Board/MessageBoard";

const UpdateCourseCategory = () => {
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFailed, setShowFailed] = useState(false);
	const { auth } = useAuth();
	const [disable, setDisable] = useState(false);
	const [showWorking, setShowWorking] = useState(false);

	const navigate = useNavigate();
	const editcatRef = useRef();
	const { categoryID } = useParams();
	const { data: UserData, ispending } = useFetchAuth(`https://backendapp.up.railway.app/api/category/${categoryID}`);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setDisable(true);
		setShowWorking(true);
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());
		const postData = {
			course_type: enterdData.course_Category,
		};
		try {
			const response = await axios.put(`https://backendapp.up.railway.app/api/category/update/${categoryID}`, postData, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});
			if (response.status === 201) {
				setShowWorking(false);
				setDisable(false);
				setShowSuccess(true);
				setTimeout(() => {
					setTimeout(() => {
						setShowSuccess(false);
					}, 1000);
					navigate("/admin/dashboard");
				}, 2000);
			}
		} catch (error) {
			setShowWorking(false);
			setDisable(false);
			setShowFailed(true);
			setTimeout(() => {
				setShowFailed(false);
			}, 1000);
		}
	};

	return (
		<>
			<div className={style.UpdateCourseCategoryWrapper}>
				<div className={style.UpdateCourseCategory}>
					<div className={style.heading}>
						<h1>
							Update <span className={style.Headinghighlight}> Course Category</span>
						</h1>
					</div>
					{!ispending && (
						<form onSubmit={handleSubmit} autoComplete="off" className={style.FormWrapper}>
							<h1>Category Name</h1>
							<input
								defaultValue={UserData.categorys.course_type}
								name="course_Category"
								type="text"
								placeholder="Course Category"
								required
								ref={editcatRef}
							></input>
							<button disabled={disable}>Submit</button>
						</form>
					)}
				</div>
			</div>

			{showSuccess && (
				//* Success Message on succesfull course addition
				<MessageBoard Message_type="successBoard" Message="Course Category Updated succesfully" />
			)}
			{showWorking && <MessageBoard Message_type="Working" Message="Procressing Please Wait" />}

			{showFailed && (
				//* failed Message on course addition
				<MessageBoard Message_type="FailedBoard" Message="Could not update course category. Please try again." />
			)}
		</>
	);
};

export default UpdateCourseCategory;
