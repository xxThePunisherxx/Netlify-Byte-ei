import React, { useState, useEffect } from "react";
import style from "./UpdatePartner.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MessageBoard from "../../Components/Message Board/MessageBoard";
import useAuth from "../../hooks/useAuth";

const UpdatePartner = () => {
	const { partnerID } = useParams();
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);
	const [uploadedURl, setUploadedURl] = useState("");
	const [selectedFile, setSelectedFile] = useState();
	const [showSuccessUpload, setShowSuccessUpload] = useState(false);
	const [showFailedUpload, setShowFailedUpload] = useState(false);
	const [PartnerResponse, setPartnerResponse] = useState({});
	const [showImage, setShowImage] = useState(false);
	const [disable, setDisable] = useState(false);
	const [disableUpload, setDisableUpload] = useState(false);
	const [showWorking, setShowWorking] = useState(false);
	const { auth } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			// get request to get pre-update value of the course.
			try {
				let response = await axios.get(`https://backendapp.up.railway.app/api/partner/${partnerID}`, {
					headers: {
						Authorization: `Bearer ${auth.Token}`,
						withCredentails: true,
					},
				});
				setPartnerResponse(response.data.partner);
				setUploadedURl(response.data.partner.image);
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
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setDisable(true);
		setShowWorking(true);
		const data = new FormData(e.target);
		let enterdData = Object.fromEntries(data.entries());
		const postData = {
			companyWebsite: enterdData.company_website,
			image: uploadedURl,
		};
		try {
			const response = await axios.put(`https://backendapp.up.railway.app/api/partner/update/${partnerID}`, postData, {
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
					setShowSuccess(false);
					navigate("/admin/dashboard");
				}, 1000);
			}
		} catch (error) {
			setShowWorking(false);
			setDisable(false);
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
		setDisableUpload(true);
		setShowWorking(true);
		const fd = new FormData();
		fd.append("file", selectedFile);
		try {
			let response = await axios.post("https://backendapp.up.railway.app/api/file/single", fd, {
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
	return (
		<>
			<div className={style.AddCourseCategoryWrapper}>
				<div className={style.AddCourseCategory}>
					<div className={style.heading}>
						<h1>
							Update <span className={style.Headinghighlight}> Placement Partner</span>
						</h1>
					</div>
					<form onSubmit={handleSubmit} autoComplete="off" className={style.FormWrapper}>
						<h1>Company Website </h1>
						<input name="company_website" type="text" required defaultValue={PartnerResponse.companyWebsite}></input>
						<h1>Company Image</h1>
						<div className={style.ImageUpload}>
							<input name="course_Image" type="file" onChange={fileSelectedHandler}></input>
							<button onClick={handleUpload} disabled={disableUpload}>
								Upload image
							</button>
						</div>
						{showImage && <img className={style.Uplaod_Img} src={uploadedURl} alt="Upload  preview"></img>}
						<button disabled={disable}>Update Partner</button>
					</form>
				</div>
			</div>
			{showSuccess && (
				//* Success Message
				<MessageBoard Message_type="successBoard" Message="Updated successfully" />
			)}
			{showWorking && <MessageBoard Message_type="Working" Message="Procressing Please Wait" />}
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

export default UpdatePartner;
