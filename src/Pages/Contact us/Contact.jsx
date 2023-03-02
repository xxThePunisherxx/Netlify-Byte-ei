import React from "react";
import { useRef } from "react";
import style from "./Contact.module.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
	const EnrollRef = useRef();
	const [Error, setError] = useState(false);
	const [Success, setSuccess] = useState(false);

	const handlesubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());
		const postData = {
			legalName: enterdData.Full_name,
			email: enterdData.Email,
			academicLevel: enterdData.Academic_level,
			phoneNumber: enterdData.mobile_number,
			message: enterdData.Message,
		};
		try {
			const response = await axios.post("https://learning-management-system-kx6y.onrender.com/api/feedback/add", postData);

			if (response.status === 201) {
				setSuccess(true);
			}
		} catch (err) {
			setError(true);
			setTimeout(() => {
				setError(false);
			}, 1000);
		}
	};

	return (
		<>
			{Success && (
				<div className={style.Contact_Wrapper}>
					<div className={style.message_Wrapper}>
						<div className={style.message_heading}>
							<h1>
								We are eager to hear <br />
								<span className={style.HeadingHighlight}> from you.</span>
							</h1>
							<h2>We want to hear form you. Let us know how we can help.</h2>
						</div>
						<form onSubmit={handlesubmit} autoComplete="off" className={style.Enrorll_FormWrappper}>
							<h1>
								Legal Name
								<span className={style.mandatory_hightlight}>
									<sup>*&nbsp;</sup>
								</span>
							</h1>
							<input name="Full_name" type="text" required ref={EnrollRef}></input>
							<h1>
								Email
								<span className={style.mandatory_hightlight}>
									<sup>*&nbsp;</sup>
								</span>
							</h1>
							<input name="Email" type="email" required></input>
							<h1>
								Mobile
								<span className={style.mandatory_hightlight}>
									<sup>*&nbsp;</sup>
								</span>
							</h1>
							<input name="mobile_number" type="text" required></input>

							<h1>
								Message
								<span className={style.mandatory_hightlight}>
									<sup>*&nbsp;</sup>
								</span>
							</h1>
							<textarea name="Message" type="text" rows={10} required></textarea>
							<button className={style.Spantwo}>Submit</button>
						</form>
					</div>

					{/* <div className={style.FAQ_Wrapper}>
						<div className={style.FAQ_header}>
							<h1>
								Some <span className={style.HeadingHighlight}>FAQs</span>
							</h1>
							<div className={style.FAQ_lists}>
								<div className={style.Individual_FAQ}>
									<details>
										<summary>Is programming Knowledge is necessary to enroll ?</summary>
										<p>
											Whether programming knowledge is necessary to enroll depends on the specific course you are interested in. Some courses may
											require prior knowledge of a certain language or topic, while others may be suitable for beginners. You should check the course
											description and requirements before enrolling.
										</p>
									</details>
								</div>
								<div className={style.Individual_FAQ}>
									<details>
										<summary>What are the policies and procedures for rescheduling or cancelling training course?</summary>
										<p>Regarding rescheduling or cancelling you can visit us or conact directly.</p>
									</details>
								</div>
								<div className={style.Individual_FAQ}></div>
							</div>
						</div>
					</div> */}
				</div>
			)}
			{!Success && (
				<div className={style.SuccesFormSubmit_Message}>
					{/* Feeback form  response */}
					{/* <h1>
						Thank you for taking the time to share your feedback with us. We appreciate your honest and constructive comments about our website.
					</h1>
					<h1>
						Your feedback helps us improve our service and deliver a better experience for you and other customers. We are always looking for ways to
						make our website more user-friendly, informative, and engaging.
					</h1>
					<h1>
						We have noted your suggestions and we will work on implementing them as soon as possible. If you have any additional questions or
						concerns, please feel free to contact us anytime.
					</h1>
					<h1>Thank you again for your valuable feedback and your continued support.</h1> */}
					{/* Contact form response */}
					<h1>Thank you for contacting us!</h1>
					<h1>
						We have received your message and we will get back to you as soon as possible. We appreciate your interest in our services and we look
						forward to assisting you with your inquiry.
					</h1>
					{/* 
					//! -------------------------------------------------- Replace H1 below when FAQ is added -------------------------------------------------------
					<h1>
						In the meantime, you can check out our FAQ page for some common questions and answers. You can also follow us on social media to stay
						updated on our latest news and offers.
					</h1> */}
					<h1>
						In the meantime, you can check out trainings we provide at our <Link to="/courses">trainings</Link> page. You can also follow us on social
						media to stay updated on our latest news and offers.
					</h1>
					<h1>Thank you for choosing us and have a great day!</h1>
				</div>
			)}
			{Error && (
				<div className={style.err}>
					<h1>Something went wrong</h1>
				</div>
			)}
		</>
	);
};

export default Contact;
