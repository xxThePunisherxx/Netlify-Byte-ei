import React, { useState } from "react";
import useFetch from "../../Utils/Hooks/fetch";
import style from "./AllEnrollFormData.module.css";
import { MdDeleteSweep, MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import MessageBoard from "../../Components/Message Board/MessageBoard";

const AllEnrollFormData = () => {
	const { auth } = useAuth();

	const { data: EnrollFormDataResponse, ispending: EnrollDataPending } = useFetch("https://byte-backend-demo.up.railway.app/api/form");
	const [ShowconfirmDeleteEnroll, setShowconfirmDeleteEnroll] = useState(false);
	const [ToDeleteEnroll, setToDeleteEnroll] = useState();
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);

	const handleDeletePopupEnroll = (id) => {
		setShowconfirmDeleteEnroll(true);
		setToDeleteEnroll(id);
	};

	const handleCancelEnroll = () => {
		setShowconfirmDeleteEnroll(false);
	};
	const handleConfirmEnroll = async () => {
		try {
			let response = await axios.delete("https://byte-backend-demo.up.railway.app/api/form/delete/" + ToDeleteEnroll, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});

			if (response.status === 201) {
				setTimeout(() => {
					setShowSuccess(true);
					setShowconfirmDeleteEnroll(false);
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
				setShowconfirmDeleteEnroll(false);
			}, 1000);
		}
	};
	return (
		<>
			<div className={style.EnrollFormDataWrapper}>
				<h1>
					Data From <span className={style.HeadingHighlight}> Enroll Form</span>
				</h1>
				{!EnrollDataPending && (
					<div className={style.Enroll_Data}>
						<div className={style.Enroll_Table_Headings}>
							<h2>Name</h2>
							<h2>Email</h2>
							<h2>Phone Number</h2>
							<h2>Course</h2>
						</div>
						{EnrollFormDataResponse.registerForm.map((Data) => {
							return (
								<div className={style.Enroll_Table_Data} key={Data._id}>
									<h3>
										<Link to={`/admin/IndividualEnrollData/${Data._id}`}>{Data.legalName}</Link>
									</h3>
									<h3>
										<Link to={`/admin/IndividualEnrollData/${Data._id}`}>{Data.email}</Link>
									</h3>
									<h3>
										<Link to={`/admin/IndividualEnrollData/${Data._id}`}>{Data.phoneNumber}</Link>
									</h3>
									<h3>
										<Link to={`/admin/IndividualEnrollData/${Data._id}`}>{Data.course}</Link>
									</h3>
									<button className={style.Delete_Btn} onClick={() => handleDeletePopupEnroll(Data._id)}>
										<MdDeleteSweep />
									</button>
								</div>
							);
						})}
					</div>
				)}
			</div>
			;
			{ShowconfirmDeleteEnroll && (
				// --------------------------------------------- Delete Enroll form data popup ---------------------------------------------------------
				<div className={style.popup}>
					<div className={style.close_btn}>
						<h1>
							<button onClick={handleCancelEnroll}>
								<MdOutlineClose />
							</button>
						</h1>
					</div>
					<div className={style.contnets}>
						<h1>Are you sure you want to proceed?</h1>
						<h2> This action cannot be reversed.</h2>
					</div>
					<div className={style.button_grid}>
						<button className={style.delete} onClick={handleConfirmEnroll}>
							Delete
						</button>
						<button className={style.cancel} onClick={handleCancelEnroll}>
							Cancel
						</button>
					</div>
				</div>
			)}
			{showSuccess && (
				//* Success Message
				<MessageBoard Message_type="successBoard" Message="Removed succesfully" />
			)}
			{showFail && (
				//* Fail Message
				<MessageBoard Message_type="FailedBoard" Message="Something went wrong. Please try again." />
			)}
		</>
	);
};

export default AllEnrollFormData;
