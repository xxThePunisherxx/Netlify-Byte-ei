import React from "react";
import style from "./AllContactFormData.module.css";
import useFetch from "../../Utils/Hooks/fetch";
import { MdDeleteSweep, MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import MessageBoard from "../../Components/Message Board/MessageBoard";
import { Link } from "react-router-dom";

const AllContactFormData = () => {
	const { data: ContactFormDataResponse, ispending: ContactDataPending } = useFetch("https://byte-backend-demo.up.railway.app/api/feedback");
	const { auth } = useAuth();
	const [ShowconfirmDeleteContact, setShowconfirmDeleteContact] = useState(false);
	const [ToDeleteContact, setToDeleteContact] = useState();
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);
	const [showWorking, setShowWorking] = useState(false);
	const handleDeletePopupContact = (id) => {
		setShowconfirmDeleteContact(true);
		setToDeleteContact(id);
	};
	const handleCancelContact = () => {
		setShowconfirmDeleteContact(false);
	};
	const handleConfirmContact = async () => {
		setShowWorking(true);
		try {
			let response = await axios.delete("https://byte-backend-demo.up.railway.app/api/feedback/delete/" + ToDeleteContact, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});
			if (response.status === 201) {
				setTimeout(() => {
					setShowWorking(false);
					setShowSuccess(true);
					setShowconfirmDeleteContact(false);
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
				setShowconfirmDeleteContact(false);
			}, 1000);
		}
	};
	return (
		<>
			<div className={style.ContactFormDataWrapper}>
				<h1>
					Data From
					<span className={style.HeadingHighlight}> Contact Us Form</span>
				</h1>
				{!ContactDataPending && (
					<div className={style.Contact_Data}>
						<div className={style.Contact_Table_Headings}>
							<h2>Name</h2>
							<h2>Email</h2>
							<h2>Phone Number</h2>
							<h2>Message</h2>
						</div>
						{ContactFormDataResponse.feedback.map((Data) => {
							return (
								<div className={style.Contact_Table_Data} key={Data._id}>
									<h3>
										<Link to={`/admin/IndividualContactData/${Data._id}`}>{Data.legalName}</Link>
									</h3>
									<h3>
										<Link to={`/admin/IndividualContactData/${Data._id}`}>{Data.email}</Link>
									</h3>
									<h3>
										<Link to={`/admin/IndividualContactData/${Data._id}`}>{Data.phoneNumber}</Link>
									</h3>

									<div className={style.Text_Ellipse}>
										<h3>
											<Link to={`/admin/IndividualContactData/${Data._id}`}>{Data.message}</Link>
										</h3>
									</div>
									<button className={style.Delete_Btn} onClick={() => handleDeletePopupContact(Data._id)}>
										<MdDeleteSweep />
									</button>
								</div>
							);
						})}
					</div>
				)}
			</div>
			{ShowconfirmDeleteContact && (
				//  -------------------------------------------------------- delete contact form  data popup -----------------------------------------
				<div className={style.popup}>
					<div className={style.close_btn}>
						<h1>
							<button onClick={handleCancelContact}>
								<MdOutlineClose />
							</button>
						</h1>
					</div>
					<div className={style.contnets}>
						<h1>Are you sure you want to proceed?</h1>
						<h2> This action cannot be reversed.</h2>
					</div>
					<div className={style.button_grid}>
						<button className={style.delete} onClick={handleConfirmContact}>
							Delete
						</button>
						<button className={style.cancel} onClick={handleCancelContact}>
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

export default AllContactFormData;
