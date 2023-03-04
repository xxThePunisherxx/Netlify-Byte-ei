import React, { useState, useRef, useEffect } from "react";
import style from "./AddPlacementPartnet.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessageBoard from "../../Components/Message Board/MessageBoard";
import useAuth from "../../hooks/useAuth";

const AddPlacementPartnet = () => {
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);
	const [uploadedURl, setUploadedURl] = useState("");
	const [showImage, setShowImage] = useState(false);
	const [selectedFile, setSelectedFile] = useState();
	const [showSuccessUpload, setShowSuccessUpload] = useState(false);
	const [showFailedUpload, setShowFailedUpload] = useState(false);

	const { auth } = useAuth();

	const cateRef = useRef();
	const navigate = useNavigate();
	useEffect(() => {
		cateRef.current.focus();
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());
		const postData = {
			companyWebsite: enterdData.company_website,
			image: uploadedURl,
		};
		try {
			const response = await axios.post("https://byte-backend-demo.up.railway.app/api/partner/add", postData, {
				headers: {
					Authorization: `Bearer ${auth.Token}`,
					withCredentails: true,
				},
			});

			if (response.status === 201) {
				setShowSuccess(true);
				setTimeout(() => {
					setShowSuccess(false);
					navigate("/admin/dashboard");
				}, 1000);
			}
		} catch (error) {
			setShowFail(true);
			setTimeout(() => {
				setShowFail(false);
				navigate("/admin/dashboard");
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
			let response = await axios.post("https://byte-backend-demo.up.railway.app/api/file/single", fd, {
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
			<div className={style.AddCourseCategoryWrapper}>
				<div className={style.AddCourseCategory}>
					<div className={style.heading}>
						<h1>
							Add <span className={style.Headinghighlight}> Placement Partner</span>
						</h1>
					</div>
					<form onSubmit={handleSubmit} autoComplete="off" className={style.FormWrapper}>
						<h1>Company Website </h1>
						<input name="company_website" type="text" required ref={cateRef}></input>
						<h1>Company Image</h1>
						<div className={style.ImageUpload}>
							<input name="course_Image" type="file" required onChange={fileSelectedHandler}></input>
							<button onClick={handleUpload}>Upload image</button>
						</div>
						{showImage && <img className={style.Uplaod_Img} src={uploadedURl} alt="Upload  preview"></img>}
						<button>Add Partner</button>
					</form>
				</div>
			</div>
			{showSuccess && (
				//* Success Message
				<MessageBoard Message_type="successBoard" Message="Course category Added successfully" />
			)}
			{showFail && (
				//* Fail Message
				<MessageBoard Message_type="FailedBoard" Message="Something went wrong. Please try again." />
			)}
			{showSuccessUpload && (
				//* Success Message on succesfull course addition
				<MessageBoard Message_type="successBoard" Message="Image uploaded succesfully" />
			)}
			{showFailedUpload && (
				//* failed Message on course addition
				<MessageBoard Message_type="FailedBoard" Message="Could not upload image. Please try again." />
			)}
		</>
	);
};

export default AddPlacementPartnet;
