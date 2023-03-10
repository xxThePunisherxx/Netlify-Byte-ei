import React from "react";
import style from "./AdminCourseListPage.module.css";
import { MdModeEditOutline, MdDeleteSweep, MdOutlineClose } from "react-icons/md";
import axios from "axios";
import uuid from "react-uuid";
import { Link } from "react-router-dom";
import useFetch from "../../Utils/Hooks/fetch";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import MessageBoard from "../../Components/Message Board/MessageBoard";

const AdminCourseListPage = () => {
	const { auth } = useAuth();
	const dummyArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // just for adding skeleton.

	const [showSuccecss, setshowSuccecss] = useState(false);
	const [showFail, setShowFail] = useState(false);
	const [showWorking, setShowWorking] = useState(false);

	const [ShowconfirmDelete, setShowconfirmDelete] = useState(false);
	const [ToDelete, setToDelete] = useState(false);
	const { data: trainingResponse, ispending } = useFetch("https://backendapp.up.railway.app/api/training");
	const trainingData = trainingResponse.training;
	const handleDeletePopup = (id) => {
		setShowconfirmDelete(true);
		setToDelete(id);
	};
	const handleCancel = () => {
		setShowconfirmDelete(false);
	};
	const handleConfirm = async () => {
		setShowWorking(true);

		try {
			let response = await axios.delete("https://backendapp.up.railway.app/api/training/delete/" + ToDelete, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});
			if (response.status === 201) {
				setTimeout(() => {
					setShowWorking(false);
					setshowSuccecss(true);
					setTimeout(() => {
						setshowSuccecss(false);
					}, 1000);
					window.location.reload();
				}, 1000);
			}
		} catch (error) {
			setShowWorking(false);
			setShowFail(true);
			setTimeout(() => {
				setShowFail(false);
			}, 1000);
		}
	};

	return (
		<>
			<div className={style.allCourseWrapper}>
				{/* <h1>Active Courses</h1> */}
				<div className={style.heading}>
					<h1>
						Add <span className={style.Headinghighlight}> Course</span>
					</h1>
				</div>
				{ispending && (
					<div className={style.TrainingGrid}>
						{dummyArr.map(() => (
							<div key={uuid()} className={style.Training}>
								<div className={style.Skel}>
									<div className={style.imgDiv}></div>
									<div className={style.H1Div}></div>
									<div className={style.H2Div}></div>
								</div>
							</div>
						))}
					</div>
				)}
				<div className={style.allCourseGrid}>
					{!ispending &&
						trainingData.map((Training) => (
							<div key={uuid()} className={style.AdminCourseCard}>
								<div className={style.AdminCourseCard_Info}>
									<img src={Training.image} alt={Training.title}></img>
									<h1>{Training.title}</h1>
									<h2>{Training.duration}</h2>
								</div>
								<div className={style.AdminCourseCard_Btn}>
									<Link to={`/admin/updateCourse/${Training._id}`}>
										<button className={style.Edit_Btn}>
											<MdModeEditOutline />
										</button>
									</Link>
									<button
										className={style.Delete_Btn}
										onClick={(e) => {
											handleDeletePopup(Training._id);
										}}
									>
										<MdDeleteSweep />
									</button>
								</div>
							</div>
						))}
				</div>
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
			{showSuccecss && <MessageBoard Message_type="successBoard" Message="Course Deleted Succesfully" />}
			{showWorking && <MessageBoard Message_type="Working" Message="Procressing Please Wait" />}
			{showFail && (
				//* Fail Message
				<MessageBoard Message_type="FailedBoard" Message="Something went wrong. Please try again." />
			)}
		</>
	);
};

export default AdminCourseListPage;
