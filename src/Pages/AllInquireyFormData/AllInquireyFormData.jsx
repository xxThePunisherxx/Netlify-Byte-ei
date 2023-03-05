import React from "react";
import style from "./AllInquireyFormData.module.css";
import useFetch from "../../Utils/Hooks/fetch";
import { MdDeleteSweep, MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import MessageBoard from "../../Components/Message Board/MessageBoard";
import { Link } from "react-router-dom";

const AllInquireyFormData = () => {
	const { auth } = useAuth();
	const { data: InquireyFormDataResponse, ispending: InquireyDataPending } = useFetch("https://byte-backend-demo.up.railway.app/api/enquiry");
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);
	const [showWorking, setShowWorking] = useState(false);

	const handleDeletePopupInquirey = (id) => {
		setShowconfirmDeleteInquirey(true);
		setToDeleteInquirey(id);
	};

	const handleCancelInquirey = () => {
		setShowconfirmDeleteInquirey(false);
	};
	const handleConfirmInquirey = async () => {
		setShowWorking(true);
		try {
			let response = await axios.delete("https://byte-backend-demo.up.railway.app/api/enquiry/delete/" + ToDeleteInquirey, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});

			if (response.status === 201) {
				setTimeout(() => {
					setShowWorking(false);
					setShowSuccess(true);
					setShowconfirmDeleteInquirey(false);
					setTimeout(() => {
						setShowSuccess(false);
					}, 1000);
					window.location.reload();
				}, 1000);
			}
		} catch (error) {
			setShowWorking(false);
			setShowFail(true);
			setTimeout(() => {
				setShowFail(false);
				setShowconfirmDeleteInquirey(false);
			}, 1000);
		}
	};
	const [ShowconfirmDeleteInquirey, setShowconfirmDeleteInquirey] = useState(false);
	const [ToDeleteInquirey, setToDeleteInquirey] = useState();

	return (
		<>
			<div className={style.InquireyFormDataWrapper}>
				<h1>
					Data From
					<span className={style.HeadingHighlight}> Inquirey Form</span>
				</h1>
				{!InquireyDataPending && (
					<div className={style.Enroll_Data}>
						<div className={style.Inquirey_Table_Headings}>
							<h2>Name</h2>
							<h2>Email</h2>
							<h2>Phone Number</h2>
							<h2>Course</h2>
							<h2>Message</h2>
						</div>
						{InquireyFormDataResponse.enquiry.map((Data) => {
							return (
								<div className={style.Inquirey_Table_Data} key={Data._id}>
									<h3>
										<Link to={`/admin/IndividualInquireyData/${Data._id}`}>{Data.legalName}</Link>
									</h3>
									<h3>
										<Link to={`/admin/IndividualInquireyData/${Data._id}`}>{Data.email}</Link>
									</h3>
									<h3>
										<Link to={`/admin/IndividualInquireyData/${Data._id}`}>{Data.phoneNumber}</Link>
									</h3>
									<h3>
										<Link to={`/admin/IndividualInquireyData/${Data._id}`}>{Data.course}</Link>
									</h3>
									<div className={style.Text_Ellipse}>
										<h3>
											<Link to={`/admin/IndividualInquireyData/${Data._id}`}>{Data.message}</Link>
										</h3>
									</div>
									<button className={style.Delete_Btn} onClick={() => handleDeletePopupInquirey(Data._id)}>
										<MdDeleteSweep />
									</button>
								</div>
							);
						})}
					</div>
				)}
			</div>
			{ShowconfirmDeleteInquirey && (
				//  ----------------------------------------- delete inquirey form data popup --------------------------------------------------------
				<div className={style.popup}>
					<div className={style.close_btn}>
						<h1>
							<button onClick={handleCancelInquirey}>
								<MdOutlineClose />
							</button>
						</h1>
					</div>
					<div className={style.contnets}>
						<h1>Are you sure you want to proceed?</h1>
						<h2> This action cannot be reversed.</h2>
					</div>
					<div className={style.button_grid}>
						<button className={style.delete} onClick={handleConfirmInquirey}>
							Delete
						</button>
						<button className={style.cancel} onClick={handleCancelInquirey}>
							Cancel
						</button>
					</div>
				</div>
			)}
			{showSuccess && (
				//* Success Message
				<MessageBoard Message_type="successBoard" Message="Removed succesfully" />
			)}
			{showWorking && <MessageBoard Message_type="Working" Message="Procressing Please Wait" />}
			{showFail && (
				//* Fail Message
				<MessageBoard Message_type="FailedBoard" Message="Something went wrong. Please try again." />
			)}
		</>
	);
};

export default AllInquireyFormData;
