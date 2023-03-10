import React from "react";
import style from "./Addadmin.module.css";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import MessageBoard from "../../Components/Message Board/MessageBoard";

const Addadmin = () => {
	const { auth } = useAuth();
	const navigate = useNavigate();
	// ! -------------------------------------------------- disable button when action is being performed ---------------------------------------
	const [disable, setDisable] = useState(false);

	// ! --------------------------------------------------- state to show Message Board for varoius actions ------------------------------------------
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);
	const [showWorking, setShowWorking] = useState(false);

	const [showName, setshowName] = useState(false);
	const [showEmailerr, setshowEmailerr] = useState(false);
	const [showpwdErr, setShowpwdErr] = useState(false);
	const [showMatcherr, setShowMatcherr] = useState(false);

	const addAdminRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	useEffect(() => {
		addAdminRef.current.focus();
	}, []);

	const handlesubmit = async (e) => {
		const emailRegex = new RegExp(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
		const passwordRegex = new RegExp(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/);
		const nameRegex = new RegExp(/^.{6,}$/);
		e.preventDefault();
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());

		const isValidEmail = emailRegex.test(enterdData.user_email);
		const isValidPassword = passwordRegex.test(enterdData.Password);
		const isValidName = nameRegex.test(enterdData.user_Name);
		if (isValidName === false) {
			setshowName(true);
			setTimeout(() => {
				addAdminRef.current.focus(); // set focus to email input feild.
				setshowName(false);
			}, 2000);
		}
		if (isValidEmail === false) {
			setshowEmailerr(true);
			setTimeout(() => {
				emailRef.current.focus(); // set focus to email input feild.
				setshowEmailerr(false);
			}, 2000);
		}

		if (isValidPassword === false) {
			setShowpwdErr(true);
			setTimeout(() => {
				passwordRef.current.focus(); // set focus to password input feild.
				setShowpwdErr(false);
			}, 8000);
		}
		if (enterdData.Password !== enterdData.retype_password) {
			setShowMatcherr(true);
			setTimeout(() => {
				passwordRef.current.focus(); // set focus to password input feild.
				setShowMatcherr(false);
			}, 2000);
		}

		if (isValidEmail && isValidPassword && enterdData.Password === enterdData.retype_password && isValidName) {
			const postData = {
				password: enterdData.Password,
				email: enterdData.user_email,
				name: enterdData.user_Name,
			};
			setDisable(true);
			setShowWorking(true);
			try {
				const response = await axios.post("https://backendapp.up.railway.app/api/user/register", postData, {
					headers: {
						Authorization: `Bearer ${auth.Token}`,
						withCredentails: true,
					},
				});
				if (response.status === 201) {
					setShowWorking(false);
					setShowSuccess(true);
					setTimeout(() => {
						setShowSuccess(false);
						setDisable(false);
						navigate("/admin/dashboard");
					}, 1000);
				}
			} catch (err) {
				setShowWorking(false);
				setShowFail(true);
				setDisable(false);
				setTimeout(() => {
					setShowFail(false);
					navigate("/admin/dashboard");
				}, 1000);
			}
		}
	};

	return (
		<>
			<div className={style.Addadmin_wrapper}>
				<h1>
					Add <span className={style.Headinghighlight}>admin</span>
				</h1>
				<div className={style.FormHeader}></div>
				{showEmailerr && (
					<div className={style.Valid_Email}>
						<h1>Please Enter a valid email. </h1>
					</div>
				)}
				{showName && (
					<div className={style.Pwd_match}>
						<h1>User name cannot be less than six character.</h1>
					</div>
				)}
				{showpwdErr && (
					<div className={style.Valid_pwd}>
						<h1>Please Enter a valid password. </h1>
						<h2>Password Requirements.</h2>
						<ul>
							<li>Minimum 6 characters</li>
							<li>At least 1 upper case English letter</li>
							<li>At least 1 lower case English letter</li>
							<li>At least 1 number</li>
							<li>At least 1 special character</li>
						</ul>
					</div>
				)}
				{showMatcherr && (
					<div className={style.Pwd_match}>
						<h1>Please make sure both password match. </h1>
					</div>
				)}
				<form onSubmit={handlesubmit} autoComplete="off" className={style.FormWrappper}>
					<h1>User Name</h1>
					<input name="user_Name" type="text" required ref={addAdminRef}></input>
					<h1>Email</h1>
					<input name="user_email" type="text" ref={emailRef}></input>
					<h1>Password</h1>
					<input name="Password" type="password" ref={passwordRef}></input>
					<h1>Retype Password</h1>
					<input name="retype_password" type="password"></input>
					<button disabled={disable}>Create account</button>
				</form>
			</div>
			{showSuccess && (
				//* Success Message on succesfull course addition
				<MessageBoard Message_type="successBoard" Message="Added successfully" />
			)}

			{showWorking && <MessageBoard Message_type="Working" Message="Procressing Please Wait" />}
			{showFail && (
				//* failed Message on course addition
				<MessageBoard Message_type="FailedBoard" Message="Something went wrong. Please try again." />
			)}
		</>
	);
};

export default Addadmin;
