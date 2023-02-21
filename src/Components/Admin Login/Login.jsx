import React from "react";
import { useRef, useEffect, useState } from "react";
import style from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

const Login = () => {
	const d = new Date();
	const usernameRef = useRef();
	const errorRef = useRef();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/admin/dashboard";
	const { auth, setAuth } = useAuth();
	const [email, setemail] = useState("");
	const [password, setPassword] = useState("");
	const [errMsg, setErrMsg] = useState("");

	useEffect(() => {
		// redirect to dashboard if auth.role is present
		if (auth.Role) {
			// if (auth.Role === "admin") {
			navigate("/admin/dashboard");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		usernameRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg("");
	}, [email, password]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const postData = {
			email: email,
			password: password,
		};

		try {
			const response = await axios.post("http://localhost:8080/api/user/login", postData);
			const accessToken = response?.data?.token;
			const role = response?.data?.user.role;
			let localData = { LocalToken: accessToken, LocalRole: role };
			let lt = { StoreLoginTime: d.getTime() };
			localStorage.setItem("User Info", JSON.stringify(localData));
			localStorage.setItem("User time", JSON.stringify(lt));
			setAuth({ AuthRole: role, AuthAccessToken: accessToken });
			setemail("");
			setPassword("");
			window.location.href = `${from}`;
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 400) {
				setErrMsg("Missing Username or Password");
			} else if (err.response?.status === 401) {
				setErrMsg("Unauthorized");
			} else {
				setErrMsg("Login Failed");
			}
		}
	};

	return (
		<div className={style.AdminLoginWrapper}>
			<div className={style.AdminLogin}>
				<div className={style.Heading}>
					<h1>
						Admin <span className={style.HeadingHighlight}>Login</span>
					</h1>
					<h2>Enter your credentials to sign in to your account </h2>
				</div>
				<p ref={errorRef} className={errMsg ? "errmeg" : "offscreen"}>
					{errMsg}
				</p>

				<form onSubmit={handleSubmit} autoComplete="off" className={style.FormWrappper}>
					<label htmlFor="username">Email:</label>
					<input type="text" id="username" ref={usernameRef} onChange={(e) => setemail(e.target.value)} value={email} required />
					<label htmlFor="password">password:</label>
					<input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
					<button>Sign in</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
