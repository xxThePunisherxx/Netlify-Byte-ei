import React from "react";
import style from "./Addadmin.module.css";
import { useRef, useEffect, useState } from "react";

const Addadmin = () => {
	const [showEmailerr, setshowEmailerr] = useState(false);
	const [showpwdErr, setShowpwdErr] = useState(false);
	const [showMatcherr, setShowMatcherr] = useState(false);
	const addAdminRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	useEffect(() => {
		addAdminRef.current.focus();
	}, []);

	const handlesubmit = (e) => {
		const emailRegex = new RegExp(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
		const passwordRegex = new RegExp(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/);
		e.preventDefault();
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());

		const isValidEmail = emailRegex.test(enterdData.user_email);
		const isValidPassword = passwordRegex.test(enterdData.Password);
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

		if (isValidEmail && isValidPassword && enterdData.Password === enterdData.retype_password) {
			console.log(enterdData);
			console.log("validated and ready to be sent to server");
		}
	};

	return (
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
				<h1>Name</h1>
				<input name="user_Name" type="text" required ref={addAdminRef}></input>
				<h1>Email</h1>
				<input name="user_email" type="text" ref={emailRef}></input>

				<h1>Password</h1>
				<input name="Password" type="password" ref={passwordRef}></input>

				<h1>Retype Password</h1>
				<input name="retype_password" type="password"></input>
				<button className={style.Spantwo}>Create account</button>

				{/* <h1>Access Level:</h1> */}
				{/* //TODO: may get removed */}
			</form>
		</div>
	);
};

export default Addadmin;
