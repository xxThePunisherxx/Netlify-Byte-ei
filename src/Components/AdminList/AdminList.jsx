import React from "react";
import style from "./AdminList.module.css";
import { MdModeEditOutline, MdDeleteSweep, MdOutlineClose } from "react-icons/md";
import useFetchAuth from "../../Utils/Hooks/fetchAuth";
import uuid from "react-uuid";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import MessageBoard from "../../Components/Message Board/MessageBoard";

const AdminList = () => {
	const [ShowconfirmDelete, setShowconfirmDelete] = useState(false);
	const [ToDelete, setToDelete] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);
	const dummyArr = [0, 1, 2]; // just for adding skeleton.
	const { auth } = useAuth();
	const { data: trainingData, ispending } = useFetchAuth("http://localhost:8080/api/user/admin/users");
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
			let response = await axios.delete("http://localhost:8080/api/user/delete/" + ToDelete, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});

			if (response.status === 200) {
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
			<div className={style.AdminList}>
				<h1>
					Admin <span className={style.HeadingHighlight}>List</span>
				</h1>
				{ispending && (
					<div className={style.TrainingGrid}>
						{dummyArr.map(() => (
							<div key={uuid()} className={style.Training}>
								<div className={style.Skel}>
									<div className={style.H1Div}></div>
									<div className={style.H1Div}></div>
									<div className={style.H1Div}></div>
									<div className={style.H1Div}></div>
								</div>
							</div>
						))}
					</div>
				)}
				{!ispending && (
					<div className={style.allAdminWrapper}>
						<div className={style.allAdminGrid}>
							<div className={style.admin_Table_Heading}>
								<h1>User Name</h1>
								<h1>Role</h1>
								<h1>Email</h1>
								<h1>&nbsp;</h1>
								<h1>&nbsp;</h1>
							</div>
							{trainingData.users.map((Admin) => {
								if (Admin.role === "superAdmin") {
									Admin.Disable = true;
								} else {
									Admin.Disable = false;
								}
								return (
									<div key={uuid()} className={style.admin_Table}>
										<h1>{Admin.name}</h1>
										<h1>{Admin.role}</h1>
										<h1>{Admin.email}</h1>
										<Link to={`/admin/updateUser/${Admin._id}`}>
											<button className={style.Edit_Btn} disabled={Admin.Disable}>
												<MdModeEditOutline />
											</button>
										</Link>
										<button className={style.Delete_Btn} disabled={Admin.Disable} onClick={() => handleDeletePopup(Admin._id)}>
											<MdDeleteSweep />
										</button>
									</div>
								);
							})}
							{/* {!ispending && (
								<Link to={"/admin/addAdmin"}>
									<button className={style.new}>Add admin</button>
								</Link>
							)} */}
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
						</div>
					</div>
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

export default AdminList;
