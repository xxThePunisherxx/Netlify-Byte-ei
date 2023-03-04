import React from "react";
import style from "./IndividualCourse.module.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaClock, FaUserTie } from "react-icons/fa";
// import { AiFillCaretDown } from "react-icons/ai";

const IndividualCourse = () => {
	const { courseID } = useParams();
	const [IndividualtrainingData, setIndividualTrainingData] = useState([{}]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let response = await axios.get("https://byte-backend-demo.up.railway.app/api/training/" + courseID);
				setIndividualTrainingData(response.data.trainings);
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
	}, [courseID]);

	return (
		<div className={style.IndividualPageWrapper}>
			<div className={style.Training_header}>
				<div className={style.Training_contents}>
					<h1>{IndividualtrainingData.title}</h1>
					<div className={style.Training_header_sub}>
						<h2>
							<FaClock /> &nbsp; Duration &nbsp; {IndividualtrainingData.duration}
						</h2>

						<h2>
							<FaUserTie /> &nbsp; Career&nbsp; {IndividualtrainingData.career}
						</h2>
					</div>
					<div className={style.training_header_btn}>
						<Link to={"/inquiry"}>
							<button>Send Enquiry</button>
						</Link>

						<button>
							<Link to={"/enroll"}>
								Enroll
								<div className={style.arrow_wrapper}>
									<div className={style.arrow}></div>
								</div>
							</Link>
						</button>
					</div>
				</div>
			</div>
			<div className={style.Training_DescriptionWrapper}>
				<div className={style.Training_Description}>
					<h1 className={style.Description_Heading}>{IndividualtrainingData.title}</h1>
					<div dangerouslySetInnerHTML={{ __html: IndividualtrainingData.description }}></div>
				</div>
				<div className={style.course_overview}>
					<div className={style.BannerHeading}>
						<h1>Course Outline</h1>
					</div>

					<div>
						<div className={style.course_overview_contents}>
							<div className={style.Syllabus} dangerouslySetInnerHTML={{ __html: IndividualtrainingData.syllabus }}></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IndividualCourse;
