import React from "react";
import style from "./SubmittedFormData.module.css";
import useFetch from "../../Utils/Hooks/fetch";
import { MdDeleteSweep, MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import MessageBoard from "../../Components/Message Board/MessageBoard";

const SubmittedFormData = () => {
	const { auth } = useAuth();
	const { data: EnrollFormDataResponse, ispending: EnrollDataPending } = useFetch("https://learning-management-system-kx6y.onrender.com/api/form");
	const { data: ContactFormDataResponse, ispending: ContactDataPending } = useFetch(
		"https://learning-management-system-kx6y.onrender.com/api/feedback"
	);
	const { data: InquireyFormDataResponse, ispending: InquireyDataPending } = useFetch(
		"https://learning-management-system-kx6y.onrender.com/api/enquiry"
	);

	// const [ShowconfirmDelete, setShowconfirmDelete] = useState(false);
	const [ShowconfirmDeleteEnroll, setShowconfirmDeleteEnroll] = useState(false);
	const [ShowconfirmDeleteInquirey, setShowconfirmDeleteInquirey] = useState(false);
	const [ShowconfirmDeleteContact, setShowconfirmDeleteContact] = useState(false);

	const [ToDeleteEnroll, setToDeleteEnroll] = useState(null);
	const [ToDeleteInquirey, setToDeleteInquirey] = useState();
	const [ToDeleteContact, setToDeleteContact] = useState();
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);
	// ! remove on final deploy

	const handleDeletePopupEnroll = (id) => {
		setShowconfirmDeleteEnroll(true);
		setToDeleteEnroll(id);
	};
	const handleDeletePopupInquirey = (id) => {
		setShowconfirmDeleteInquirey(true);
		setToDeleteInquirey(id);
	};
	const handleDeletePopupContact = (id) => {
		setShowconfirmDeleteContact(true);
		setToDeleteContact(id);
	};

	const handleCancelEnroll = () => {
		setShowconfirmDeleteEnroll(false);
	};
	const handleCancelInquirey = () => {
		setShowconfirmDeleteInquirey(false);
	};
	const handleCancelContact = () => {
		setShowconfirmDeleteContact(false);
		// setToDeleteContact(null);
	};

	const handleConfirmEnroll = async () => {
		try {
			let response = await axios.delete("https://learning-management-system-kx6y.onrender.com/api/form/delete/" + ToDeleteEnroll, {
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
	const handleConfirmInquirey = async () => {
		try {
			let response = await axios.delete("https://learning-management-system-kx6y.onrender.com/api/enquiry/delete/" + ToDeleteInquirey, {
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
	const handleConfirmContact = async () => {
		try {
			let response = await axios.delete("https://learning-management-system-kx6y.onrender.com/api/feedback/delete/" + ToDeleteContact, {
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
			<div className={style.FormData_Wrapper}>
				<div className={style.EnrollFormDataWrapper}>
					<h1>Data From Enroll Form </h1>
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
										<h3>{Data.legalName}</h3>
										<h3>{Data.email}</h3>
										<h3>{Data.phoneNumber}</h3>
										<h3>{Data.course}</h3>
										<button className={style.Delete_Btn} onClick={() => handleDeletePopupEnroll(Data._id)}>
											<MdDeleteSweep />
										</button>
									</div>
								);
							})}
						</div>
					)}
					<div className={style.InquireyFormDataWrapper}>
						<h1>Data From Inquirey Form </h1>
						{!InquireyDataPending && (
							<div className={style.Enroll_Data}>
								<div className={style.Inquirey_Table_Headings}>
									<h2>Name</h2>
									<h2>Course</h2>
									<h2>Email</h2>
									<h2>Phone Number</h2>
									<h2>Message</h2>
								</div>
								{InquireyFormDataResponse.enquiry.map((Data) => {
									return (
										<div className={style.Inquirey_Table_Data} key={Data._id}>
											<h3>{Data.legalName}</h3>
											<h3>{Data.course}</h3>
											<h3>{Data.email}</h3>
											<h3>{Data.phoneNumber}</h3>
											<div className={style.Text_Ellipse}>
												<h3>{Data.message}</h3>
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
					<div className={style.ContactFormDataWrapper}>
						<h1>Data From Contact Us Form </h1>
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
											<h3>{Data.legalName}</h3>
											<h3>{Data.email}</h3>
											<h3>{Data.phoneNumber}</h3>
											<div className={style.Text_Ellipse}>
												<h3>{Data.message}</h3>
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
				</div>
			</div>
			{ShowconfirmDeleteEnroll && (
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
			{ShowconfirmDeleteInquirey && (
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
			{ShowconfirmDeleteContact && (
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
			{showFail && (
				//* Fail Message
				<MessageBoard Message_type="FailedBoard" Message="Something went wrong. Please try again." />
			)}
		</>
	);
};

export default SubmittedFormData;
