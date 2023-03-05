import React from "react";
import style from "./AddStudentProject.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import MessageBoard from "../../Components/Message Board/MessageBoard";

const AddStudentProject = () => {
	const teamRef = useRef();
	const { auth } = useAuth();
	const navigate = useNavigate();
	const [selectedFile, setSelectedFile] = useState();
	const [uploadedURl, setUploadedURl] = useState("");
	const [showSuccessUpload, setShowSuccessUpload] = useState(false);
	const [showFailedUpload, setShowFailedUpload] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFailed, setShowFailed] = useState(false);
	const [showImage, setShowImage] = useState(false);
	const [disable, setDisable] = useState(false);
	const [disableUpload, setDisableUpload] = useState(false);
	const [showWorking, setShowWorking] = useState(false);
	const [ckPara, setCkPara] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setDisable(true);
		setShowWorking(true);
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());
		const postData = {
			title: enterdData.project_name,
			description: ckPara,
			image: uploadedURl,
			githubLink: enterdData.repo,
			name: enterdData.student_name,
		};

		try {
			const response = await axios.post("https://byte-backend-demo.up.railway.app/api/project/add", postData, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});
			if (response.status === 201) {
				setShowWorking(false);
				setDisable(false);
				setShowSuccess(true);
				setTimeout(() => {
					setTimeout(() => {
						setShowSuccess(false);
					}, 1000);
					navigate("/admin/dashboard");
				}, 2000);
			}
		} catch (err) {
			setShowWorking(false);
			setDisable(false);
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
		setDisableUpload(true);
		setShowWorking(true);
		const fd = new FormData();
		fd.append("file", selectedFile);
		try {
			let response = await axios.post("https://byte-backend-demo.up.railway.app/api/file/single", fd, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});
			if (response) {
				setUploadedURl(response.data.path.path);
				setDisableUpload(false);
				setShowWorking(false);
				setShowSuccessUpload(true);
				setShowImage(true);
				setTimeout(() => {
					setShowSuccessUpload(false);
				}, 1000);
			}
		} catch (err) {
			setDisableUpload(false);
			setShowWorking(false);
			setShowFailedUpload(true);
			setTimeout(() => {
				setShowFailedUpload(false);
			}, 1000);
		}
	};
	useEffect(() => {
		teamRef.current.focus();
	}, []);

	return (
		<>
			<div className={style.AddTestomonial_Wrapper}>
				<div className="AddTestomonial">
					<h1>
						Add <span className={style.Heading_Highlight}>Students Project</span>
					</h1>
					<form onSubmit={handleSubmit} autoComplete="off" className={style.Form_Wrapper}>
						<h1>Project Name Name</h1>
						<input name="project_name" type="text" required ref={teamRef}></input>
						<h1>Image</h1>
						<div className={style.ImageUpload}>
							<input name="project_Image" type="file" required onChange={fileSelectedHandler}></input>
							<button onClick={handleUpload} disabled={disableUpload}>
								Upload image
							</button>
						</div>
						{showImage && <img className={style.Uplaod_Img} src={uploadedURl} alt="Upload  preview"></img>}
						<h1>Description</h1>
						<CKEditor
							editor={Editor}
							data={ckPara}
							onChange={(event, editor) => {
								const dataPara = editor.getData();
								setCkPara(dataPara);
							}}
						/>
						<h1>Repository Link</h1>
						<input name="repo" type="text" required></input>
						<h1>Stuents name</h1>
						<input name="student_name" type="text" required></input>

						<button disabled={disable}>Submit</button>
					</form>
				</div>
			</div>

			{showSuccess && (
				//* Success Message on succesfull course addition
				<MessageBoard Message_type="successBoard" Message=" Added Succesfully" />
			)}
			{showWorking && <MessageBoard Message_type="Working" Message="Procressing Please Wait" />}
			{showSuccessUpload && (
				//* Success Message on succesfull course addition
				<MessageBoard Message_type="successBoard" Message="Image uploaded succesfully" />
			)}
			{showFailed && (
				//* failed Message on course addition
				<MessageBoard Message_type="FailedBoard" Message="Something went wrong. Please try again." />
			)}
			{showFailedUpload && (
				//* failed Message on course addition
				<MessageBoard Message_type="FailedBoard" Message="Could not upload image. Please try again." />
			)}
		</>
	);
};

export default AddStudentProject;
