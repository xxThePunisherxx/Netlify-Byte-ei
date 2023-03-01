import React from "react";
import { useRef, useEffect } from "react";
import style from "./Contact.module.css";
import axios from "axios";
import { useState } from "react";

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
				// console.log("Success");
				setSuccess(true);
			}
		} catch (err) {
			setError(true);
			setTimeout(() => {
				setError(false);
			}, 1000);
		}
	};
	useEffect(() => {
		EnrollRef.current.focus();
	}, []);

	return (
		<>
			{!Success && (
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
								<summary>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, ab </summary>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo assumenda eum velit neque in soluta alias dicta reiciendis vero
									aspernatur reprehenderit nulla porro voluptates facilis necessitatibus, placeat magnam aperiam sint.
								</p>
							</details>
						</div>
						<div className={style.Individual_FAQ}>
							<details>
								<summary>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, ab? </summary>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo assumenda eum velit neque in soluta alias dicta reiciendis vero
									aspernatur reprehenderit nulla porro voluptates facilis necessitatibus, placeat magnam aperiam sint.
								</p>
							</details>
						</div>
						<div className={style.Individual_FAQ}>
							<details>
								<summary>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, ab? </summary>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo assumenda eum velit neque in soluta alias dicta reiciendis vero
									aspernatur reprehenderit nulla porro voluptates facilis necessitatibus, placeat magnam aperiam sint.
								</p>
							</details>
						</div>
					</div>
				</div>
			</div> */}
				</div>
			)}
			{Success && <h1>Succesfully Submitted</h1>}
			{Error && (
				<div className={style.err}>
					<h1>Something went wrong</h1>
				</div>
			)}
		</>
	);
};

export default Contact;
