import React, { useState } from "react";

import style from "./CourseCategoryList.module.css";
import { MdModeEditOutline, MdDeleteSweep, MdOutlineClose } from "react-icons/md";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import uuid from "react-uuid";
import { Link } from "react-router-dom";
import useFetchAuth from "../../Utils/Hooks/fetchAuth";
import MessageBoard from "../../Components/Message Board/MessageBoard";

const CourseCategoryList = () => {
	const { auth } = useAuth();
	const [ShowconfirmDelete, setShowconfirmDelete] = useState(false);
	const [ToDelete, setToDelete] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);

	const dummyArr = [0, 1, 2, 3, 4, 5]; // just for adding skeleton.
	const { data: trainingData, ispending } = useFetchAuth("https://learning-management-system-kx6y.onrender.com/api/category");
	//  * new function
	const handleDeletePopup = (id) => {
		// show popup for confirming delete.
		setShowconfirmDelete(true);
		setToDelete(id);
	};
	const handleCancel = () => {
		// hide popup for delete confirmation.
		setShowconfirmDelete(false);
	};

	const handleConfirm = async () => {
		// console.log("sdadasd");
		try {
			let response = await axios.delete("https://learning-management-system-kx6y.onrender.com/api/category/delete/" + ToDelete, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});
			console.log(response);
			if (response.status === 201) {
				setTimeout(() => {
					setShowSuccess(true);
					setShowconfirmDelete(false);
					setTimeout(() => {
						setShowSuccess(false);
					}, 1000);
					window.location.reload();
				}, 1000);
			}
		} catch (error) {
			setShowFail(true);
			setTimeout(() => {
				setShowFail(false);
				setShowconfirmDelete(false);
			}, 1000);
		}
	};

	return (
		<>
			<div className={style.Categories_Wrapper}>
				<h1>
					Course <span className={style.Heading_Highlight}>Categories</span>
				</h1>
				{ispending && (
					<div className={style.TrainingGrid}>
						{dummyArr.map(() => (
							<div key={uuid()} className={style.Training}>
								<div className={style.Skel}>
									<div className={style.H1Div}></div>
									{/* <div className={style.H1Div}></div> */}
								</div>
							</div>
						))}
					</div>
				)}
				{!ispending && (
					<>
						<div className={style.Category_Table_Header}>
							<h1>Course Category</h1>
						</div>
						<div className={style.Categories_Grid}>
							{trainingData.categorys.map((category) => (
								<div key={uuid()} className={style.Categories_Card}>
									<h1>{category.course_type}</h1>
									<div className={style.Action_Buttons}>
										<Link to={`/admin/updateCourseCategory/${category._id}`}>
											<button className={style.Edit_Btn}>
												<MdModeEditOutline />
											</button>
										</Link>
										<button
											className={style.Delete_Btn}
											onClick={() => {
												handleDeletePopup(category._id);
											}}
										>
											{/* <button className={style.Delete_Btn} onClick={(e) => handleDelete(category._id, e)}> */}
											<MdDeleteSweep />
										</button>
									</div>
								</div>
							))}
						</div>
						{ShowconfirmDelete && (
							<div className={style.popup}>
								<div className={style.close_btn}>
									<h1>
										<button onClick={handleCancel}>
											<MdOutlineClose />
										</button>
									</h1>
								</div>
								<div className={style.contnets}>
									<h1>Are you sure you want to proceed?</h1>
									<h2> This action cannot be reversed.</h2>
								</div>
								<div className={style.button_grid}>
									<button className={style.delete} onClick={handleConfirm}>
										Delete
									</button>
									<button className={style.cancel} onClick={handleCancel}>
										Cancel
									</button>
								</div>
							</div>
						)}
					</>
				)}
			</div>
			{showSuccess && (
				//* Success Message
				<MessageBoard Message_type="successBoard" Message="Course category Added succesfully" />
			)}
			{showFail && (
				//* Fail Message
				<MessageBoard Message_type="FailedBoard" Message="Something went wrong. Please try again." />
			)}
		</>
	);
};

export default CourseCategoryList;
