import React from "react";
import style from "./SubmittedFormData.module.css";
import useFetch from "../../Utils/Hooks/fetch";
import { MdDeleteSweep, MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import MessageBoard from "../../Components/Message Board/MessageBoard";
import { Link } from "react-router-dom";

const SubmittedFormData = () => {
	const { auth } = useAuth();
	const { data: EnrollFormDataResponse, ispending: EnrollDataPending } = useFetch("https://byte-backend-demo.up.railway.app/api/form");
	const { data: ContactFormDataResponse, ispending: ContactDataPending } = useFetch("https://byte-backend-demo.up.railway.app/api/feedback");
	const { data: InquireyFormDataResponse, ispending: InquireyDataPending } = useFetch("https://byte-backend-demo.up.railway.app/api/enquiry");

	// ------------------------------state to handle delete confirmation poups---------------------------------------------------------------------

	const [ShowconfirmDeleteEnroll, setShowconfirmDeleteEnroll] = useState(false);
	const [ShowconfirmDeleteInquirey, setShowconfirmDeleteInquirey] = useState(false);
	const [ShowconfirmDeleteContact, setShowconfirmDeleteContact] = useState(false);

	//  ------------------------------------------ state to store id of things to delete -------------------------------------------------------

	const [ToDeleteEnroll, setToDeleteEnroll] = useState();
	const [ToDeleteInquirey, setToDeleteInquirey] = useState();
	const [ToDeleteContact, setToDeleteContact] = useState();

	//  --------------------------------------------- message board ---------------------------------------------------------------------------

	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);

	// ----------------------------------------------- Function to handle respective delete popus --------------------------------------------

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

	// -------------------------------------------- functions to handle respective cancel action on popups -------------------------------------------

	const handleCancelEnroll = () => {
		setShowconfirmDeleteEnroll(false);
	};
	const handleCancelInquirey = () => {
		setShowconfirmDeleteInquirey(false);
	};
	const handleCancelContact = () => {
		setShowconfirmDeleteContact(false);
	};

	// ----------------------------------------- function to handle delete confirmation on respective popups -------------------------------------------
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
	const handleConfirmInquirey = async () => {
		try {
			let response = await axios.delete("https://byte-backend-demo.up.railway.app/api/enquiry/delete/" + ToDeleteInquirey, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});

			if (response.status === 201) {
				setTimeout(() => {
					setShowSuccess(true);
					setShowconfirmDeleteInquirey(false);
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
				setShowconfirmDeleteInquirey(false);
			}, 1000);
		}
	};
	const handleConfirmContact = async () => {
		try {
			let response = await axios.delete("https://byte-backend-demo.up.railway.app/api/feedback/delete/" + ToDeleteContact, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});
			if (response.status === 201) {
				setTimeout(() => {
					setShowSuccess(true);
					setShowconfirmDeleteContact(false);
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
				setShowconfirmDeleteContact(false);
			}, 1000);
		}
	};

	return (
		<>
			<div className={style.FormData_Wrapper}>
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
							{EnrollFormDataResponse.registerForm.slice(0, 5).map((Data) => {
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
							<Link to={"/admin/allEnrollData"}>
								<button className={style.View_btn}>View All Data</button>
							</Link>
						</div>
					)}
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
								{InquireyFormDataResponse.enquiry.slice(0, 5).map((Data) => {
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
								<Link to={"/admin/allInquireyData"}>
									<button className={style.View_btn}>View All Data</button>
								</Link>
							</div>
						)}
					</div>
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
								{ContactFormDataResponse.feedback.slice(0, 5).map((Data) => {
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
								<Link to={"/admin/allContactData"}>
									<button className={style.View_btn}>View All Data</button>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>

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
			{showFail && (
				//* Fail Message
				<MessageBoard Message_type="FailedBoard" Message="Something went wrong. Please try again." />
			)}
		</>
	);
};

export default SubmittedFormData;
