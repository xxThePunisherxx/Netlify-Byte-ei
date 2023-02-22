import React from "react";
import style from "./AddCourse.module.css";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import useAuth from "../../hooks/useAuth";
import MessageBoard from "../../Components/Message Board/MessageBoard";

const AddCourse = () => {
	const { auth } = useAuth();
	const addRef = useRef();

	const navigate = useNavigate();
	const [trainingCategory, setTrainingCategory] = useState([{}]);
	const [ckPara, setCkPara] = useState("");
	const [ckStructure, setCkStructure] = useState("");
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFailed, setShowFailed] = useState(false);
	const [showSuccessUpload, setShowSuccessUpload] = useState(false);
	const [showFailedUpload, setShowFailedUpload] = useState(false);
	const [selectedFile, setSelectedFile] = useState();
	const [uploadedURl, setUploadedURl] = useState("");
	const [showImage, setShowImage] = useState(false);
	const [showSelectCat, setShowSelectCat] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let response = await axios.get("https://learning-management-system-kx6y.onrender.com/api/category", {
					headers: {
						Authorization: `Bearer ${auth.Token}`,
						withCredentails: true,
					},
				});
				setTrainingCategory(response?.data?.categorys);
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
	}, []);

	const handlesubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());
		const postData = {
			title: enterdData.course_Name,
			description: ckPara,
			duration: enterdData.course_Duration,
			priority: enterdData.course_Priority,
			image: uploadedURl,
			ratings: enterdData.course_Rating,
			category: enterdData.dropdown,
			career: enterdData.course_careerPath,
			syllabus: ckStructure,
		};

		if (enterdData.dropdown !== "null") {
			try {
				const response = await axios.post("https://learning-management-system-kx6y.onrender.com/api/training/add", postData, {
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
		} else if (enterdData.dropdown === "null") {
			setShowSelectCat(true);
			setTimeout(() => {
				setShowSelectCat(false);
			}, 1000);
		}
	};
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

	useEffect(() => {
		//* This will put cursor to first input feild on the form.
		addRef.current.focus();
	}, []);

	return (
		<>
			<div className={style.AddCourseWrapper}>
				<div className={style.AddCourse}>
					<div className={style.heading}>
						<h1>
							Add <span className={style.Headinghighlight}> Course</span>
						</h1>
					</div>
					<form onSubmit={handlesubmit} autoComplete="off" className={style.FormWrappper}>
						<h1>Course Name</h1>
						<input name="course_Name" type="text" required ref={addRef}></input>
						<h1>Course Duration</h1>
						<input name="course_Duration" type="text" required></input>
						<h1 className={style.ck}>Course Description </h1>
						<CKEditor
							editor={Editor}
							data={ckPara}
							onChange={(event, editor) => {
								const dataPara = editor.getData();
								setCkPara(dataPara);
							}}
						/>

						<h1 className={style.ck}>Course Structure </h1>
						<CKEditor
							editor={Editor}
							data={ckStructure}
							onChange={(event, editor) => {
								const dataSt = editor.getData();
								setCkStructure(dataSt);
							}}
						/>

						<h1>Course Image</h1>
						<div className={style.ImageUpload}>
							<input name="course_Image" type="file" required onChange={fileSelectedHandler}></input>
							<button onClick={handleUpload}>Upload image</button>
						</div>
						{showImage && <img className={style.Uplaod_Img} src={uploadedURl} alt="Upload  preview"></img>}
						<h1>Course Priority</h1>
						<input name="course_Priority" type="number" required></input>
						<h1>Rating</h1>
						<input name="course_Rating" type="number" required></input>
						<h1>Career Path</h1>
						<input name="course_careerPath" type="text" required></input>
						<h1>Course Category</h1>
						{showSelectCat && <h1 style={{ color: "red" }}>Select a course category</h1>}
						<select name="dropdown">
							<option value="null">Select Category</option>
							{trainingCategory.map((Category) => (
								<option key={uuid()} value={Category._id}>
									{Category.course_type}
								</option>
							))}
						</select>
						<button className={style.Spantwo}>Create</button>
					</form>
				</div>
			</div>
			{showSuccess && (
				//* Success Message on succesfull course addition
				<MessageBoard Message_type="successBoard" Message="Course Added succesfully" />
			)}
			{showSuccessUpload && (
				//* Success Message on succesfull course addition
				<MessageBoard Message_type="successBoard" Message="Image uploaded succesfully" />
			)}
			{showFailed && (
				//* failed Message on course addition
				<MessageBoard Message_type="FailedBoard" Message="Could not add course. Please try again." />
			)}
			{showFailedUpload && (
				//* failed Message on course addition
				<MessageBoard Message_type="FailedBoard" Message="Could not upload image. Please try again." />
			)}
		</>
	);
};
export default AddCourse;
