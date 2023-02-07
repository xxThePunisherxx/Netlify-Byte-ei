import React from "react";
import style from "./AddCourse.module.css";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import useAuth from "../../hooks/useAuth";

const AddCourse = () => {
	const { auth } = useAuth();

	const addRef = useRef();
	const navigate = useNavigate();
	const [trainingCategory, setTrainingCategory] = useState([{}]);

	const [ckPara, setCkPara] = useState("");
	const [ckStructure, setCkStructure] = useState("");
	// eslint-disable-next-line no-unused-vars
	const [showSuccess, setShowSuccess] = useState(false);

	// upload state
	const [selectedFile, setSelectedFile] = useState();
	const [uploadedURl, setUploadedURl] = useState("");

	useEffect(() => {
		//get list of all training categories from  the db
		const fetchData = async () => {
			try {
				let response = await axios.get("http://localhost:8080/api/category");
				setTrainingCategory(response.data.categorys);
				// console.log(response.data.categorys);
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
			image: `http://${uploadedURl}`,
			ratings: enterdData.course_Rating,
			category: enterdData.dropdown,
			career: enterdData.course_careerPath,
			syllabus: ckStructure,
		};
		try {
			const response = await axios.post("http://localhost:8080/api/training/add", postData, {
				headers: {
					Authorization: `${auth.Token}`,
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
		} catch (error) {
			console.log(error);
		}
		// console.log(postData);
	};
	const fileSelectedHandler = async (event) => {
		setSelectedFile(event.target.files[0]);
	};
	const handleUpload = async (event) => {
		event.preventDefault();
		const fd = new FormData();
		fd.append("file", selectedFile);
		try {
			let response = await axios.post("http://localhost:8080/api/file/single", fd, {
				headers: {
					Authorization: `${auth.Token}`,
					withCredentails: true,
				},
			});
			// console.log(response.data);
			console.log(response.data.path.path);
			setUploadedURl(response.data.path.path);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
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
						<h1>Course Priority</h1>
						<input name="course_Priority" type="number" required></input>
						<h1>Rating</h1>
						<input name="course_Rating" type="number" required></input>
						<h1>Career Path</h1>
						<input name="course_careerPath" type="text" required></input>
						<h1>Course Category</h1>
						<select name="dropdown">
							<option>Select Category</option>
							{trainingCategory.map((Category) => (
								<option key={uuid()} value={Category._id}>
									{Category.course_type}
								</option>
							))}
						</select>
						<button className={style.Spantwo}>Create</button>
					</form>
					{/* <form onSubmit={handleUpload}>
						<h1>Course Image</h1>
						<input name="course_Image" type="file" required onChange={fileSelectedHandler}></input>
						<button>Upload</button>
					</form> */}
				</div>
			</div>
			{showSuccess && (
				<div className={style.successBoard}>
					<h1>Course Added succesfully</h1>
				</div>
			)}
		</>
	);
};
export default AddCourse;
