import React, { useRef, useState } from "react";
import style from "./UpdateAdmin.module.css";
import { useNavigate, useParams } from "react-router-dom";
import useFetchAuth from "../../Utils/Hooks/fetchAuth";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import MessageBoard from "../../Components/Message Board/MessageBoard";

const UpdateAdmin = () => {
	const navigate = useNavigate();
	const { adminID } = useParams();
	const UpdateRef = useRef();
	const { auth } = useAuth();
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFailed, setShowFailed] = useState(false);
	const [showWorking, setShowWorking] = useState(false);
	const [disable, setDisable] = useState(false);

	const { data: UserData, ispending } = useFetchAuth(`https://backendapp.up.railway.app/api/user/admin/user/${adminID}`);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setDisable(true);
		setShowWorking(true);
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());
		let postData = {
			name: enterdData.user_name,
			role: enterdData.role_dropDown,
			email: enterdData.user_email,
		};
		if (enterdData.user_password !== "") {
			postData.password = enterdData.user_password;
		}

		try {
			const response = await axios.put(`https://backendapp.up.railway.app/api/user/role/${adminID}`, postData, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});
			if (response.status === 200) {
				setShowWorking(false);
				setShowSuccess(true);
				setTimeout(() => {
					setTimeout(() => {
						setDisable(false);
						setShowSuccess(false);
					}, 1000);
					navigate("/admin/dashboard");
				}, 2000);
			}
		} catch (error) {
			setShowWorking(false);
			setDisable(false);
			setShowFailed(true);
			setTimeout(() => {
				setShowFailed(false);
			}, 1000);
		}
	};

	return (
		<>
			<div className={style.UpdateAdmin_Wrapper}>
				<div className={style.UpdateAdmin}>
					<div>
						<h1>
							Update <span className={style.Heading_Highlight}>details</span>
						</h1>
					</div>
					{!ispending && (
						<form onSubmit={handleSubmit} autoComplete="off" className={style.Form_Wrapper}>
							<h1>User Name</h1>
							<input name="user_name" defaultValue={UserData.user.name} type="text" required ref={UpdateRef}></input>
							<h1>Password</h1>
							<h2>Enter value to change password or else leave it blank.</h2>
							<input name="user_password" type="password"></input>
							<h1>Email</h1>
							<input name="user_email" defaultValue={UserData.user.email} type="email"></input>
							<h1>Role</h1>
							<select name="role_dropDown">
								<option value={UserData.user.role}>{UserData.user.role}</option>
								{/* <option value="Admin">Admin</option> */}
								<option value="superAdmin">Super Admin</option>
							</select>
							<button disabled={disable}>Update</button>
						</form>
					)}
				</div>
			</div>

			{showSuccess && (
				//* Success Message on succesfull course addition
				<MessageBoard Message_type="successBoard" Message="User details Updated succesfully" />
			)}
			{showWorking && <MessageBoard Message_type="Working" Message="Procressing Please Wait" />}

			{showFailed && (
				//* failed Message on course addition
				<MessageBoard Message_type="FailedBoard" Message="Could not update user details. Please try again." />
			)}
		</>
	);
};

export default UpdateAdmin;
