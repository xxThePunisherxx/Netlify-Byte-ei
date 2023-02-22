import React from "react";
import { useRef, useEffect, useState } from "react";
import style from "./UpdateCourse.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import useAuth from "../../hooks/useAuth";
import MessageBoard from "../../Components/Message Board/MessageBoard";

const RemoveCourse = () => {
	const navigate = useNavigate();
	const { auth } = useAuth();
	const UpdateRef = useRef();
	const { courseID } = useParams();
	const [IndividualtrainingData, setIndividualTrainingData] = useState([{}]); //  data feilds of individual course
	const [IndividualtrainingDataCat, setIndividualTrainingCat] = useState(""); // just contains course category of fetched course.
	const [trainingCategory, setTrainingCategory] = useState([{}]); // list of all training categories.
	const [ckPara, setCkPara] = useState();
	const [ckStructure, setCkStructure] = useState("");

	//
	const [showSuccessUpload, setShowSuccessUpload] = useState(false);
	const [showFailedUpload, setShowFailedUpload] = useState(false);
	const [selectedFile, setSelectedFile] = useState();
	const [uploadedURl, setUploadedURl] = useState("");
	const [showImage, setShowImage] = useState(true);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFailed, setShowFailed] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			// get request to get pre-update value of the course.
			try {
				let response = await axios.get("https://learning-management-system-kx6y.onrender.com/api/training/" + courseID, {
					headers: {
						Authorization: `Bearer ${auth.Token}`,
						withCredentails: true,
					},
				});
				setIndividualTrainingData(response.data.trainings);
				setUploadedURl(response.data.trainings.image);
				setIndividualTrainingCat({ _id: null, course_type: "Could Not find course category.", disable: true });
				if (response.data.trainings.category) {
					setIndividualTrainingCat(response.data.trainings.category);
				}
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
	}, [courseID]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let response = await axios.get("https://learning-management-system-kx6y.onrender.com/api/category", {
					headers: {
						Authorization: `Bearer ${auth.Token}`,
						withCredentails: true,
					},
				});
				setTrainingCategory(response.data.categorys);
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
		console.log(enterdData);
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
		console.log(postData);
		try {
			const response = await axios.put(`https://learning-management-system-kx6y.onrender.com/api/training/update/${courseID}`, postData, {
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
			// console.log(response);
			// setTimeout(() => {
			// 	navigate("/admin/dashboard");
			// }, 1000);
		} catch (error) {
			// console.log(error);
			setShowFailed(true);
			setTimeout(() => {
				setShowFailed(false);
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
		UpdateRef.current.focus();
	}, []);
	return (
		<>
			<div className={style.AddCourseWrapper}>
				<div className={style.AddCourse}>
					<div className={style.heading}>
						<h1>
							Update <span className={style.Headinghighlight}> Course</span>
						</h1>
					</div>
					<form onSubmit={handlesubmit} autoComplete="off" className={style.FormWrappper}>
						<h1>Course Name</h1>
						<input name="course_Name" defaultValue={IndividualtrainingData.title} type="text" required ref={UpdateRef}></input>
						<h1>Course Duration</h1>
						<input name="course_Duration" defaultValue={IndividualtrainingData.duration} type="text" required></input>
						<h1 className={style.ck}>Course Description </h1>
						<CKEditor
							editor={Editor}
							data={IndividualtrainingData.description}
							onChange={(event, editor) => {
								const dataPara = editor.getData();
								setCkPara(dataPara);
							}}
						/>
						<h1 className={style.ck}>Course Structure </h1>
						<CKEditor
							editor={Editor}
							data={IndividualtrainingData.syllabus}
							onChange={(event, editor) => {
								const dataSt = editor.getData();
								// setCkStructure(dataSt);
								setCkStructure(dataSt);
							}}
						/>
						<h1>Course Image</h1>
						{/* <input name="course_Image" defaultValue={IndividualtrainingData.image} type="text" required></input> */}
						<div className={style.ImageUpload}>
							<input name="course_Image" type="file" required onChange={fileSelectedHandler}></input>
							<button onClick={handleUpload}>Upload image</button>
						</div>
						{showImage && <img className={style.Uplaod_Img} src={uploadedURl} alt="Upload  preview"></img>}

						<h1>Course Priority</h1>
						<input name="course_Priority" defaultValue={IndividualtrainingData.priority} type="number" required></input>
						<h1>Rating</h1>
						<input name="course_Rating" defaultValue={IndividualtrainingData.ratings} type="number" required></input>
						<h1>Career Path</h1>
						<input name="course_careerPath" defaultValue={IndividualtrainingData.career} type="text" required></input>
						<h1>Course Category</h1>

						<select name="dropdown">
							<option value={IndividualtrainingDataCat._id} disabled={IndividualtrainingDataCat.disable}>
								{IndividualtrainingDataCat.course_type}
							</option>
							{trainingCategory.map((Category) => (
								<option key={uuid()} value={Category._id}>
									{Category.course_type}
								</option>
							))}
						</select>
						<button className={style.Spantwo}>Update</button>
					</form>
				</div>
			</div>
			{/*  */}
			{showSuccess && (
				//* Success Message on succesfull course addition
				<MessageBoard Message_type="successBoard" Message="Course Updated succesfully" />
			)}
			{showSuccessUpload && (
				//* Success Message on succesfull course addition
				<MessageBoard Message_type="successBoard" Message="Image uploaded succesfully" />
			)}
			{showFailed && (
				//* failed Message on course addition
				<MessageBoard Message_type="FailedBoard" Message="Could not update course. Please try again." />
			)}
			{showFailedUpload && (
				//* failed Message on course addition
				<MessageBoard Message_type="FailedBoard" Message="Could not upload image. Please try again." />
			)}
		</>
	);
};

export default RemoveCourse;
