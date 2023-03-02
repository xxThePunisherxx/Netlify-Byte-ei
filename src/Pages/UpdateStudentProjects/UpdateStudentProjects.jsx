import React from "react";
import style from "./UpdateStudentProjects.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import MessageBoard from "../../Components/Message Board/MessageBoard";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

const UpdateStudentProjects = () => {
	const { auth } = useAuth();
	const navigate = useNavigate();
	const { projectID } = useParams();
	const [selectedFile, setSelectedFile] = useState();
	const [uploadedURl, setUploadedURl] = useState("");
	const [showSuccessUpload, setShowSuccessUpload] = useState(false);
	const [showFailedUpload, setShowFailedUpload] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFailed, setShowFailed] = useState(false);
	const [showImage, setShowImage] = useState(false);
	const [StudentProjectResponse, setStudentProjectResponse] = useState({});
	const [ckPara, setCkPara] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			// get request to get pre-update value of the course.
			try {
				let response = await axios.get(`https://learning-management-system-kx6y.onrender.com/api/project/${projectID}`, {
					headers: {
						Authorization: `Bearer ${auth.Token}`,
						withCredentails: true,
					},
				});
				console.log(response.data);
				setStudentProjectResponse(response.data.studentProject);
				setUploadedURl(response.data.studentProject.image);
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
	}, [projectID]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());
		const postData = {
			title: enterdData.project_name,
			name: enterdData.student_name,
			description: ckPara,
			githubLink: enterdData.repo,
			image: uploadedURl,
		};

		try {
			const response = await axios.put(`https://learning-management-system-kx6y.onrender.com/api/project/update/${projectID}`, postData, {
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
						Update <span className={style.Heading_Highlight}>Students Project</span>
					</h1>

					<form onSubmit={handleSubmit} autoComplete="off" className={style.Form_Wrapper}>
						<h1>Project Name Name</h1>
						<input name="project_name" type="text" required defaultValue={StudentProjectResponse.title}></input>
						<h1>Image</h1>
						<div className={style.ImageUpload}>
							<input name="project_Image" type="file" onChange={fileSelectedHandler}></input>
							<button onClick={handleUpload}>Upload image</button>
						</div>
						{showImage && <img className={style.Uplaod_Img} src={uploadedURl} alt="Upload  preview"></img>}
						<h1>Description</h1>
						{/* <textarea name="project_description" type="text" required rows={5} defaultValue={StudentProjectResponse.description}></textarea> */}
						<CKEditor
							editor={Editor}
							data={StudentProjectResponse.description}
							onChange={(event, editor) => {
								const dataPara = editor.getData();
								setCkPara(dataPara);
							}}
						/>
						<h1>Repository Link</h1>
						<input name="repo" type="text" required defaultValue={StudentProjectResponse.githubLink}></input>
						<h1>Stuents name</h1>
						<input name="student_name" type="text" required defaultValue={StudentProjectResponse.name}></input>

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

export default UpdateStudentProjects;
