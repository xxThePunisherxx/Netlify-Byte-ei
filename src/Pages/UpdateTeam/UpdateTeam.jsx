import React from "react";
import style from "./UpdateTeam.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import MessageBoard from "../../Components/Message Board/MessageBoard";

const UpdateTeam = () => {
	const { auth } = useAuth();
	const navigate = useNavigate();
	const { teamID } = useParams();
	const [selectedFile, setSelectedFile] = useState();
	const [uploadedURl, setUploadedURl] = useState("");
	const [showSuccessUpload, setShowSuccessUpload] = useState(false);
	const [showFailedUpload, setShowFailedUpload] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFailed, setShowFailed] = useState(false);
	const [showImage, setShowImage] = useState(false);
	const [TestomonialResponse, setTestomonialResponse] = useState({});

	// const { data: TeamData, ispending } = useFetchAuth(`https://learning-management-system-kx6y.onrender.com/api/team/${teamID}`);
	useEffect(() => {
		const fetchData = async () => {
			// get request to get pre-update value of the course.
			try {
				let response = await axios.get(`https://learning-management-system-kx6y.onrender.com/api/team/${teamID}`, {
					headers: {
						Authorization: `Bearer ${auth.Token}`,
						withCredentails: true,
					},
				});

				setTestomonialResponse(response.data.team);
				setUploadedURl(response.data.team.image);
				setShowImage(true);
			} catch (error) {
				if (error.response) {
					console.log(error.response.status);
					console.log(error.response.headers);
				} else {
					console.log(`Error: ${error.message}`);
				}
			}
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [teamID]);
	console.log(`https://learning-management-system-kx6y.onrender.com/api/team/update/${teamID}`);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());
		console.log(enterdData);
		const postData = {
			name: enterdData.team_name,
			position: enterdData.team_position,
			socialPlatform: enterdData.team_social_email,
			email: enterdData.team_email,
			image: uploadedURl,
		};

		try {
			const response = await axios.put(`https://learning-management-system-kx6y.onrender.com/api/team/update/${teamID}`, postData, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});
			if (response.status === 201) {
				setShowSuccess(true);
				setTimeout(() => {
					setTimeout(() => {
						setShowSuccess(false);
					}, 1000);
					navigate("/admin/dashboard");
				}, 2000);
			}
		} catch (err) {
			setShowFailed(true);
			setTimeout(() => {
				setShowFailed(false);
			}, 1000);
		}
	};
	// file upload functions
	const fileSelectedHandler = async (event) => {
		setSelectedFile(event.target.files[0]);
	};
	const handleUpload = async (event) => {
		event.preventDefault();
		const fd = new FormData();
		fd.append("file", selectedFile);
		try {
			let response = await axios.post("https://learning-management-system-kx6y.onrender.com/api/file/single", fd, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});
			if (response) {
				setUploadedURl(response.data.path.path);
				setShowSuccessUpload(true);
				setShowImage(true);
				setTimeout(() => {
					setShowSuccessUpload(false);
				}, 1000);
			}
		} catch (err) {
			setShowFailedUpload(true);
			setTimeout(() => {
				setShowFailedUpload(false);
			}, 1000);
		}
	};

	return (
		<>
			<div className={style.AddTestomonial_Wrapper}>
				<div className={style.AddTestomonial}>
					<h1>
						Update <span className={style.Heading_Highlight}>Team Member</span>
					</h1>

					<form onSubmit={handleSubmit} autoComplete="off" className={style.Form_Wrapper}>
						<h1>Full Name</h1>
						<input name="team_name" type="text" required defaultValue={TestomonialResponse.name}></input>
						<h1>Image</h1>
						<div className={style.ImageUpload}>
							<input name="team_Image" type="file" onChange={fileSelectedHandler}></input>
							<button onClick={handleUpload}>Upload image</button>
						</div>
						{showImage && <img className={style.Uplaod_Img} src={uploadedURl} alt="Upload  preview"></img>}
						<h1>Position</h1>
						<input name="team_position" type="text" required defaultValue={TestomonialResponse.position}></input>
						<h1>Email</h1>
						<input name="team_email" type="email" required defaultValue={TestomonialResponse.email}></input>
						<h1>Social Link</h1>
						<input name="team_social_email" type="text" required defaultValue={TestomonialResponse.socialPlatform}></input>
						<button>Submit</button>
					</form>
				</div>
			</div>

			{showSuccess && (
				//* Success Message on succesfull course addition
				<MessageBoard Message_type="successBoard" Message="Updated Succesfully" />
			)}
			{showSuccessUpload && (
				//* Success Message on succesfull course addition
				<MessageBoard Message_type="successBoard" Message="Image uploaded succesfully" />
			)}
			{showFailed && (
				//* failed Message on course addition
				<MessageBoard Message_type="FailedBoard" Message="Could not Update. Please try again." />
			)}
			{showFailedUpload && (
				//* failed Message on course addition
				<MessageBoard Message_type="FailedBoard" Message="Could not upload image. Please try again." />
			)}
		</>
	);
};

export default UpdateTeam;
