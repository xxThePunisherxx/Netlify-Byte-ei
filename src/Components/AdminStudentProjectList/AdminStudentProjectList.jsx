import React from "react";
import style from "./AdminStudentProjectList.module.css";
import useFetch from "../../Utils/Hooks/fetch";
import uuid from "react-uuid";
import { MdModeEditOutline, MdDeleteSweep, MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import MessageBoard from "../../Components/Message Board/MessageBoard";

const AdminStudentProjectList = () => {
	const { auth } = useAuth();

	// -------------------------------------------------- just for adding skeleton. ----------------------------------------------------------------------------------------------------
	const dummyArr = [0, 1, 2, 3];

	// -------------------------------------------------- things for delete popup ----------------------------------------------------------------------------------------------------
	const [ShowconfirmDelete, setShowconfirmDelete] = useState(false);
	const [ToDelete, setToDelete] = useState(false);

	//  -------------------------------------------------- things for showing or hiding message board --------------------------------------------------
	const [showSuccecss, setshowSuccecss] = useState(false);
	const [showFail, setShowFail] = useState(false);
	const [showWorking, setShowWorking] = useState(false);

	const { data: ProjectData, ispending } = useFetch("https://byte-backend-demo.up.railway.app/api/project");
	let ProjectDataArr = ProjectData?.studentProjects;

	const handleDeletePopup = (id) => {
		// --------------------------------------------------show popup for confirming delete.----------------------------------------------------------------------------------------------------
		setShowconfirmDelete(true);
		setToDelete(id);
	};
	const handleCancel = () => {
		// -------------------------------------------------- hide popup for delete confirmation.  --------------------------------------------------
		setShowconfirmDelete(false);
	};
	const handleConfirm = async () => {
		setShowWorking(true);
		try {
			let response = await axios.delete("https://byte-backend-demo.up.railway.app/api/project/delete/" + ToDelete, {
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
			<div className={style.Testomonial_wrapper}>
				<div className={style.Testomonial}>
					<h1>
						Students
						<span className={style.Heading_hightlight}> Projects</span>
					</h1>
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
							ProjectDataArr.map((Team) => (
								<div key={uuid()} className={style.AdminCourseCard}>
									<div className={style.AdminCourseCard_Info}>
										<img src={Team.image} alt={Team.title}></img>
										<h1>{Team.title}</h1>
										<div className={style.Text_Ellipse}>
											<div dangerouslySetInnerHTML={{ __html: Team.description }}></div>
										</div>
									</div>
									<div className={style.AdminCourseCard_Btn}>
										<Link to={`/admin/updateStudentProject/${Team._id}`}>
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
			{showWorking && <MessageBoard Message_type="Working" Message="Procressing Please Wait" />}
			{showFail && <MessageBoard Message_type="FailedBoard" Message="Something went wrong. Please try again." />}
		</>
	);
};

export default AdminStudentProjectList;
