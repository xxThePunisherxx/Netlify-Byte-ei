import React from "react";
import style from "./AdminTeamList.module.css";
import useFetch from "../../Utils/Hooks/fetch";
import uuid from "react-uuid";
import { MdModeEditOutline, MdDeleteSweep, MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import MessageBoard from "../../Components/Message Board/MessageBoard";

const AdminTeamList = () => {
	const { auth } = useAuth();
	const dummyArr = [0, 1, 2, 3]; // just for adding skeleton.
	const [ShowconfirmDelete, setShowconfirmDelete] = useState(false);
	const [ToDelete, setToDelete] = useState(false);
	const [showSuccecss, setshowSuccecss] = useState(false);
	const [showFail, setShowFail] = useState(false);
	const { data: TeamResponse, ispending } = useFetch("https://learning-management-system-kx6y.onrender.com/api/team/");
	console.log(TeamResponse);
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
		try {
			let response = await axios.delete("https://learning-management-system-kx6y.onrender.com/api/team/delete/" + ToDelete, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});
			if (response.status === 201) {
				setTimeout(() => {
					setshowSuccecss(true);
					setTimeout(() => {
						setshowSuccecss(false);
					}, 1000);
					window.location.reload();
				}, 1000);
			}
		} catch (error) {
			setShowFail(true);
			setTimeout(() => {
				setShowFail(false);
			}, 1000);
		}
	};
	return (
		<>
			<div className={style.Testomonial_wrapper}>
				<div className={style.Testomonial}>
					<h1>Team</h1>
					<div className={style.allCourseGrid}>
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
						{!ispending &&
							TeamResponse.team.slice(0, 8).map((Team) => (
								<div key={uuid()} className={style.AdminCourseCard}>
									<div className={style.AdminCourseCard_Info}>
										<img src={Team.image} alt={Team.title}></img>
										<h1>{Team.name}</h1>
										<h2> {Team.position}</h2>
									</div>
									<div className={style.AdminCourseCard_Btn}>
										<Link to={`/admin/updateTeam/${Team._id}`}>
											<button className={style.Edit_Btn}>
												<MdModeEditOutline />
											</button>
										</Link>

										<button className={style.Delete_Btn} onClick={() => handleDeletePopup(Team._id)}>
											<MdDeleteSweep />
										</button>
									</div>
								</div>
							))}
					</div>
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
			{showSuccecss && <MessageBoard Message_type="successBoard" Message="Deleted Succesfully" />}
			{showFail && <MessageBoard Message_type="FailedBoard" Message="Something went wrong. Please try again." />}
		</>
	);
};

export default AdminTeamList;
